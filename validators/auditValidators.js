const { body, validationResult } = require("express-validator");

exports.store = async (req, res, next) => {
  await body(["businessName", "businessPlan", "meansOfIdentification"])
    .notEmpty()
    .bail()
    .withMessage("Required field")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
};
