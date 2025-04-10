// // Middleware	Purpose	Use On
// // authenticateUser	Verifies JWT, sets req.user	All protected routes

const jwt = require('jsonwebtoken');
const User = require("../models/User");

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token payload:", decoded);

    const user = await User.findById(decoded.id); // ✅ fix here

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = { authenticateUser };
