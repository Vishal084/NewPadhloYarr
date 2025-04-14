

const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
require("dotenv").config();
const mongoose = require('mongoose'); // Add this import
const connectToDatabase = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoute");
const userRoutes = require("./routes/userRoute");
const progressRoutes = require("./routes/progressRoutes");
const contentReviewRoutes = require('./routes/contentReviewRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Connect to MongoDB Atlas
connectToDatabase();

// Basic routes
app.get("/", (req, res) => res.send("Backend is running!"));

// Improved health check endpoint
app.get('/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    res.status(200).json({ 
      status: 'OK',
      database: dbStatus,
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      error: error.message
    });
  }
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use('/api/courses', contentReviewRoutes);
app.use("/api/progress", progressRoutes);
app.use('/api/search', require('./routes/searchRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));