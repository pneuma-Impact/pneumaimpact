const { Schema, model, ObjectId } = require("../core/db");

const profileSchema = new Schema(
  {
    userId: ObjectId,
    firstName: String,
    middleName: String,
    lastName: String,
    profile_pic: String,
    companyName: String,
    completed: Boolean,
  },
  { timestamps: true }
);

const Profile = model("Profile", profileSchema);

module.exports = Profile;
