const { Schema, model } = require("mongoose");

const progressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  progress: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Progress", progressSchema);
