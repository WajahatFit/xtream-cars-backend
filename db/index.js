// DESDE AQUI NO SE CONNECTA A DB... FIX THIS
require("dotenv").config();

const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
