import { useState } from "react";
import ShareModal from "./ShareModal";

function NoteCard({ note }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl shadow-lg hover:scale-105 transition">
      <h3 className="text-lg font-semibold text-white">{note.title}</h3>
      <p className="text-sm text-gray-200 mt-2">{note.content}</p>
      <div className="flex justify-between items-center mt-3">
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-1 text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
        >
          Share
        </button>
      </div>
      {open && <ShareModal note={note} onClose={() => setOpen(false)} />}
    </div>
  );
}

export default NoteCard;
