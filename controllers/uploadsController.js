const multer = require("multer");
const imageUpload = require("../upload-requests/courses/imageUpload");

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
