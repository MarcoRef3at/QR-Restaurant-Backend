const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const redis = require("../config/redis");
const sequelize = require("../sequelize");

const { Users, Permissions } = sequelize.models;

// Protect Routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Set Token from Bearer token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Set Token from cookie
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) return next(new ErrorResponse(`User is logged out`, 401));

  // Decode token and find user
  try {
    // Verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Get User info from db and assign it to req always available
    req.user = await Users.findByPk(decode.id);

    // Get User status (Active or Disabled) from redis
    redis.hgetall(req.user.id, (err, obj) => {
      if (obj) {
        const isActive = JSON.parse(obj["isActive"]);
        if (!isActive) {
          return next(
            new ErrorResponse(`User ${req.user.username} is DISABLED`, 401)
          );
        } else {
          next();
        }
      } else {
        // If user not found in redis
        // Clear token in cookies
        res.cookie("token", "none", {
          expires: new Date(Date.now()),
          httpOnly: true,
        });

        return next(new ErrorResponse(`User is Logged Out by admin`, 401));
      }
    });
  } catch (err) {
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }
});

// Grant access to specific roles
exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role (${req.user.role}) is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
