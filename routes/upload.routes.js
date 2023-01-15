const express = require("express");

const router = express.Router();
const passport = require("passport");
const uploadsController = require("../controllers/uploadsController");
const courseUpload = require("../upload-requests/courses/courseUpload");
const imageUpload = require("../upload-requests/courses/imageUpload");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  imageUpload,
  uploadsController.uploadImage
);

router.post(
  "/courses",
  passport.authenticate("jwt", { session: false }),
  // courseUpload.single("course_document"),
  uploadsController.uploadDocument
);

module.exports = router;
