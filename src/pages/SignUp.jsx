import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validation
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Simulate delay for better UX
    setTimeout(async () => {
      const result = await signUp(name, email, password);
      
      if (result.success) {
        // Show success message
        setShowSuccess(true);
        
        // Navigate after showing success
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(result.error);
        setIsLoading(false);
      }
    }, 500);
  }

  const inputClasses = "w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/50";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl"
                >
                  ✅
                </motion.span>
                <div>
                  <p className="font-bold text-lg">Account Created!</p>
                  <p className="text-sm text-green-100">Email notification sent 📧</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 3
            }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Create Account
          </h2>
          <p className="text-gray-600">Start tracking your job applications</p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-5 border border-gray-100"
        >
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center space-x-3"
            >
              <span className="text-2xl">⚠️</span>
              <p className="text-red-600 font-medium">{error}</p>
            </motion.div>
          )}

          {/* Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2 flex items-center space-x-2">
              <span className="text-xl">👤</span>
              <span>Full Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
              placeholder="Enter your name"
              disabled={isLoading}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2 flex items-center space-x-2">
              <span className="text-xl">📧</span>
              <span>Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2 flex items-center space-x-2">
              <span className="text-xl">🔒</span>
              <span>Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses}
              placeholder="At least 6 characters"
              disabled={isLoading}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2 flex items-center space-x-2">
              <span className="text-xl">🔐</span>
              <span>Confirm Password</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClasses}
              placeholder="Re-enter password"
              disabled={isLoading}
            />
          </div>

          {/* Email Notification Info */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start space-x-3"
          >
            <span className="text-2xl">📧</span>
            <div className="text-sm text-blue-700">
              <p className="font-semibold mb-1">Email Notification</p>
              <p>An email will be sent to the admin when you sign up</p>
            </div>
          </motion.div> */}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className={`w-full py-4 font-bold rounded-xl text-white shadow-lg transition-all duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-2xl"
            }`}
          >
            {isLoading ? (
              <motion.div
                className="flex items-center justify-center space-x-2"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <span className="text-xl">⏳</span>
                <span>Creating Account...</span>
              </motion.div>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <span className="text-xl">✨</span>
                <span>Sign Up</span>
              </span>
            )}
          </motion.button>

          {/* Login Link */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:text-indigo-600 transition-colors"
              >
                Login here
              </Link>
            </p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}