import React from "react";
import NoteCard from "./NoteCard";

export default function NotesList({ notes, onEdit, onDelete, onShare }) {
  if (!notes || !notes.length) {
    return <div className="text-gray-400">No notes to show.</div>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} onEdit={onEdit} onDelete={onDelete} onShare={onShare} />
      ))}
    </div>
  );
}
