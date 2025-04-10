const express = require("express");
const router = express.Router();

// Correct destructuring from each controller file
const { createCourse } = require("../controllers/course/createCourse");
const { getCourses } = require("../controllers/course/getCourses");
const { getCourseDetails } = require("../controllers/course/getCourseDetails");
const { updateCourse } = require("../controllers/course/updateCourse");
const { deleteCourse } = require("../controllers/course/deleteCourse");

const { authenticateUser } = require("../middlewares/authenticateUser"); // ✅ FIXED

const isAdmin = require("../middlewares/isAdmin");

// Public routes
router.get("/", getCourses);
router.get("/:id", getCourseDetails);

// Admin-only routes
router.post("/", authenticateUser, isAdmin, createCourse);
router.put("/:id", authenticateUser, isAdmin, updateCourse);
router.delete("/:id", authenticateUser, isAdmin, deleteCourse);


module.exports = router;
