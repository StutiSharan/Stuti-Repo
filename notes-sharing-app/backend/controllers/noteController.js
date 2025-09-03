import Note from "../models/Note.js";
import User from "../models/User.js";

export const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const noteData = {
      title: title || "", // allow empty string
      description: description || "",
      owner: req.user?._id,
    };
    if (req.file) noteData.file = req.file.path;

    const note = await Note.create(noteData);
    res.json(note);
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getNotes = async (req, res) => {
  try {
    // Populate sharedWith and owner to get emails
    const myNotes = await Note.find({ owner: req.user._id })
      .populate("sharedWith", "email name")
      .populate("owner", "email name");

    const sharedNotes = await Note.find({ sharedWith: req.user._id })
      .populate("sharedWith", "email name")
      .populate("owner", "email name");

    res.json({ myNotes, sharedNotes });
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};



export const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (!req.user || (note.owner.toString() !== req.user._id.toString() && req.user.role !== "Admin"))
      return res.status(403).json({ message: "Not allowed" });

    note.title = req.body.title || note.title;
    note.description = req.body.description || note.description;
    await note.save();
    res.json(note);
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (!req.user || (note.owner.toString() !== req.user._id.toString() && req.user.role !== "Admin"))
      return res.status(403).json({ message: "Not allowed" });

    await note.deleteOne();
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ message: err.message || "Server error" });
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
    console.error("Error sharing note:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};
