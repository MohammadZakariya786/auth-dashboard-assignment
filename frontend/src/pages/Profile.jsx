import { useEffect, useState } from "react";
import api from "../api";
import { User, Mail, Lock, Edit3, Save, X } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/users/me");
      setUser(data);
      setForm({ name: data.name, email: data.email, password: "" });
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic validation before sending to server
  if (!form.name.trim()) {
    alert("Name is required!");
    return;
  }

  if (form.name.trim().length < 3) {
  alert("Name must be at least 3 characters long!");
  return;
  }

  if (!/^[A-Za-z\s]+$/.test(form.name)) {
    alert("Name must contain only letters and spaces!");
    return;
  }

  if (!form.email.trim()) {
    alert("Email is required!");
    return;
  }

  if (
    !/^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.com$/.test(form.email)
  ) {
    alert("Please enter a valid email address!");
    return;
  }

  if (form.password && form.password.length < 6) {
    alert("Password must be at least 6 characters long!");
    return;
  }

  try {
    await api.put("/users/me", form);
    alert("✅ Profile updated successfully!");
    setIsEditing(false);
    fetchProfile();
  } catch (err) {
    console.error("Error updating profile:", err);
  }
};


  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg mt-10 transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <User className="w-6 h-6 text-blue-600" /> My Profile
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 transition"
            title="Edit Profile"
          >
            <Edit3 size={22} />
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(false);
              setForm({ name: user.name, email: user.email, password: "" });
            }}
            className="text-gray-500 hover:text-red-500 transition"
            title="Cancel Editing"
          >
            <X size={22} />
          </button>
        )}
      </div>

      {/* Profile Info / Editable Form */}
      {!isEditing ? (
        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-3 border-b pb-2">
            <User className="text-blue-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b pb-2">
            <Mail className="text-blue-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b pb-2">
            <Lock className="text-blue-500" size={20} />
            <div>
              <p className="text-sm text-gray-500">Password</p>
              <p className="font-medium text-gray-400">••••••••</p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 mt-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              New Password (optional)
            </label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
          >
            <Save size={18} /> Update Profile
          </button>
        </form>
      )}
    </div>
  );
}
