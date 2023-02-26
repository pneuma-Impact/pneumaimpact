require("dotenv").config();

const multer = require("multer");
const singleUpload = require("../upload-requests/courses/singleUpload");
const logger = require("../utils/logger");
const multipleUpload = require("../upload-requests/courses/multipleUpload");
const UPLOADS_URL = process.env.UPLOADS_URL;

exports.uploadSingle = (req, res) => {
  singleUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err });
    } else if (err) {
      return res.status(400).json({ message: err });
    } else {
      if (req.file?.filename) {
        return res.json({ filename: UPLOADS_URL + "/" + req.file?.filename });
      } else {
        return res.status(400).json({ message: "Image not uploaded" });
      }
    }
  });
};

exports.uploadMultiple = (req, res) => {
  multipleUpload(req, res, function (err) {
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
