import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: form.name, email: form.email, role: "user" });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl text-white font-bold mb-4">Signup</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 mb-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 mb-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 mb-3 rounded-lg"
        />
        <button className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition">
          Signup
        </button>
        <p className="text-gray-200 mt-3 text-sm">
          Already have an account? <Link to="/login" className="text-cyan-300">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
