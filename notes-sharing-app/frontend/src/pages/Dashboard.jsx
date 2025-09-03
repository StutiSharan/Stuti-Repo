import React, { useEffect, useState } from "react";
import axios from "axios";
import NotesList from "../components/NotesList";
import ShareModal from "../components/ShareModal";
import Navbar from "../components/Navbar";
import AddNoteModal from "../components/AddNoteModal";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("my");
  const [selectedNote, setSelectedNote] = useState(null);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [noteToShare, setNoteToShare] = useState(null); // store note._id

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          "https://stuti-repo-1.onrender.com/api/notes",
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        const allNotes = [...(res.data.myNotes || []), ...(res.data.sharedNotes || [])];
        setNotes(allNotes);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchNotes();
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading notes...</p>;

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
    

      <div className="p-4 sm:p-6">
        {/* Search + Tabs */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Search notes..."
            className="p-2 border rounded w-full sm:w-1/3 focus:ring-2 focus:ring-cyan-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2 justify-center sm:justify-end">
            <button
              onClick={() => setTab("my")}
              className={`px-4 py-2 rounded transition ${
                tab === "my" ? "bg-cyan-600 text-white shadow" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              My Notes
            </button>
            <button
              onClick={() => setTab("shared")}
              className={`px-4 py-2 rounded transition ${
                tab === "shared" ? "bg-cyan-600 text-white shadow" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Shared with Me
            </button>
          </div>
        </div>

        {/* Notes List */}
        <NotesList
          notes={
            tab === "my"
              ? filteredNotes.filter((note) => note.owner === user._id)
              : filteredNotes.filter((note) => note.sharedWith?.includes(user._id))
          }
          onEdit={setSelectedNote}
          onDelete={(id) => setNotes(notes.filter((n) => n._id !== id))}
          onShare={(note) => {
            setNoteToShare(note._id);
            setIsShareModalOpen(true);
          }}
        />

        {/* Add Note Modal */}
        <AddNoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onNoteAdded={(newNote) => setNotes((prev) => [newNote, ...prev])}
        />

        {/* Edit Note Modal */}
        {selectedNote && (
          <AddNoteModal
            isOpen={!!selectedNote}
            note={selectedNote}
            onClose={() => setSelectedNote(null)}
            onNoteAdded={(updatedNote) =>
              setNotes((prev) =>
                prev.map((n) => (n._id === updatedNote._id ? updatedNote : n))
              )
            }
          />
        )}

        {/* Share Modal */}
        {noteToShare && (
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => {
              setIsShareModalOpen(false);
              setNoteToShare(null);
            }}
            noteId={noteToShare}
          />
        )}
      </div>
    </div>
  );
}
