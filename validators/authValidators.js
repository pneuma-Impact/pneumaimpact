const { validationResult, body } = require("express-validator");
const { User } = require("../models");

exports.login = async (req, res, next) => {
  await body("email")
    .notEmpty()
    .bail()
    .withMessage("Required Field")
    .isEmail()
    .withMessage("Must be a valid email address")
    .run(req);
  await body("password")
    .notEmpty()
    .bail()
    .withMessage("Required field")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid data", errors: errors.array() });
  }
  next();
};

exports.register = async (req, res, next) => {
  await body("email")
    .notEmpty()
    .bail()
    .withMessage("Required Field")
    .isEmail()
    .withMessage("Must be a valid email address")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("User with that email address already exists");
      }
    })
    .bail()
    .run(req);
  await body("password")
    .notEmpty()
    .bail()
    .withMessage("Required field")
    .isStrongPassword()
    .bail()
    .withMessage(
      "Must be strong password with a mixture of lower case, uppercase and numbers"
    )
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid data", errors: errors.array() });
  }
  next();
};

exports.verifyUser = async (req, res, next) => {
  await body("token")
    .notEmpty()
    .bail()
    .withMessage("Required field.")
    .toInt()
    .custom(async (value) => {
      const user = await User.findOne({ email: req.user.email });
      if (!user) {
        return Promise.reject("User does not exit");
      }
      if (user.verification_token !== value) {
        return Promise.reject("Invalid verification token");
      }
    })
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid data", errors: errors.array() });
  }
  next();
};

exports.changePassword = (req, res, next) => {};
