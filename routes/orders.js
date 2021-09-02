const express = require("express");
const {
  createOrder,
  getOrder,
  deleteOrder,
  updatetOrder
} = require("../controllers/orders");
const router = express.Router();

router.route("/").post(createOrder).delete(deleteOrder);

router.route("/:id").get(getOrder).put(updatetOrder);

module.exports = router;
