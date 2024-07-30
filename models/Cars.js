const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const carsSchema = new Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cars", carsSchema);
