const express = require("express");

const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const authValidators = require("../validators/authValidators");

router.post("/login", authValidators.login, authController.login);
router.post("/register", authValidators.register, authController.register);
router.get(
  "/user",
  passport.authenticate("jwt", {
    session: false,
  }),
  authController.user
);

router.post(
  "/resend-verification-email",
  passport.authenticate("jwt", {
    session: false,
  }),
  authController.resendVerificationMail
);

router.post(
  "/verify-user-account",
  passport.authenticate("jwt", {
    session: false,
  }),
  authValidators.verifyUser,
  authController.verifyUserAccount
);

module.exports = router;
