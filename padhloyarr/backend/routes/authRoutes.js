// const express = require("express");
// const { register, login } = require("../controllers/authController");
// const router = express.Router();

// // Signup Route
// router.post("/signup", register);

// // Login Route
// router.post("/login", login);

// module.exports = router;

const express = require("express");
const { register, login, updateUserDetails, deleteAccount, logout } = require("../controllers/authController");
const { authenticateUser } = require("../middlewares/authenticateUser");
const router = express.Router();

// Signup Route
router.post("/signup", register);

// Login Route
router.post("/login", login);

// Protected Routes (for authenticated users)
router.put("/update", authenticateUser, updateUserDetails); // Update user details
router.delete("/delete", authenticateUser, deleteAccount); // Delete user account

module.exports = router;
