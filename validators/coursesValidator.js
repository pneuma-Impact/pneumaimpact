const { body, check, validationResult } = require("express-validator");

exports.store = async (req, res, next) => {
  await check(["title", "filename"])
    .notEmpty()
    .withMessage("Required field")
    .isLength({ max: 255 })
    .withMessage("Maximum of 255 characters require.")
    .run(req);

  await check("body").notEmpty().withMessage("Required field").run(req);
  await check("description")
    .notEmpty()
    .withMessage("Required field")
    .isLength({ max: 500 })
    .withMessage("Maximum of 255 characters expected.")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
};
