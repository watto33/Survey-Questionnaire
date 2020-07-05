const express = require("express");

const questions = require("../questionnaire.json");
const Answer = require("../models/answer");
const isAuth = require("../middlewares/isAuth");
const User = require("../models/user");
const isNotAttempted = require("../middlewares/isNotAttempted");

const router = express.Router();

router.get("/api/questions", isAuth, isNotAttempted, (req, res, next) => {
  res.status(200).json({
    message: "Questions fetched successfully!",
    questions: questions,
  });
});

router.get("/api/answers", (req, res, next) => {
  Answer.find()
    .then((documents) => {
      res.status(200).json({
        allUsersAnswers: documents,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/api/answers", isAuth, isNotAttempted, async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.userData.email });
    let userData = {
      id: req.userData.userId,
      question: "Name",
      answer: user.email,
    };
    req.body.unshift(userData);
    const answersData = new Answer({
      userAnswers: req.body,
    });
    await answersData.save();
    let updateStatus = await user.updateOne({ surveyStatus: true });
    res.status(201).json({
      message: "Answer submitted successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
