const asyncHandler = require("../../middleware/async");
const sequelize = require("../../sequelize");
const { getOrdersTotalPrice } = require("./_functions");
const { cheques, orders } = sequelize.models;

// Get Cheque status (isVoid,isClosed,tableId)
exports.getCheque = asyncHandler(async (req, res, next) => {
  let cheque;
  let count;
  // Get All Cheques
  if (req.params.id == 0) {
    cheque = await cheques.findAll();
    // Count Retrieved Cheques
    count = await cheques.count();
  } else {
    // Get one cheque
    cheque = await cheques.findByPk(req.params.id);
    count = 1;
  }
  res.status(200).json({ success: true, count, data: cheque });
});

// cheque/:id/orders
exports.getChequeOrders = asyncHandler(async (req, res, next) => {
  let orderz = await orders.findAll({
    where: { chequeId: req.params.id },
    attributes: {
      exclude: ["createdAt", "updatedAt", "id", "chequeId"],
    },
  });

  total = getOrdersTotalPrice(orderz);

  res.status(200).json({ success: true, total, data: orderz });
});
