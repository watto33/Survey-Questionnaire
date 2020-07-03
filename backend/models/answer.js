const mongoose = require("mongoose");
const { stringify } = require("querystring");

const answerSchema = mongoose.Schema({
  answers: [
    {
      id: { type: String, required: true },
      question: { type: String, required: true },
      answer: { type: String, default: undefined },
    },
  ],
});

module.exports = mongoose.model("Answer", answerSchema);
