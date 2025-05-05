const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: String,
    type: { type: String, required: true },
    price: { type: Number, required: true },
    image: String,
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Instrument", instrumentSchema);
