import { useEffect, useState } from "react";
import api from "../api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    status: "",
  });

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const query = `?page=${page}&search=${search}&status=${filterStatus}`;
      const { data } = await api.get(`/tasks${query}`);
      setTasks(data.tasks);
      setTotal(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTasks();
    }, 400); // debounce search
    return () => clearTimeout(delay);
  }, [page, search, filterStatus]);

  // Delete task
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  // Edit logic
  const startEdit = (task) => {
    setEditingTask(task._id);
    setEditData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditData({ title: "", description: "", status: "" });
  };

  const saveEdit = async (id) => {
    await api.put(`/tasks/${id}`, editData);
    setEditingTask(null);
    fetchTasks();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="focus:outline-blue-500 bg-white border p-2 rounded w-full sm:w-1/2"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white border p-2 rounded w-full sm:w-1/4"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks found.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {tasks.map((t) => (
              <li
                key={t._id}
                className="p-4 bg-white rounded shadow flex justify-between items-start"
              >
                {editingTask === t._id ? (
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className="w-full border p-2 rounded"
                    />
                    <textarea
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded"
                    />
                    <select
                      value={editData.status}
                      onChange={(e) =>
                        setEditData({ ...editData, status: e.target.value })
                      }
                      className="border p-2 rounded w-full"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => saveEdit(t._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1">
                    <h3 className="font-semibold">{t.title}</h3>
                    <p className="text-sm text-gray-600">{t.description}</p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded mt-1 ${
                        t.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : t.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                )}

                <div className="space-x-2">
                  {editingTask === t._id ? null : (
                    <>
                      <button
                        onClick={() => startEdit(t)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(t._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(totalPages).keys()].map((i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  page === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
