const express = require("express");
const bodyParser = require("body-parser");

const questions = require("./questionnaire.json");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

app.get("/api/questions", (req, res, next) => {
  res.status(200).json({
    message: "Questions fetched successfully!",
    questions: questions,
  });
});

module.exports = app;
