const express = require("express");
const router = express.Router();
const {
  createInstrument,
  getInstrumentsBySeller,
} = require("../controllers/instrumentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createInstrument); // Seller adds instrument
router.get("/my", protect, getInstrumentsBySeller); // Seller views their instruments

module.exports = router;
