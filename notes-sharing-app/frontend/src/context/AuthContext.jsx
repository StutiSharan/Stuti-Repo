import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const API = "https://stuti-repo-1.onrender.com";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user and token from localStorage on mount
useEffect(() => {
  const savedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  if (savedUser && token) {
    setUser(JSON.parse(savedUser));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  setLoading(false);
}, []);





  // Login
// After login or signup
const login = async (email, password) => {
  const res = await axios.post(`${API}/api/auth/login`, { email, password });
  const userData = res.data.user; // user info
  const token = res.data.token;   // JWT

  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const signup = async (name, email, password) => {
  const res = await axios.post(`${API}/api/auth/signup`, { name, email, password });
  const userData = res.data.user;
  const token = res.data.token;

  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};


  // Logout
  const logout = () => {
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
