import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = "https://stuti-repo-1.onrender.com";

export default function Profile() {
  const { user, setUserState, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    if (!user) return;
    setSaving(true);
    try {
      // send token with request
      const res = await axios.put(
        `${API}/api/auth/profile`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // token from login/signup response
          },
        }
      );

      const updated = res.data.user || res.data;
      setUserState({ ...user, name: updated.name });
      alert("✅ Profile updated successfully");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-4 rounded shadow">
        <label className="block text-sm text-gray-600 mb-2">Display Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            disabled={saving}
            className="px-4 py-2 bg-cyan-600 text-white rounded"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
