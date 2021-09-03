const express = require("express");
const {
  createOrderByChequeId,
  createOrderByTableId,
  getOrder,
  getOrderByChequeId,
  getOrderByTableId,
  deleteOrder,
  updatetOrder,
} = require("../controllers/orders");
const router = express.Router();

router.route("/").delete(deleteOrder);

router.route("/:id").get(getOrder).put(updatetOrder);

router.route("/cheque/:id").get(getOrderByChequeId).post(createOrderByChequeId);
router.route("/table/:id").get(getOrderByTableId).post(createOrderByTableId);

module.exports = router;
