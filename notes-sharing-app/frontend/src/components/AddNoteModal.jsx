// AddNoteModal.jsx
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AddNoteModal({ isOpen, onClose, onNoteAdded, note }) {
  const { user } = useAuth();
  const [title, setTitle] = useState(note?.title || "");
  const [description, setDescription] = useState(note?.description || "");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (file) formData.append("file", file);

    const res = await axios.post(
  "https://stuti-repo-1.onrender.com/api/notes",
  formData,
  {
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "multipart/form-data",
    },
    // withCredentials: true, // remove this if using token auth
  }
);



      onNoteAdded(res.data);
      setTitle("");
      setDescription("");
      setFile(null);
      onClose();
    } catch (err) {
      console.error("Error adding note:", err);
      alert("Failed to add note. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-96 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold">{note ? "Edit Note" : "Add Note"}</h2>
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-600 text-white rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
