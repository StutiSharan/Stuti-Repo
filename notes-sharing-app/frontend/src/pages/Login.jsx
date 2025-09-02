import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: "User", email: form.email, role: "user" });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl text-white font-bold mb-4">Login</h2>
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
          Login
        </button>
        <p className="text-gray-200 mt-3 text-sm">
          Don’t have an account? <Link to="/signup" className="text-cyan-300">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
