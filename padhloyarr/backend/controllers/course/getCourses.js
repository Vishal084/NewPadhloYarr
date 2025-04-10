const Course = require("../../models/Course");

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor");
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch courses", error });
  }
};

module.exports = { getCourses }; // ✅ Must export as an object with key
