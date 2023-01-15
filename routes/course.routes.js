const express = require("express");
const multer = require("multer");
const passport = require("passport");
const router = express.Router();
const coursesController = require("../controllers/coursesController");
const { userIsVerified, userIsAdmin } = require("../middleware/authMiddleware");
const courseImageUpload = require("../upload-requests/courses/imageUpload");
const coursesValidator = require("../validators/coursesValidator");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  coursesValidator.store,
  coursesController.store
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  coursesController.getCourses
);

router.get(
  "/slug/:slug",
  passport.authenticate("jwt", { session: false }),
  userIsVerified,
  coursesController.singleBySlug
);

router.get(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  userIsAdmin,
  coursesController.single
);

router.put(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  coursesValidator.store,
  coursesController.update
);

router.delete(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  coursesController.delete
);

module.exports = router;
