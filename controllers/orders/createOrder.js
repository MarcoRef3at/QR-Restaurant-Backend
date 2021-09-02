const asyncHandler = require("../../middleware/async");
const sequelize = require("../../sequelize");
const ErrorResponse = require("../../utils/errorResponse");
const { execludeAttribute } = require("./_functions");
const { orders } = sequelize.models;

exports.createOrder = asyncHandler(async (req, res, next) => {
  // Create Zone in Databaase
  try {
    const order = await orders.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    return next(new ErrorResponse(error, 400));
  }
});
