const { User } = require("../models");

exports.findByEmail = async (email) => {
  try {
    const user = User.findOne({ email });
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};
