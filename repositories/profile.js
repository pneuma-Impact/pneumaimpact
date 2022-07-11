const Profile = require("../models/Profile");

exports.saveProfile = async (data) => {
  try {
    let profile;
    profile = await Profile.findOne({ userId: data.userId });
    if (!profile) {
      profile = new Profile();
    }
    profile.userId = data.userId;
    profile.firstName = data.firstName;
    profile.middleName = data.middleName;
    profile.lastName = data.lastName;
    profile.companyName = data.companyName;
    profile.profilePic = data.profilePic;
    profile.completed = true;
    await profile.save();
    return profile;
  } catch (error) {
    return Promise.reject(error);
  }
};
