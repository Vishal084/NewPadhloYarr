const Course = require("../../models/Course");

const createCourse = async (req, res) => {
  try {
    const { title, description, price, thumbnail, instructor, category, duration } = req.body;

    if (!title || !description || !price || !instructor) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCourse = new Course({
      title,
      description,
      price,
      thumbnail,
      instructor,
      category,
      duration,
    });

    await newCourse.save();

    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error: error.message });
  }
};

module.exports = {createCourse};

