const {
  createOrderByTableId,
  createOrderByChequeId,
} = require("./createOrder");
const { deleteOrder } = require("./deleteOrder");
const { getOrder } = require("./getOrder");
const { updatetOrder } = require("./updatetOrder");

module.exports = {
  createOrderByTableId,
  createOrderByChequeId,
  getOrder,
  deleteOrder,
  updatetOrder,
};
