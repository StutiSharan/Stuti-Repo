import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = "https://stuti-repo-1.onrender.com";

export default function AdminPanel() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchAll();
    // eslint-disable-next-line
  }, [user]);

  const fetchAll = async () => {
    try {
      const [uRes, nRes] = await Promise.all([
        axios.get(`${API}/api/admin/users`),
        axios.get(`${API}/api/admin/notes`)
      ]);
      setUsers(uRes.data);
      setNotes(nRes.data);
    } catch (err) {
      console.error(err);
      alert("Admin fetch failed");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <section className="mb-8 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">All Users</h2>
        <div className="overflow-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-b">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">All Notes</h2>
        <div className="overflow-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Title</th>
                <th className="p-2">Owner</th>
                <th className="p-2">Shared With</th>
                <th className="p-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {notes.map(n => (
                <tr key={n._id} className="border-b">
                  <td className="p-2">{n.title}</td>
                  <td className="p-2">{n.owner?.name || n.owner}</td>
                  <td className="p-2">{(n.sharedWith || []).join(", ")}</td>
                  <td className="p-2">{new Date(n.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
