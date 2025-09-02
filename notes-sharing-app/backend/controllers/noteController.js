import Note from "../models/Note.js";
import User from "../models/User.js";

export const createNote = async (req, res) => {
  const { title, description } = req.body;
  const note = await Note.create({ title, description, owner: req.user._id });
  res.json(note);
};

export const getNotes = async (req, res) => {
  const myNotes = await Note.find({ owner: req.user._id });
  const sharedNotes = await Note.find({ sharedWith: req.user._id });
  res.json({ myNotes, sharedNotes });
};

export const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found" });
  if (note.owner.toString() !== req.user._id.toString() && req.user.role !== "Admin")
    return res.status(403).json({ message: "Not allowed" });

  note.title = req.body.title || note.title;
  note.description = req.body.description || note.description;
  await note.save();
  res.json(note);
};

export const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found" });
  if (note.owner.toString() !== req.user._id.toString() && req.user.role !== "Admin")
    return res.status(403).json({ message: "Not allowed" });

  await note.deleteOne();
  res.json({ message: "Note deleted" });
};

export const shareNote = async (req, res) => {
  const { email } = req.body;
  const userToShare = await User.findOne({ email });
  if (!userToShare) return res.status(404).json({ message: "User not found" });

  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found" });

  if (note.owner.toString() !== req.user._id.toString() && req.user.role !== "Admin")
    return res.status(403).json({ message: "Not allowed" });

  if (!note.sharedWith.includes(userToShare._id)) {
    note.sharedWith.push(userToShare._id);
    await note.save();
  }

  res.json({ message: `Note shared with ${email}` });
};
