const mongoose = require("mongoose");
const Instrument = require("../models/Instrument");
const Shop = require("../models/Shop");

exports.createInstrument = async (req, res) => {
  try {
    const { name, description, type, price, image, shopId } = req.body;

    if (req.user.role !== "seller") {
      return res
        .status(403)
        .json({ message: "Only sellers can add instruments" });
    }

    const shop = await Shop.findOne({ owner: req.user._id });

    if (!shop) return res.status(404).json({ message: "Shop not found" });

    if (!shop.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "You do not own this shop" });
    }

    const instrument = new Instrument({
      name,
      description,
      type,
      price,
      image,
      shop: shopId,
    });

    await instrument.save();
    res.status(201).json(instrument);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create instrument" });
  }
};

exports.getInstrumentsBySeller = async (req, res) => {
  try {
    const instruments = await Instrument.find()
      .populate({
        path: "shop",
        match: { owner: req.user._id },
      })
      .where("shop")
      .ne(null); // Filter out unmatched shops

    res.json(instruments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch instruments" });
  }
};

exports.updateInstrument = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const instrument = await Instrument.findById(id).populate("shop");
    if (!instrument)
      return res.status(404).json({ message: "instrument not found" });

    if (!instrument.shop.owner.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You don not own this instrument" });
    }

    Object.assign(instrument, updates);
    await instrument.save();

    res.json(instrument);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update instrument" });
  }
};

exports.deleteInstrument = async (req, res) => {
  try {
    const { id } = req.params;

    const instrument = await Instrument.findById(id).populate("shop");
    if (!instrument)
      return res.status(404).json({ message: "Instrument not found" });

    if (!instrument.shop.owner.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You do not own this instrument" });
    }

    await inistrument.deleteOne();
    res.json({ message: "Instrument deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed  to delete instrument" });
  }
};
