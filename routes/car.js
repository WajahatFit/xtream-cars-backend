// routes/car.js
const express = require("express");
const router = express.Router();
const Car = require("../models/car");

// @route   GET /api/cars
// @desc    Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/cars
// @desc    Add a new car
router.post("/", async (req, res) => {
  const { make, model, year, price, description } = req.body;

  try {
    const newCar = new Car({
      make,
      model,
      year,
      price,
      description,
    });

    const car = await newCar.save();
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
