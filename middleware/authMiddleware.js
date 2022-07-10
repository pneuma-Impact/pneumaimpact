exports.userIsVerified = (req, res, next) => {
  const user = req.user;
  if (user.isVerified) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "You are not verified. Please verify your account." });
  }
};

exports.userIsAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "You are not allowed to perfom this action." });
  }
};
