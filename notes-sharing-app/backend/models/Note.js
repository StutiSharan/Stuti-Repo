import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String }, // not required
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  file: String // file path
}, { timestamps: true });

export default mongoose.model("Note", noteSchema);
