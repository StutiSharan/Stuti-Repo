import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role });
    res.json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role, 
      token: generateToken(user._id) 
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role, 
      token: generateToken(user._id) 
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.name = req.body.name || user.name;
    await user.save();
    res.json({ message: "Profile updated", name: user.name });
  } catch (err) {
    res.status(500).json({ message: "Profile update failed" });
  }
};
