const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateRandomNumber } = require("../commons/utils");
const { sendVerificationMail } = require("../services/mail");
const { findByEmail } = require("../repositories/user");
const secretOrKey = process.env.SECRET_OR_KEY;

//TODO move this somewhere else to be shared betwen login and authenticate strategy
var opts = {};
opts.issuer = "api.pneumaimpact.ng";
opts.audience = "pneumaimpact.ng";
opts.expiresIn = "1h";

exports.login = async (req, res) => {
  const user = await findByEmail(req.body.email);
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
  const u = user._id;

  const token = jwt.sign({ sub: u }, secretOrKey, opts);
  //Generate token
  return res.json({
    status: "Success",
    user: user.cleanData,
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

exports.user = (req, res) => {
  return res.json({ user: req.user.cleanData });
};

exports.resendVerificationMail = (req, res) => {
  if (req.user.isVerified) res.status(204).end();
  User.where({ email: req.user.email }).findOne(async function (err, user) {
    if (err) {
      res
        .status(500)
        .json({ message: "There was an error sending mail" })
        .end();
    }
    if (!user) {
      res.status(400).json({ message: "Invalid user" }).end();
    }
    //reset token

    user.verification_token = generateRandomNumber(10000, 99999);

    await user.save();

    //Now send verification email

    sendVerificationMail(user);
    res.status(204).end();
  });
};

exports.verifyUserAccount = async (req, res) => {
  try {
    const user = await findByEmail(req.user.email);
    user.verification_token = null;
    user.email_verified_at = new Date();
    await user.save();
    res.status(200).json({ status: "Success" }).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};
