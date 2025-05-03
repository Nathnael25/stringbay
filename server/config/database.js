const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected you are good to go!`);
    console.log("🔍 Connecting to:", process.env.MONGO_URI);
  } catch (err) {
    console.error("Database connection failed", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
