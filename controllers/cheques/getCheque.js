const asyncHandler = require("../../middleware/async");
const sequelize = require("../../sequelize");
const { execludeAttribute, includeDevices } = require("./_functions");
const { cheques } = sequelize.models;

exports.getCheque = asyncHandler(async (req, res, next) => {
  let cheque;
  let count;
  if (req.params.id == 0) {
    cheque = await cheques.findAll({
      ...execludeAttribute,
    });
    // Count Retrieved Devices
    count = await cheques.count();
  } else {
    cheque = await cheques.findByPk(req.params.id, {
      ...execludeAttribute,
    });
    // Count Retrieved Devices
    count = 1;
  }
  res.status(200).json({ success: true, count, data: cheque });
});
