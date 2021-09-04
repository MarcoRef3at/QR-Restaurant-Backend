const express = require("express");
const {
  createCheque,
  getCheque,
  deleteCheque,
  updateCheque,
  getChequeOrders
} = require("../controllers/cheques");
const router = express.Router();

router.route("/").post(createCheque);

router.route("/:id").get(getCheque).put(updateCheque).delete(deleteCheque);
router.route("/:id/orders").get(getChequeOrders);

module.exports = router;
