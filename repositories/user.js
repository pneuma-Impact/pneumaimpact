const { User } = require("../models");

exports.findByEmail = async (email) => {
  try {
    const user = await User.findOne({ email }).populate("profile");
    console.log(user.profile);
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};
