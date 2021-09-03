const {
  createOrderByTableId,
  createOrderByChequeId,
} = require("./createOrder");
const { deleteOrder } = require("./deleteOrder");
const {
  getOrder,
  getOrderByChequeId,
  getOrderByTableId,
} = require("./getOrder");
const { updatetOrder } = require("./updatetOrder");
module.exports = {
  createOrderByTableId,
  createOrderByChequeId,
  getOrder,
  getOrderByChequeId,
  getOrderByTableId,
  deleteOrder,
  updatetOrder,
};
