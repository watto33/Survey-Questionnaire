const questions = require("../questionnaire.json");
const Answer = require("../models/answer");
const User = require("../models/user");

exports.fetchQuestions = (req, res, next) => {
  res.status(200).json({
    message: "Questions fetched successfully!",
    questions: questions,
  });
};

exports.fetchAnswers = (req, res, next) => {
  Answer.find()
    .then((documents) => {
      res.status(200).json({
        allUsersAnswers: documents,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong.! Please try again",
      });
    });
};

exports.postAnswer = async (req, res, next) => {
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
};
