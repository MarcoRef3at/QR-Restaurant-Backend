const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../utils/errorResponse");
const sequelize = require("../../sequelize");
const { orders } = sequelize.models;

exports.updatetOrder = asyncHandler(async (req, res, next) => {
  try {
    await orders.update(req.body, { where: { id: req.params.id } });

    let order = await orders.findByPk(req.params.id);

    if (!order) {
      return next(
        new ErrorResponse(`Order with ID ${req.params.id} not found`, 404)
      );
    } else {
      res.status(200).json({ success: true, data: order });
    }
  } catch (error) {
    return next(new ErrorResponse(error.message, 404));
  }
});
