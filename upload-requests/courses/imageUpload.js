const multer = require("multer");
const { v4: uuid } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    if (file?.mimetype) {
      var ext = file.mimetype.split("/")[1];
      cb(null, uuid() + "." + ext);
    }
  },
});

module.exports = multer({
  //   limits: { fileSize: 400 * 1024 },
  //   dest: "uploads",
  fileFilter: function (req, file, cb) {
    if (!file) {
      return cb(new Error("Image required "), false);
    }

    if (
      !["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
        file.mimetype
      )
    ) {
      return cb(new Error("Invalid image"), false);
    }

    if (file.size > 5000000) {
      return cb(new Error("Should be less than 5MB"), false);
    }
    cb(null, true);
  },
  storage,
}).single("image");
