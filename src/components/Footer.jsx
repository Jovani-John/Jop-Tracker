import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 backdrop-blur-lg border-t border-gray-100 mt-8 shadow-lg relative z-10">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
        >
          {/* Left Section */}
          <div className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold">J</span>
            </motion.div>
            <span className="text-gray-700 font-semibold">JobTracker</span>
          </div>

          {/* Center Section */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              &copy; {currentYear} TrableJ. All rights reserved.
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-xs mt-1"
            >
              Made with <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-block text-red-500"
              >
                ❤️
              </motion.span> for job seekers
            </motion.p>
          </div>

          {/* Right Section - Social Links Placeholder */}
          <div className="flex space-x-4">
            {["📧", "🔗", "💼"].map((icon, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center hover:from-blue-100 hover:to-indigo-100 transition-colors shadow-sm"
              >
                <span className="text-lg">{icon}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 rounded-full"
        />
      </div>
    </footer>
  );
}