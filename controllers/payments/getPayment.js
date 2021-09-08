const asyncHandler = require("../../middleware/async");
const sequelize = require("../../sequelize");
// const { execludeAttribute, includeDevices } = require("./_functions");
const { payments, orders } = sequelize.models;

// Get Cheque status (isVoid,isClosed,tableId)
exports.getPayment = asyncHandler(async (req, res, next) => {
  let payment;
  let count;
  // Get All Payments
  if (req.params.id == 0) {
    payment = await payments.findAll();
    // Count Retrieved Payment Transactions
    count = await payments.count();
  } else {
    // Get one cheque
    payment = await payments.findByPk(req.params.id);
    // Count Retrieved Payment Transactions
    count = 1;
  }
  res.status(200).json({ success: true, count, data: payment });
});

// // cheque/:id/orders
// exports.getChequeOrders = asyncHandler(async (req, res, next) => {
//   let orderz = await orders.findAll({
//     where: { chequeId: req.params.id },
//     attributes: {
//       exclude: ["createdAt", "updatedAt", "id", "chequeId"]
//     }
//   });

//   orderz = sumUpQuantitiesAndPrice(orderz);

//   // Get Cheque Total price
//   let total = orderz.reduce(
//     (acc, curr) => acc.dataValues.totalPrice + curr.dataValues.totalPrice
//   );

//   res.status(200).json({ success: true, total, data: orderz });
// });

// const sumUpQuantitiesAndPrice = orderz => {
//   // Get total quanitity of each id
//   const lookup = orderz.reduce((a, e) => {
//     a[e.itemId] = a[e.itemId] + e.quantity || e.quantity;
//     return a;
//   }, {});

//   // Modify quantity of each id
//   let modifiedQuantities = orderz.filter(e => {
//     e.quantity = lookup[e.itemId];
//     return lookup[e.itemId];
//   });

//   // Remove duplicates from array

//   let filtered = Object.values(
//     modifiedQuantities.reduce(
//       (acc, cur) => Object.assign(acc, { [cur.itemId]: cur }),
//       {}
//     )
//   );

//   filtered.forEach(
//     item => (item.dataValues.totalPrice = item.quantity * item.unitPrice)
//   );
//   return filtered;
// };
