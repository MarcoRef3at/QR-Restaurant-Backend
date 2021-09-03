const {
  createOrderByTableId,
  createOrderByChequeId,
} = require("./createOrder");
const { deleteOrder } = require("./deleteOrder");
const { getOrder, getOrderByChequeId } = require("./getOrder");
const { updatetOrder } = require("./updatetOrder");
module.exports = {
  createOrderByTableId,
  createOrderByChequeId,
  getOrder,
  getOrderByChequeId,
  deleteOrder,
  updatetOrder,
};
