const User = require("../models/User");

exports.signUpUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }).then((result) => {
    if (result) {
      return res.status(409).json({
        error:
          "A user with that username already exists. Please try to fill in another username.",
      });
    }

    User.insertMany({
      username: username,
      password: password,
      todos: [],
    })
      .then((result) => {
        res.status(200).json({ message: "Successfully signed up the user." });
      })
      .catch((error) => {
        next(error);
      });
  });
};
