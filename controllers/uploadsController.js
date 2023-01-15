const multer = require("multer");
const courseUpload = require("../upload-requests/courses/courseUpload");
const imageUpload = require("../upload-requests/courses/imageUpload");
const logger = require("../utils/logger");

exports.uploadImage = (req, res) => {
  imageUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err });
    } else if (err) {
      return res.status(400).json({ message: err });
    } else {
      if (req.file?.filename) {
        return res.json({ filename: req.file?.filename });
      } else {
        return res.status(400).json({ message: "Image not uploaded" });
      }
    }
  });
};

exports.uploadDocument = (req, res) => {
  courseUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err });
    } else if (err) {
      return res.status(400).json({ error: err });
    }
    logger.info(req.file);
    //  const ext = req.file.originalname?.split('.')[0]

    return res.json({ file: "course-uploads" + "/" + req.file.filename });
  });
  // return res.json({ file: req.file });
};
