const { createPayment } = require("./createPayment");
const { deletePayment } = require("./deletePayment");
const { getPayment } = require("./getPayment");
const { updatePayment } = require("./updatetPayment");
module.exports = {
  createPayment,
  getPayment,
  deletePayment,
  updatePayment,
};
