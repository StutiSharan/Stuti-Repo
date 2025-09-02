import { useState } from "react";

function NoteForm({ onAdd }) {
  const [form, setForm] = useState({ title: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    onAdd({ ...form, _id: Date.now().toString() });
    setForm({ title: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-xl text-white font-bold mb-3">Add New Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full p-2 mb-3 rounded-lg focus:outline-none"
      />
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="w-full p-2 mb-3 rounded-lg focus:outline-none"
      ></textarea>
      <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition">
        Add Note
      </button>
    </form>
  );
}

export default NoteForm;
