const express = require("express");
const router = express.Router();
const {
  createInstrument,
  getInstrumentsBySeller,
  updateInstrument,
  deleteInstrument,
} = require("../controllers/instrumentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createInstrument); 
router.get("/my", protect, getInstrumentsBySeller); 

router.put("/:id", protect, updateInstrument); 
router.delete("/:id", protect, deleteInstrument); 

module.exports = router;
