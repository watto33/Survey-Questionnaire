const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const questions = require("./questionnaire.json");
const Answer = require("./models/answer");

const app = express();

mongoose
  .connect(
    "mongodb+srv://watto:w1bfnZoRL8TWj7ro@cluster0-urvyj.mongodb.net/questionnaire",
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
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  next();
});

app.get("/api/questions", (req, res, next) => {
  res.status(200).json({
    message: "Questions fetched successfully!",
    questions: questions,
  });
});

app.get("/api/answers", (req, res, next) => {
  Answer.find().then((documents) => {
    // console.log(documents);
    res.status(200).json({
      allUsersAnswers: documents,
    });
  });
});

app.post("/api/answers", (req, res, next) => {
  const answersData = new Answer({
    answers: req.body,
  });
  answersData
    .save()
    .then(() => {
      res.status(201).json({
        message: "Answer submitted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
