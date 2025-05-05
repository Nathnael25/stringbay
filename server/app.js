const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const shopRoutes = require("./routes/shopRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/shops", shopRoutes);
app.get("/", (req, res) => {
  res.send("Stringbay API is runing...");
});

module.exports = app;
