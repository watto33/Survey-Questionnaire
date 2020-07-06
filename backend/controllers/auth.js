const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created successfully",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "This email already exists!",
        });
      });
  });
};

exports.login = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "You are not registered. Please signup first!",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Invalid email/password credentials",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_key_move_this_into_dot_env_file",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        surveyStatus: fetchedUser.surveyStatus,
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: "Authentication failed",
      });
    });
};
