import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/APIclient";

export default function Dashboard() {
  const [updates, setUpdates] = useState([]);
  const { user, logout } = useAuth();

  const fetchUpdates = async () => {
    const res = await API.get("/updates/my");
    setUpdates(res.data);
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-8">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome, {user?.name}
        </h2>

        <div className="flex gap-4 mt-4">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>

          <button
            onClick={async () => {
              const title = prompt("Enter task title");
              const content = prompt("Enter task description");
              if (title && content) {
                await API.post("/updates", { title, content });
                fetchUpdates();
              }
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
          >
            + Add New Task
          </button>
        </div>
      </div>

      {/* Updates List */}
      <div className="w-full max-w-lg space-y-4">
        {updates.length === 0 ? (
          <p className="text-center text-gray-600">No updates yet.</p>
        ) : (
          updates.map((u) => (
            <div
              key={u._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {u.title}
              </h3>
              <p className="text-gray-700 mb-3">{u.content}</p>

              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    const newContent = prompt("Edit content", u.content);
                    if (newContent !== null) {
                      await API.put(`/updates/${u._id}`, { content: newContent });
                      fetchUpdates();
                    }
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
                >
                  Edit
                </button>

                <button
                  onClick={async () => {
                    if (confirm("Delete this task?")) {
                      await API.delete(`/updates/${u._id}`);
                      fetchUpdates();
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

