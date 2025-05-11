const express = require("express");
const router = express.Router();
const {
  createShop,
  getShops,
  getShopWithInstruments,
} = require("../controllers/shopController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createShop);
router.get("/", protect, getShops);
router.get("/:id", protect, getShopWithInstruments);

module.exports = router;
