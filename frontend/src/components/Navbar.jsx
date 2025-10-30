import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, ClipboardList, LayoutDashboard, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <ClipboardList className="w-6 h-6" />
          TaskMate
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          {token ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-1 hover:text-blue-600 transition">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <Link to="/tasks" className="flex items-center gap-1 hover:text-blue-600 transition">
                <ClipboardList size={18} /> Tasks
              </Link>
              <Link to="/profile" className="flex items-center gap-1 hover:text-blue-600 transition">
                <User size={18} /> Profile
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-red-500 hover:text-red-600 transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-1 hover:text-blue-600 transition">
                <LogIn size={18} /> Login
              </Link>
              <Link to="/signup" className="flex items-center gap-1 hover:text-blue-600 transition">
                <UserPlus size={18} /> Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 bg-gray-50 rounded-lg shadow-inner flex flex-col space-y-2 p-4 text-gray-700 font-medium">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 hover:text-blue-600"
                onClick={toggleMenu}
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <Link
                to="/tasks"
                className="flex items-center gap-2 hover:text-blue-600"
                onClick={toggleMenu}
              >
                <ClipboardList size={18} /> Tasks
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-blue-600"
                onClick={toggleMenu}
              >
                <User size={18} /> Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="flex items-center gap-2 text-red-500 hover:text-red-600"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 hover:text-blue-600"
                onClick={toggleMenu}
              >
                <LogIn size={18} /> Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 hover:text-blue-600"
                onClick={toggleMenu}
              >
                <UserPlus size={18} /> Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
