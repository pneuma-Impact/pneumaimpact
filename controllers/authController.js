const { User } = require("../models");
const bcrypt = require("bcrypt");
const { generateRandomNumber } = require("../commons/utils");
const { sendVerificationMail } = require("../services/mail");
const { findByEmail, createUser } = require("../repositories/user");
const { generateToken } = require("../services/auth.s");

exports.login = async (req, res) => {
  try {
    const user = await findByEmail(req.body.email);
    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "Incorrect credentials" });
    }

    isValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isValid) {
      return res
        .status(400)
        .json({ status: "failed", message: "Incorrect credentials" });
    }
    const u = user._id;

    try {
      const token = generateToken(u);
      //Generate token
      return res.json({
        status: "Success",
        user: user?.cleanData,
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.register = async (req, res) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json({
      message: "User created",
      user: {
        email: user.email,
        isVerified: user.isVerified,
        name: user.name,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", err: err.message });
  }
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
    res.status(500).end();
  }
};
