const multer = require("multer");
const logger = require("../../utils/logger");

const courseUpload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    const mimeTypes = [
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "application/msword",
      "application/epub+zip",
    ];
    if (!mimeTypes.includes(file.mimetype)) {
      return cb("Invalid file type. Can only be document files", false);
    }
    cb(null, true);
  },
}).single("course_document");

module.exports = courseUpload;
