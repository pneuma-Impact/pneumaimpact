const { Schema, model } = require("../core/db");
const saltRounds = 10;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["admin", "investor", "user", "client", "editor", "superadmin"],
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
    tmp_password: String,
    refresh_token: String,
    reset_token: String,
    verification_token: Number,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("There was a duplicate key error"));
  } else {
    next();
  }
});

userSchema.virtual("isVerified").get(function () {
  return !this.verification_token;
});

const User = model("User", userSchema);

module.exports = User;
