import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../database.js";

const router = express.Router();

/* ========= SIGNUP ========= */
router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed]
    );

    res.json({ message: "Signup successful" });
  } catch (err) {
    next(err);
  }
});

/* ========= LOGIN ========= */
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log("[LOGIN ATTEMPT] Email:", email);

    const [[user]] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (!user) {
      console.log("[LOGIN FAILED] User not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("LOGIN USER FOUND:", user.role);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("[LOGIN FAILED] Password mismatch");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ TOKEN IS DEFINED HERE
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      role: user.role,
      id: user.id,
      name: user.name
    });
  } catch (err) {
    next(err);
  }
});

export default router;
