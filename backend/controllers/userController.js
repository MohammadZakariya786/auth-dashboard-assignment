import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getProfile = async (req, res) => res.json(req.user);

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) user.password = await bcrypt.hash(req.body.password, 10);
  const updated = await user.save();

  res.json({
    _id: updated.id,
    name: updated.name,
    email: updated.email,
  });
};
