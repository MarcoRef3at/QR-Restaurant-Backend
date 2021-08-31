const ErrorResponse = require("../utils/errorResponse");

const errorHandler = async (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  // console.log("err".bgYellow, err);

  // Sequelize Duplicated Field
  if (err.parent) {
    if (err.parent.code === "ER_DUP_ENTRY") {
      const message = err.parent.sqlMessage;
      error = new ErrorResponse(message, 400);
    }
  }

  //   Sequelize Validation Error
  if (err.name === "SequelizeValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
