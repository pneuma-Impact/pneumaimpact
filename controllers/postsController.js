const { Post } = require("../models");

exports.store = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
  });

  try {
    await post.save();
    return res.status(201).json(post);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was an error saving post. Please try again" });
  }
};

exports.singleBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).exec();
    if (post === null) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json({ post });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was an error in fetching post" });
  }
};

exports.single = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).exec();
    if (post === null) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json({ post });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Post not found" });
  }
};

exports.update = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).exec();
    if (post === null) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.title = req.body.title;
    post.body = req.body.body;
    post.save();
    return res.json({ post });
  } catch (error) {
    return res.status(404).json({ message: "Post not found" });
  }
};

exports.delete = (req, res) => {
  Post.findOneAndDelete({ _id: req.params.id }, function (err, doc) {
    if (doc) {
      return res.status(204).json(null);
    }
    return res.status(404).json({ message: "Post not found" });
  });
};
