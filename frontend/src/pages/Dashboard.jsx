import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskForm from "../components/TaskForm";
import { ClipboardList, PlusCircle } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  // Handle successful task creation
  const handleTaskAdded = () => {
    navigate("/tasks");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2 text-gray-800">
          <ClipboardList className="w-8 h-8 text-blue-600" />
          Dashboard
        </h2>
        <p className="text-gray-500 mt-2">
          Manage your daily tasks efficiently and stay organized 🚀
        </p>
      </div>

      {/* Action Buttons */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Task
        </button>
      ) : (
        <div className="w-full max-w-md">
          <TaskForm onTaskAdded={handleTaskAdded} />
          <button
            onClick={() => setShowForm(false)}
            className="mt-3 text-sm text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Quick Link */}
      <p className="mt-6 text-gray-600">
        Want to see your tasks?{" "}
        <button
          onClick={() => navigate("/tasks")}
          className="text-blue-600 hover:underline font-medium"
        >
          Go to Task List →
        </button>
      </p>
    </div>
  );
}
