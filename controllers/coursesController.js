const multer = require("multer");
const { Course } = require("../models");
const logger = require("../utils/logger");

exports.store = async (req, res) => {
  const course = new Course({
    title: req.body.title,
    body: req.body.body,
    image: req.body.filename,
    description: req.body.description,
    image: req.body.image,
    tags: req.body.tags,
    subtitle: req.body.subtitle,
    author: req.user._id,
  });

  try {
    await course.save();
    return res.status(201).json(course);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "There was an error saving course. Please try again",
    });
  }
};

exports.singleBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).exec();
    if (course === null) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.json({ course });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was an error in fetching course" });
  }
};

exports.single = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).exec();
    if (course === null) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.json({ course });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Course not found" });
  }
};

exports.update = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).exec();
    if (course === null) {
      return res.status(404).json({ message: "Course not found" });
    }
    course.title = req.body.title;
    course.body = req.body.body;
    course.image = req.body.image;
    course.description = req.body.description;
    course.image = req.body.image;
    course.tags = req.body.tags;
    course.subtitle = req.body.subtitle;
    course.save();
    return res.json({ course });
  } catch (error) {
    return res.status(404).json({ message: "Course not found" });
  }
};

exports.delete = (req, res) => {
  Course.findOneAndDelete({ _id: req.params.id }, function (err, doc) {
    if (doc) {
      return res.status(204).json(null);
    }
    return res.status(404).json({ message: "Course not found" });
  });
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).sort({ createdAt: "desc" }).exec();
    logger.info("Fetching courses");
    return res.json({ courses });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ message: "Error fetching courses" });
  }
};
