// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import React from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null, role: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({ token, user: decoded.userId, role: decoded.role });
      } catch {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setAuth({ token, user: decoded.userId, role: decoded.role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
