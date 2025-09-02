function ShareModal({ note, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-3">Share Note</h2>
        <p className="mb-4">{note.title}</p>
        <input
          type="text"
          readOnly
          value={`https://yourapp.com/note/${note._id}`}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ShareModal;
