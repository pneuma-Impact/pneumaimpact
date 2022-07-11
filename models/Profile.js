const { Schema, model, ObjectId } = require("../core/db");

const profileSchema = new Schema(
  {
    userId: ObjectId,
    firstName: String,
    middleName: String,
    lastName: String,
    profilePic: String,
    companyName: String,
    completed: Boolean,
  },
  { timestamps: true }
);

profileSchema.virtual("cleanData").get(function () {
  const profile = this.toJSON();
  delete profile.userId;
  delete profile._id;
  return profile;
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
