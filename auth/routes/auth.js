const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { UserRepository } = require("../database");
const config = require("../config");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create new user
    const user = await UserRepository.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Signin route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      Authenticated: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Error signing in" });
  }
});

// Verify token route
router.post("/verify-token", async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token:", token);
    if (!token) {
      return res.status(401).json({
        authenticated: false,
        error: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Check if user still exists
    const user = await UserRepository.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        authenticated: false,
        error: "User not found",
      });
    }

    // Token is valid and user exists
    res.json({
      authenticated: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        authenticated: false,
        error: "Invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        authenticated: false,
        error: "Token expired",
      });
    }
    res.status(500).json({
      authenticated: false,
      error: "Error verifying token",
    });
  }
});

module.exports = router;
