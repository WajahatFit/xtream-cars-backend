const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const createError = require("http-errors");
const logger = require("morgan");
const errorHandler = require("./middlewares/errorHandler");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//DB

mongoose
  .connect(
    "mongodb+srv://ironhack2024:Ironhack2024@backenddbtest.di3nypz.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=backendDbtest"
  )
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

// cookies and loggers
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);
app.set("trust proxy", 1);
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// })

// Routers require
const indexRouter = require("./routes/index");

//routes intro
app.use("/api/cars", indexRouter);
app.use(errorHandler);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  if (err.status === 404) {
    res.status(err.status || 404);
  } else {
    res.status(err.status || 500);
  }
});

module.exports = app;
