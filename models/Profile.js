const { Schema, model, ObjectId } = require("mongoose");

const profileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    firstName: String,
    middleName: String,
    lastName: String,
    profilePic: String,
    companyName: String,
    completed: {
      type: Boolean,
      default: false,
    },
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
