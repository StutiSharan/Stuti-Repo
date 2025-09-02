import { useState } from "react";
import NoteForm from "../components/NoteForm";
import NotesList from "../components/NotesList";
import Profile from "../components/Profile";

function Dashboard() {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes([note, ...notes]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-6">
      <div className="col-span-2">
        <NoteForm onAdd={addNote} />
        <NotesList notes={notes} />
      </div>
      <Profile />
    </div>
  );
}

export default Dashboard;
