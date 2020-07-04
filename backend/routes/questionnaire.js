const express = require("express");

const questions = require("../questionnaire.json");
const Answer = require("../models/answer");

const router = express.Router();

router.get("/api/questions", (req, res, next) => {
  res.status(200).json({
    message: "Questions fetched successfully!",
    questions: questions,
  });
});

router.get("/api/answers", (req, res, next) => {
  Answer.find().then((documents) => {
    // console.log(documents);
    res.status(200).json({
      allUsersAnswers: documents,
    });
  });
});

router.post("/api/answers", (req, res, next) => {
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

module.exports = router;
