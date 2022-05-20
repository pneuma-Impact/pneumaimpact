const express = require("express");

const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const authValidators = require("../validators/authValidators");

router.post("/login", authValidators.login, authController.login);
router.post("/register", authValidators.register, authController.register);
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  authController.user
);

module.exports = router;
