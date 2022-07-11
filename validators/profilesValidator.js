const { body, validationResult } = require("express-validator");
exports.store = async (req, res, next) => {
  await body(["firstName", "lastName"])
    .notEmpty()
    .withMessage("Field required")
    .isLength({ max: 255 })
    .bail()
    .withMessage("Maximum of 255 characters.")
    .customSanitizer((value) => value.charAt(0).toUpperCase() + value.slice(1))
    .run(req);

  await body(["middleName", "companyName"])
    .optional()
    .isLength({ max: 255 })
    .withMessage("Maximum of 255 characters.")
    .customSanitizer((value) =>
      !!value ? value.charAt(0).toUpperCase() + value.slice(1) : ""
    )
    .run(req);

  await body("profilePrice").optional().run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
};
