import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export default mongoose.model("Note", noteSchema);
