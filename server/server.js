
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();   // ✅ FIRST create app

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes (after app created)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});