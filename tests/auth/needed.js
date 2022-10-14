const { User } = require("../../models");
const { createUser } = require("../../repositories/user.repo");

const creds = {
  email: "preciousaang@gmail.com",
  password: "Albersten55.com",
};

const setUpUsers = async () => {
  User.deleteMany();
  await createUser(creds);
};

const tearDownUsers = async () => {
  await User.deleteMany();
};

module.exports = { creds, setUpUsers, tearDownUsers };
