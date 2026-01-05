import { useEffect, useState } from "react";
import API from "../api/APIclient";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [updates, setUpdates] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  // Fetch all updates
  const fetchAllUpdates = async () => {
    try {
      const res = await API.get("/updates");
      setUpdates(res.data);
    } catch (err) {
      console.error("Failed to fetch updates", err);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers();
      fetchAllUpdates();
    }
  }, [user]);

  // Restrict non-admin access
  if (user?.role !== "admin") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-red-600 font-semibold">
          Access denied — Admins only
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Registered Users */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
        <table className="w-full border-collapse border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="text-center hover:bg-gray-50">
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2 capitalize">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* All User Updates */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">All User Updates</h2>

        {updates.length === 0 ? (
          <p className="text-gray-600 text-center">No updates yet.</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">User</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Content</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {updates.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50 text-center">
                  <td className="border p-2">{u.userId?.name}</td>
                  <td className="border p-2 text-gray-600">
                    {u.userId?.email}
                  </td>
                  <td className="border p-2 font-semibold">{u.title}</td>
                  <td className="border p-2 text-gray-700">{u.content}</td>
                  <td className="border p-2">
                    <button
                      onClick={async () => {
                        const newContent = prompt("Edit content:", u.content);
                        if (newContent !== null) {
                          await API.put(`/updates/${u._id}`, {
                            content: newContent,
                          });
                          fetchAllUpdates();
                        }
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm("Delete this update?")) {
                          await API.delete(`/updates/${u._id}`);
                          fetchAllUpdates();
                        }
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
