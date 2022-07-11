const { saveProfile } = require("../repositories/profile");

exports.store = async (req, res) => {
  try {
    const profile = await saveProfile({ ...req.body, userId: req.user.id });
    res.json({ success: true, profile: profile.cleanData }).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};
