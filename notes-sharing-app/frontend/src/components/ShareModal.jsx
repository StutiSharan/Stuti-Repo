import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function ShareModal({ noteId, isOpen, onClose }) {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleShare = async () => {
     console.log("Sharing noteId:", noteId);
    if (!email) return alert("Enter email");
    setLoading(true);
    try {
     await axios.post(
  `https://stuti-repo-1.onrender.com/api/notes/share/${noteId}`,
  { email },
  { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
);

      alert(`Note shared with ${email}`);
      setEmail("");
      onClose();
    } catch (err) {
      console.error("Error sharing note:", err);
      alert(err.response?.data?.message || "Failed to share note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96 flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Share Note</h2>
        <input
          type="email"
          placeholder="Enter user's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-cyan-600 text-white rounded"
            onClick={handleShare}
            disabled={loading}
          >
            {loading ? "Sharing..." : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
}
