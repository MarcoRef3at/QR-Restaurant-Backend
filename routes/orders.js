const express = require("express");
const {
  createOrderByChequeId,
  createOrderByTableId,
  getOrder,
  getOrderByChequeId,
  deleteOrder,
  updatetOrder,
} = require("../controllers/orders");
const router = express.Router();

router.route("/").post(createOrderByChequeId).delete(deleteOrder);

router.route("/:id").get(getOrder).put(updatetOrder);

router.route("/cheque/:id").get(getOrderByChequeId);

router.route("/:tableId").post(createOrderByTableId);

module.exports = router;
