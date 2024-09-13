const express = require("express");

const router = express.Router();
const { check } = require("express-validator");

const authController = require("../controllers/authController");

router.post(
  "/signup",
  [
    check("username").isLength({min: 6}).withMessage("Please enter a username with at least 6 characters"),
    check("password").isLength({min: 6}).withMessage("Please enter a password with at least 6 characters"),
  ],
  authController.signUpUser
);

module.exports = router;
