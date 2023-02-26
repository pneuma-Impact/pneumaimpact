const multer = require("multer");
const logger = require("../../utils/logger");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = {
      "application/pdf": "pdf",
      "application/vnd.ms-powerpoint": "ppt",
      "application/msword": "docx",
      "application/epub+zip": "epub",
      "image/jpeg": "jpeg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "image/bmp": "bmp",
    };
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext[file.mimetype]);
  },
});

const courseUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const mimeTypes = [
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "application/msword",
      "application/epub+zip",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/bmp",
    ];
    if (!mimeTypes.includes(file.mimetype)) {
      return cb("Invalid file type. Can only be document files", false);
    }
    cb(null, true);
  },
}).single("file");

module.exports = courseUpload;
