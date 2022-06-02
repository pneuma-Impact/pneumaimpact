const { Schema, model } = require("../core/db");

const postSchema = new Schema(
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

const Post = model("Post", postSchema);

module.exports = Post;
