const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDatabase = require("./config/db"); // Import DB connection

const authRoutes = require("./routes/authRoutes"); // Import auth routes
const courseRoutes = require("./routes/courseRoute");
const userRoutes = require("./routes/userRoute");

const progressRoutes = require("./routes/progressRoutes");



const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
connectToDatabase();

app.get("/", (req, res) => res.send("Backend is running!"));

// Register auth routes
app.use("/api/auth", authRoutes);
app.use("/api/courses",courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/progress", progressRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));