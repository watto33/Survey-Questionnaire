const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const questionnaireRoutes = require("./routes/questionnaire");
const authRoutes = require("./routes/auth");

const app = express();

mongoose
  .connect(
    "mongodb+srv://watto:w1bfnZoRL8TWj7ro@cluster0-urvyj.mongodb.net/testqu",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  next();
});

app.use(questionnaireRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
