const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_key_move_this_into_dot_env_file");
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed",
    });
  }
};
