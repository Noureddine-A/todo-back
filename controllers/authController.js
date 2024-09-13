const User = require("../models/User");

const {validationResult} = require("express-validator");

exports.signUpUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const validation = validationResult(req);

  if(!validation.isEmpty()) {

    let error = new Error();
    error.status = 422;

    if(validation.array().length === 2) {
      error.message = "Pleae enter a username and password with at least 6 characters";
      throw error;
    }

    error.message = validation.array()[0].msg;
    throw error;
  }

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
        error.statusCode = 500;
        error.message = "Something went wrong with the server. Please try again later."
        next(error);
      });
  });
};
