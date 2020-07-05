const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  userAnswers: [],
});

module.exports = mongoose.model("Answer", answerSchema);

// id: { type: String, required: true },
//         question: { type: String, required: true },
// answer: { type: String, default: undefined },

// type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
