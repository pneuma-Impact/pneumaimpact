const express = require("express");

const router = express.Router();
const passport = require("passport");
const { userIsVerified } = require("../middleware/authMiddleware");
const profilesValidator = require("../validators/profilesValidator");
const profilesController = require("../controllers/profilesController");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  userIsVerified,
  profilesValidator.store,
  profilesController.store
);

module.exports = router;
