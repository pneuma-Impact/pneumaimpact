const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    download: { type: Number, default: 0 },
    status: {
      type: Schema.Types.ObjectId,
      ref: "Status",
    },
    tags: {
      type: Array,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Course = model("Course", courseSchema);

module.exports = Course;
