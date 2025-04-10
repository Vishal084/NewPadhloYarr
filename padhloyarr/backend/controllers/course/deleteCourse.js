const Course = require("../../models/Course");

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete course
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully", course: deletedCourse });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error: error.message });
  }
};

module.exports = {deleteCourse};
