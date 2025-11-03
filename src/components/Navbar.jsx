import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  function handleLogout() {
    logout();
    setShowUserMenu(false);
    navigate("/login");
  }

  const navItems = [
    { to: "/", label: "Dashboard", end: true, auth: true },
    { to: "/add", label: "Add Job", auth: true },
    { to: "/about", label: "About", auth: false }
  ];

  const filteredNavItems = isAuthenticated
    ? navItems
    : navItems.filter(item => !item.auth);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"
          >
            <span className="text-white font-bold text-xl">J</span>
          </motion.div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            JobTracker
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center space-x-2">
          {/* Nav Links */}
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive ? "text-white" : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="relative ml-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg"
              >
                <span className="text-xl">👤</span>
                <span className="font-semibold">{currentUser?.name}</span>
                <motion.svg
                  animate={{ rotate: showUserMenu ? 180 : 0 }}
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </motion.button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                  >
                    <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                      <p className="font-semibold text-gray-800">{currentUser?.name}</p>
                      <p className="text-sm text-gray-600 truncate">{currentUser?.email}</p>
                    </div>
                    <motion.button
                      whileHover={{ backgroundColor: "#fee2e2" }}
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-red-600 font-semibold flex items-center space-x-2 transition-colors"
                    >
                      <span className="text-xl">🚪</span>
                      <span>Sign Out</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex space-x-2 ml-4">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold shadow-lg"
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleMenu}
          className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <motion.svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: isOpen ? 180 : 0 }}
          >
            {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </motion.svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              {/* User Info (Mobile) */}
              {isAuthenticated && (
                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <p className="font-semibold text-gray-800 flex items-center space-x-2">
                    <span className="text-xl">👤</span>
                    <span>{currentUser?.name}</span>
                  </p>
                  <p className="text-sm text-gray-600 truncate">{currentUser?.email}</p>
                </div>
              )}

              {/* Nav Items */}
              {filteredNavItems.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg font-medium transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}

              {/* Auth Buttons (Mobile) */}
              {isAuthenticated ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg font-semibold shadow-lg flex items-center justify-center space-x-2"
                >
                  <span className="text-xl">🚪</span>
                  <span>Sign Out</span>
                </motion.button>
              ) : (
                <div className="mt-4 space-y-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg font-semibold"
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold shadow-lg"
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}