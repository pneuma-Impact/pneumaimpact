const { body, check, validationResult } = require("express-validator");

exports.store = async (req, res, next) => {
  await check("title")
    .notEmpty()
    .bail()
    .withMessage("Required field")
    .isLength({ max: 255 })
    .bail()
    .withMessage("Maximum of 255 characters met")
    .run(req);

  await check("body").notEmpty().withMessage("Required field").run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
};
