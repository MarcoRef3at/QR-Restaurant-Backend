const express = require("express");
const {
  createPayment,
  getPayment,
  deletePayment,
  updatePayment,
} = require("../controllers/payments");
const router = express.Router();

router.route("/").post(createPayment);

router.route("/:id").get(getPayment).put(updatePayment).delete(deletePayment);
// router.route("/:id/orders").get(getChequeOrders);

module.exports = router;
