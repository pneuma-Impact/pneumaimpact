const multer = require("multer");
const { Course } = require("../models");
const courseImageUpload = require("../upload-requests/courses/imageUpload");

exports.store = async (req, res) => {
  const course = new Course({
    title: req.body.title,
    body: req.body.body,
    image: req.body.filename,
  });

  try {
    await course.save();
    return res.status(201).json(course);
  } catch (error) {
    // console.log(error);
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
