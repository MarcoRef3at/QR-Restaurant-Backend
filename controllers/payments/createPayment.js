const asyncHandler = require("../../middleware/async");
const sequelize = require("../../sequelize");
const ErrorResponse = require("../../utils/errorResponse");
const { payments } = sequelize.models;

exports.createPayment = asyncHandler(async (req, res, next) => {
  try {
    const payment = await payments.create(req.body);
    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    return next(new ErrorResponse(error, 400));
  }
});
