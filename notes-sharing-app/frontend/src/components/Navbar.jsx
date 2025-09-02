import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white/10 backdrop-blur-lg shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="text-2xl font-bold text-white">NotesApp</Link>
        <div className="flex items-center space-x-6">
          {user && (
            <>
              <Link to="/" className="text-white hover:text-cyan-300">Dashboard</Link>
              {user.role === "admin" && <Link to="/admin" className="text-white hover:text-cyan-300">Admin</Link>}
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
