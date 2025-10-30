import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const generateToken = (id, expiresIn) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id, process.env.TOKEN_EXPIRE),
    refreshToken: generateToken(user.id, process.env.REFRESH_TOKEN_EXPIRE),
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id, process.env.TOKEN_EXPIRE),
    refreshToken: generateToken(user.id, process.env.REFRESH_TOKEN_EXPIRE),
  });
};
