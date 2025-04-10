const Course = require("../../models/Course");

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update course
    const updatedCourse = await Course.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error: error.message });
  }
};

module.exports = {updateCourse};
