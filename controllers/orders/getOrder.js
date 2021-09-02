const asyncHandler = require("../../middleware/async");
const sequelize = require("../../sequelize");
const { execludeAttribute, includeDevices } = require("./_functions");
const { orders } = sequelize.models;

exports.getOrder = asyncHandler(async (req, res, next) => {
  let order;
  let count;
  if (req.params.id == 0) {
    order = await orders.findAll({
      ...execludeAttribute
    });
    // Count Retrieved Devices
    count = await orders.count();
  } else {
    order = await orders.findByPk(req.params.id, {
      ...execludeAttribute
    });
    // Count Retrieved Devices
    count = 1;
  }
  res.status(200).json({ success: true, count, data: order });
});
