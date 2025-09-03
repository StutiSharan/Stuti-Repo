import React from "react";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext";

export default function NoteCard({ note, onEdit, onDelete, onShare }) {
  const { user } = useAuth();
  const isOwner = note.owner === user?._id || note.owner?._id === user?._id;
  const isAdmin = user?.role?.toLowerCase() === "admin";
  const canEdit = isOwner || isAdmin;
  const canDelete = isOwner || isAdmin;

  // sharedWith may be array of emails or user ids
  return (
    <div className="bg-white/90 p-4 rounded-xl shadow hover:scale-[1.01] transition">
      <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
      <p className="text-sm text-gray-700 mb-3">{note.description}</p>
      <div className="text-xs text-gray-500 mb-3">
        {note.createdAt ? format(new Date(note.createdAt), "dd MMM yyyy, HH:mm") : ""}
      </div>

      <div className="flex gap-2 justify-end">
        <button onClick={() => onShare(note)} className="px-2 py-1 text-sm bg-blue-500 text-white rounded">Share</button>
        {canEdit && <button onClick={() => onEdit(note)} className="px-2 py-1 text-sm bg-yellow-500 text-white rounded">Edit</button>}
        {canDelete && <button
  onClick={() => onDelete(note._id)}
  className="px-2 py-1 bg-red-500 text-white rounded"
>
  Delete
</button>
}
      </div>
    {note.sharedWith?.length > 0 && (
  <div className="text-xs mt-3 text-gray-500">
    Shared with: {note.sharedWith.map((u) => u.email || u).join(", ")}
  </div>
)}

    </div>
  );
}
