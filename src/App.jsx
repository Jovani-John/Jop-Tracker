import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import { motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import JobDetailsPage from "./pages/JobDetailsPage";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Animated background particles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
              <motion.div
                className="absolute w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ top: "10%", left: "10%" }}
              />
              <motion.div
                className="absolute w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"
                animate={{
                  x: [0, -100, 0],
                  y: [0, -50, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ bottom: "10%", right: "10%" }}
              />
            </div>

            <Navbar />
            
            <main className="flex-grow p-4 sm:p-8 relative z-10">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<About />} />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add"
                  element={
                    <ProtectedRoute>
                      <AddJob />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/job/:id"
                  element={
                    <ProtectedRoute>
                      <JobDetailsPage />
                    </ProtectedRoute>
                  }
                />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            
            <Footer />
          </div>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}