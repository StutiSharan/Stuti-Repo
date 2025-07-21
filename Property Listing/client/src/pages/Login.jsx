import React, { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token, login } = useContext(AuthContext);

  if (token) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}api/auth/login`, form);
      login(data.token);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials or server error.");
    }
  };

  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_API_URL}api/auth/login`, "_self"); // Backend route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 px-4">
      <div className="bg-white text-black rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login to FindMyHome</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full p-3 border rounded mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full p-3 border rounded mb-4"
          />

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) =>
                  setForm({ ...form, remember: e.target.checked })
                }
              />
              Remember Me
            </label>
            <p className="mt-2 text-sm text-center">
  <Link to="/forgot-password" className="text-blue-500 hover:underline">
    Forgot Password?
  </Link>
</p>

          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded font-semibold hover:from-purple-600 hover:to-indigo-500 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>

      
      </div>
    </div>
  );
};

export default Login;
