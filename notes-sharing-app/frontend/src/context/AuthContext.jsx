import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const API = "https://stuti-repo-1.onrender.com";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      axios.defaults.headers.common["Authorization"] = `Bearer ${parsed.token}`;
    }
    setLoading(false);
  }, []);

  // Login
  const login = async (email, password) => {
    const res = await axios.post(`${API}/api/auth/login`, { email, password });
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
  };

  // Signup
  const signup = async (name, email, password) => {
    const res = await axios.post(`${API}/api/auth/signup`, { name, email, password });
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
  };

  // Logout
  const logout = () => {
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("user");
  };

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
