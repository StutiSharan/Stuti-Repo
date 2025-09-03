// Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

export default function Navbar({ onAddNoteClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-cyan-700 via-cyan-600 to-cyan-500 px-6 py-3 shadow-lg backdrop-blur-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-white tracking-wide hover:text-cyan-100 transition duration-300"
        >
          Notes<span className="text-yellow-300">App</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white/90 hover:text-white font-medium">
            Dashboard
          </Link>
          <Link to="/profile" className="text-white/90 hover:text-white font-medium">
            Profile
          </Link>
          <button
            onClick={onAddNoteClick}
            className="bg-white text-cyan-700 font-semibold px-4 py-1.5 rounded-lg shadow-md hover:bg-yellow-300 hover:text-black transition duration-300"
          >
            + Add Note
          </button>
          {user?.role?.toLowerCase() === "admin" && (
            <Link to="/admin" className="text-white/90 hover:text-white font-medium">
              Admin Panel
            </Link>
          )}
          <span className="text-white font-semibold border-l border-white/40 pl-3">
            {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1.5 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 bg-cyan-700/90 p-4 rounded-lg shadow-lg animate-slideDown">
          <Link
            to="/"
            className="text-white hover:text-yellow-300"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="text-white hover:text-yellow-300"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={() => {
              onAddNoteClick();
              setIsOpen(false);
            }}
            className="bg-white text-cyan-700 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 hover:text-black transition duration-300"
          >
            + Add Note
          </button>
          {user?.role?.toLowerCase() === "admin" && (
            <Link
              to="/admin"
              className="text-white hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              Admin Panel
            </Link>
          )}
          <span className="text-white font-semibold">{user?.name}</span>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
