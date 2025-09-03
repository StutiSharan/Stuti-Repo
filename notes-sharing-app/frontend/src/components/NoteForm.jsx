import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = "https://stuti-repo-1.onrender.com";

export default function NoteForm({ noteToEdit, onClose, refresh }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title || "");
      setDescription(noteToEdit.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [noteToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (noteToEdit) {
        await axios.put(`${API}/api/notes/${noteToEdit._id}`, { title, description });
      } else {
        await axios.post(`${API}/api/notes`, { title, description });
      }
      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{noteToEdit ? "Edit Note" : "Add Note"}</h2>
        <input className="w-full p-2 mb-3 border rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="w-full p-2 mb-3 border rounded h-32" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button type="submit" disabled={saving} className="px-4 py-2 bg-cyan-600 text-white rounded">{saving ? "Saving..." : "Save"}</button>
        </div>
      </form>
    </div>
  );
}
