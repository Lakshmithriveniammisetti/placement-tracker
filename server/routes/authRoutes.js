// server/routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// SIGNUP
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.json({ msg: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword
  });

  await user.save();

  res.json({ msg: "Signup success" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  res.json({ msg: "Login success" });
});

module.exports = router;