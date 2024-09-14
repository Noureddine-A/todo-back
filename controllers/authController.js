const User = require("../models/User");

const bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

exports.signUpUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    let error = new Error();
    error.status = 422;

    if (validation.array().length === 2) {
      error.message =
        "Pleae enter a username and password with at least 6 characters";
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

    bcrypt.hash(password, 10).then((hshPw) => {
      User.insertMany({
        username: username,
        password: hshPw,
        todos: [],
      })
        .then((result) => {
          res.status(200).json({ message: "Successfully signed up the user." });
        })
        .catch((error) => {
          error.statusCode = 500;
          error.message =
            "Something went wrong with the server. Please try again later.";
          next(error);
        });
    });
  });
};

exports.loginUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }).then((user) => {
    if (!user) {
      let error = new Error();
      error.status = 401;
      error.message = "A user with this username doesn't exist.";
      return next(error);
    }

    bcrypt
      .compare(password, user.password)
      .then((result) => {
        if (result === false) {
          let error = new Error();
          error.status = 401;
          error.message = "Incorrect password.";
          return next(error);
        }

        const token = jsonwt.sign(
          { username: username, userId: user._id.toString() },
          "asecretpasswordnoonewillknowabout",
          { expiresIn: "1h" }
        );

        res
          .status(200)
          .json({ token: token, userId:user._id.toString() ,message: "Successfully signed in." });
      })
      .catch((error) => {
        error.statusCode = 500;
        error.message =
          "Something went wrong with the server. Please try again later.";
        next(error);
      });
  });
};
