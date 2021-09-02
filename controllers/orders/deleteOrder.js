const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../utils/errorResponse");
const sequelize = require("../../sequelize");
const { orders } = sequelize.models;

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  orders
    .destroy({ where: { id: req.body.ids } })
    .then(rows => {
      if (rows == 0) {
        return next(
          new ErrorResponse(`Order with ID ${req.params.id} not found`, 404)
        );
      }

      res.status(200).json({
        success: true,
        data: `${rows} ${rows > 1 ? "orders" : "order"} successfully deleted`
      });
    })
    .catch(e => {
      return next(new ErrorResponse(e));
    });
});
