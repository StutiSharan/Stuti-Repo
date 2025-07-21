// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthProvider from "./context/AuthContext";
import FavoritesProvider from "./context/FavoritesContext"; // ✅ Make sure this path is correct

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <FavoritesProvider> {/* ✅ Wrap App inside FavoritesProvider */}
        <App />
      </FavoritesProvider>
    </AuthProvider>
  </React.StrictMode>
);
