const express = require("express");

const router = express.Router();
const passport = require("passport");
const uploadsController = require("../controllers/uploadsController");
const imageUpload = require("../upload-requests/courses/imageUpload");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  imageUpload,
  uploadsController.uploadImage
);

module.exports = router;
