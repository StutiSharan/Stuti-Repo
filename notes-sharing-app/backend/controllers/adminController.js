import User from "../models/User.js";
import Note from "../models/Note.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const getAllNotes = async (req, res) => {
  const notes = await Note.find().populate("owner", "name email");
  res.json(notes);
};
