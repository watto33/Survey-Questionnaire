const user = require("../models/user");

module.exports = (req, res, next) => {
  user.findOne({ _id: req.userData.userId }).then((user) => {
    if (user.surveyStatus) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }
    req.userData.surveyStatus = user.surveyStatus;
    next();
  });
};