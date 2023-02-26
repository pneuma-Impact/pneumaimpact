const { body, check, validationResult } = require("express-validator");
const { Course } = require("../models");

exports.store = async (req, res, next) => {
  await check(["title"])
    .notEmpty()
    .withMessage("Required field")
    .isLength({ max: 255 })
    .withMessage("Maximum of 255 characters require.")
    .run(req);

  await check(["body", "image", "description", "filename"])
    .notEmpty()
    .withMessage("Required field")
    .run(req);

  await check("title")
    .custom(async (value) => {
      const course = await Course.findOne({ title: value });
      if (course) {
        return Promise.reject("Title already exists.");
      }
    })
    .run(req);

  await check("tags").isArray().withMessage("Must be an array").run(req);

  await check(["description", "subtitle"])
    .notEmpty()
    .withMessage("Required field")
    .isLength({ max: 1000 })
    .withMessage("Maximum of 1000 characters expected.")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
};
