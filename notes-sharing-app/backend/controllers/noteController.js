import Note from "../models/Note.js";
import User from "../models/User.js";

export const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const noteData = { title, description, owner: req.user._id };
    if (req.file) noteData.file = req.file.path;
    const note = await Note.create(noteData);
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNotes = async (req, res) => {
  try {
    const myNotes = await Note.find({ owner: req.user._id });
    const sharedNotes = await Note.find({ sharedWith: req.user._id });
    res.json({ myNotes, sharedNotes });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    note.title = req.body.title || note.title;
    note.description = req.body.description || note.description;
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    await note.deleteOne();
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const shareNote = async (req, res) => {
  try {
    const { email } = req.body;
    const userToShare = await User.findOne({ email });
    if (!userToShare) return res.status(404).json({ message: "User not found" });

    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (!note.sharedWith.includes(userToShare._id)) {
      note.sharedWith.push(userToShare._id);
      await note.save();
    }
    res.json({ message: `Note shared with ${email}` });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
