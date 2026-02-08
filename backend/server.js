const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");


dotenv.config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");

const app = express();

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Static uploads folder
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
