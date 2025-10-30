import { useState } from "react";
import api from "../api";

export default function TaskForm({ onTaskAdded }) {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/tasks", form);
    setForm({ title: "", description: "" });
    onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-2">
      <input name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Task title" required className="w-full focus:outline-blue-500 border p-2 rounded" />
      <textarea name="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="focus:outline-blue-500 w-full border p-2 rounded" />
      <button className="bg-blue-500 text-white w-full py-2 rounded">Add Task</button>
    </form>
  );
}
