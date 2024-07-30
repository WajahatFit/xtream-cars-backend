const router = require("express").Router();
const {
  getCars,
  getSingleCar,
  addCar,
  updateCar,
  deleteCar,
} = require("../controller/car");

// GET ALL THE CARS
router.get("/", getCars);
// CREATE CARS
router.post("/", addCar);

//GET A SINGLE CAR
router.get("/:id", getSingleCar);
// update a car
router.put("/:id", updateCar);

// delete car

router.delete("/:id", deleteCar);

module.exports = router;
