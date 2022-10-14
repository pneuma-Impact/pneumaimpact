const { generateRandomNumber } = require("../commons/utils");
const { User } = require("../models");

exports.findByEmail = async (email) => {
  try {
    const user = await User.findOne({ email }).populate("profile");
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.createUser = async (data) => {
  const user = new User({
    email: data.email,
    role: "user",
    verification_token: generateRandomNumber(10000, 99999),
    password: data.password,
  });

  try {
    const res = await user.save();

    return res;
  } catch (err) {
    return Promise.reject(err);
  }
};
