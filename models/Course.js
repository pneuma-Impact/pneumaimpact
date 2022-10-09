const { Schema, model } = require("../core/db");

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
  },
  { timestamps: true }
);

const Course = model("Course", courseSchema);

module.exports = Course;
