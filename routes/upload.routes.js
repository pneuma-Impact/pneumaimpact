const express = require("express");

const router = express.Router();
const passport = require("passport");
const uploadsController = require("../controllers/uploadsController");
const singleUpload = require("../upload-requests/courses/singleUpload");
const multipleUpload = require("../upload-requests/courses/multipleUpload");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  singleUpload,
  uploadsController.uploadSingle
);

router.post(
  "/multiple",
  passport.authenticate("jwt", { session: false }),
  // courseUpload.single("course_document"),
  multipleUpload
);

module.exports = router;
