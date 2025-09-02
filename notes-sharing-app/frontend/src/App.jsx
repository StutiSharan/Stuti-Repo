import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/admin" element={user?.role === "admin" ? <AdminPanel /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
