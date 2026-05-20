const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  type: String,        // DSA / Company / Interview / Notes
  topic: String,
  difficulty: String,
  company: String,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Task", taskSchema);