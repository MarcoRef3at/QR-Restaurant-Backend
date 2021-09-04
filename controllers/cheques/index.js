const { createCheque } = require("./createCheque");
const { deleteCheque } = require("./deleteCheque");
const { getCheque, getChequeOrders } = require("./getCheque");
const { updateCheque } = require("./updatetCheque");
module.exports = {
  createCheque,
  getCheque,
  getChequeOrders,
  deleteCheque,
  updateCheque
};
