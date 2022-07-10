const express = require("express");
const passport = require("passport");

const router = express.Router();

const postsController = require("../controllers/postsController");
const { userIsVerified } = require("../middleware/authMiddleware");
const postsValidator = require("../validators/postsValidator");

router.post("/", postsValidator.store, postsController.store);

router.get(
  "/slug/:slug",
  passport.authenticate("jwt", { session: false }),
  userIsVerified,
  postsController.singleBySlug
);

router.get(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  postsController.single
);

router.put(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  postsValidator.store,
  postsController.update
);

router.delete(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  postsController.delete
);

module.exports = router;
