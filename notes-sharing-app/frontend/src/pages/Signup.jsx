import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create account</h1>
        <input className="w-full p-2 mb-3 border rounded" placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input className="w-full p-2 mb-3 border rounded" placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input className="w-full p-2 mb-3 border rounded" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button className="w-full py-2 bg-cyan-600 text-white rounded">{loading ? "Signing up..." : "Sign up"}</button>

        <p className="mt-3 text-sm text-gray-600 text-center">
          Already have an account? <Link to="/login" className="text-cyan-600">Login</Link>
        </p>
      </form>
    </div>
  );
}
