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
    // if (!file || !file.fieldname || !file.originalname) {
    //   cb(new Error("Image required "), false);
    // }

    if (
      !["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
        file.mimetype
      )
    ) {
      cb("Invalid image", false);
    }

    if (file.size > 5000000) {
      cb("Should be less than 5MB", false);
    }

    cb(null, true);
  },
  storage,
}).single("image");
