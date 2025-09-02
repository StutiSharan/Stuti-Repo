import NoteCard from "./NoteCard";

function NotesList({ notes }) {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} />
      ))}
    </div>
  );
}

export default NotesList;
