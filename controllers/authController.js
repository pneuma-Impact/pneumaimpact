const { User } = require("../models");
const saltRounds = 10;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateRandomNumber } = require("../commons/utils");
const { sendVerificationMail } = require("../services/mail");
const secretOrKey = process.env.SECRET_OR_KEY;

//TODO move this somewhere else to be shared betwen login and authenticate strategy
var opts = {};
opts.issuer = "api.pneumaimpact.ng";
opts.audience = "pneumaimpact.ng";
opts.expiresIn = "1h";

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(400)
      .json({ status: "failed", message: "Incorrect credentials" });
  }
  isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) {
    return res
      .status(400)
      .json({ status: "failed", message: "Incorrect credentials" });
  }
  const u = user.toJSON();
  delete u.password;
  delete u.createdAt;
  delete u.updatedAt;
  delete u.__v;

  const token = jwt.sign({ sub: u }, secretOrKey, opts);
  //Generate token
  return res.json({
    status: "Success",
    user: { email: user.email },
    token,
  });
};

exports.register = async (req, res) => {
  const user = User({
    email: req.body.email,
    role: "user",
    verification_token: generateRandomNumber(10000, 99999),
    password: req.body.password,
  });

  user.save((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Server error", err: err.message });
    }
    return res.status(201).json({
      message: "User created",
      user: {
        email: user.email,
        isVerified: user.isVerified,
        name: user.name,
      },
    });
  });
};

exports.user = ({ user }, res) => {
  return res.json({ user });
};

exports.resendVerificationMail = (req, res) => {
  if (req.user.isVerified) res.status(204).end();
  User.where({ email: req.user.email }).findOne(function (err, user) {
    if (err) {
      res
        .status(500)
        .json({ message: "There was an error sending mail" })
        .end();
    }
    if (!user) {
      res.status(400).json({ message: "Invalid user" }).end();
    }
    //Now send verification email

    sendVerificationMail(user);
    res.json("ok");
  });
};

exports.verifyUserAccount = (req, res) => {};
