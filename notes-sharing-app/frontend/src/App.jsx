import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./components/Profile";
import AddNoteModal from "./components/AddNoteModal"; // your popup component

export default function App() {
  const { user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNote = (note) => {
    console.log("New Note:", note);
    // 👉 Save note/file to backend API here
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <BrowserRouter>
      {user && (
        <Navbar onAddNoteClick={() => setIsModalOpen(true)} /> 
      )}
      <div className="min-h-screen">
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={
              user?.role?.toLowerCase() === "admin" ? (
                <AdminPanel />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>

      {/* Global Add Note Popup */}
      <AddNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddNote}
      />
    </BrowserRouter>
  );
}
