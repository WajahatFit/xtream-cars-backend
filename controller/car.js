const Car = require("../models/Cars");

const getCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).json(cars);
  } catch (error) {
    console.log(error);
  }
};

const getSingleCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(200).json(car);
  } catch (error) {
    console.log(error);
  }
};

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndUpdate(id, req.body);

    if (!car) {
      res.status(404).json({ message: "Car not found" });
    }
    const updatedCar = await Car.findById(id);
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      res.status(404).json({ message: "car not found" });
    }
    res.status(200).json({ message: "Car delete Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCars,
  getSingleCar,
  addCar,
  updateCar,
  deleteCar,
};
