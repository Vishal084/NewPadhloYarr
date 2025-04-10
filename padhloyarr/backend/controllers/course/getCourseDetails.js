const Course = require("../../models/Course");

const getCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id); // Find course by ID

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course details", error: error.message });
  }
};

module.exports = {getCourseDetails};
