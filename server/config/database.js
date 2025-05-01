const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected you are good to go!");
  } catch (error) {
    console.error(
      "Database connection failed try to fix this error:",
      error.message
    );
    process.exit(1);
  }
};

module.exports = connectDB;
