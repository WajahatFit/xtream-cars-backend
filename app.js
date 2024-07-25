// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const carRoutes = require("./routes/car");

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/api/cars", carRoutes);

// Simple route
app.get("/", (req, res) => {
  res.send("Welcome to the Car Marketplace API");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
