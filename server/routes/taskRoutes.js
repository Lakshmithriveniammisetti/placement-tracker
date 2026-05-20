const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Add task
router.post("/", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

// Get all
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Get by type
router.get("/type/:type", async (req, res) => {
  const tasks = await Task.find({ type: req.params.type });
  res.json(tasks);
});

// Update
router.put("/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body);
  res.json(updated);
});

// Delete
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;