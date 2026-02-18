import express from "express";
import Club from "../models/club.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();


// 🔐 Auth Middleware
const protect = async (req, res, next) => {  
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};


// 🔒 SuperAdmin Middleware
const isSuperAdmin = (req, res, next) => {
  if (req.user.role !== "superAdmin") {
    return res.status(403).json({ message: "Only superAdmin allowed" });
  }
  next();
};


// 🏢 Create Club Controller
const createClub = async (req, res) => {
  try {
    const { email, clubname, password } = req.body;

    if (![email, clubname, password].every(Boolean)) {
      return res.status(400).json({ message: "All fields required" });
    }

    const club = await Club.create({
      email,
      clubname,
      password
    });

    res.status(201).json(club);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🚀 Route
router.post("/create", protect, isSuperAdmin, createClub);

export default router;

