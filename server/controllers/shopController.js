const Shop = require("../models/Shop");
const Instrument = require("../models/Instrument");

exports.createShop = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        message: "You are not authorized to create a shop",
      });
    }
    const shop = new Shop({
      ...req.body,
      owner: req.user._id,
    });
    await shop.save();
    res.status(201).json(shop);
  } catch (err) {
    res.status(500).json({
      message: "Error creating shop",
      error: err.message,
    });
  }
};

exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate("owner", "fullName");
    res.status(200).json(shops);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching shops",
      error: err.message,
    });
  }
};

exports.getShopWithInstruments = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate(
      "owner",
      "fullName"
    );
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    const instruments = await Instrument.find({ shop: shop._id });
    res.json({ shop, instruments });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching shop with instruments",
      error: err.message,
    });
  }
};
