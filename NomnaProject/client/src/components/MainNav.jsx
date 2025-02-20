import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown, ShoppingCart, History } from "lucide-react";

function MainNav() {
  const carts = useEcomStore((s) => s.carts);
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Navigation Links */}
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-extrabold text-white drop-shadow-md">
              NOMNA
            </Link>

            <NavLink
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive ? "bg-white text-indigo-600 shadow-md" : "hover:bg-white hover:text-indigo-600 text-white"
                }`
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive ? "bg-white text-indigo-600 shadow-md" : "hover:bg-white hover:text-indigo-600 text-white"
                }`
              }
              to="/shop"
            >
              Shop
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                  isActive ? "bg-white text-indigo-600 shadow-md" : "hover:bg-white hover:text-indigo-600 text-white"
                }`
              }
              to="/cart"
            >
              <ShoppingCart size={18} />
              {carts.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {carts.length}
                </span>
              )}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                  isActive ? "bg-white text-indigo-600 shadow-md" : "hover:bg-white hover:text-indigo-600 text-white"
                }`
              }
              to="/user/history"
            >
              <History size={18} />
              Order History
            </NavLink>
          </div>

          {/* User Authentication Section */}
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all bg-white text-indigo-600 shadow-md hover:shadow-lg"
              >
                <img
                  className="w-8 h-8 rounded-full border"
                  src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-professor-avatars-flat-icons-pack-people-456317.png?f=webp&w=256"
                  alt="User Avatar"
                />
                <ChevronDown size={16} />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden border animate-fadeIn">
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive ? "bg-white text-indigo-600 shadow-md" : "hover:bg-white hover:text-indigo-600 text-white"
                  }`
                }
                to="/register"
              >
                Register
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive ? "bg-white text-indigo-600 shadow-md" : "hover:bg-white hover:text-indigo-600 text-white"
                  }`
                }
                to="/login"
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MainNav;