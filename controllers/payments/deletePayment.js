const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../utils/errorResponse");
const sequelize = require("../../sequelize");
const { payments } = sequelize.models;

exports.deletePayment = asyncHandler(async (req, res, next) => {
  try {
    await payments.update({ isVoid: true }, { where: { id: req.params.id } });

    let payment = await payments.findByPk(req.params.id);

    if (!payment) {
      return next(
        new ErrorResponse(`Payment with ID ${req.params.id} not found`, 404)
      );
    } else {
      res.status(200).json({ success: true, data: payment });
    }
  } catch (error) {
    return next(new ErrorResponse(error.message, 404));
  }
});
