const express = require("express");
const router = express.Router();
const {
  createShop,
  getAllShops,
  getShopWithInstruments,
} = require("../controllers/shopController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createShop);
router.get("/", protect, getAllShops);
router.get("/:id", protect, getShopWithInstruments);

module.exports = router;
