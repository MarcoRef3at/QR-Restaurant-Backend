const express = require("express");
const {
  createCheque,
  getCheque,
  deleteCheque,
  updateCheque,
} = require("../controllers/cheques");
const router = express.Router();

router.route("/").post(createCheque);

router.route("/:id").get(getCheque).put(updateCheque).delete(deleteCheque);

module.exports = router;
