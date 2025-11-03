import React from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";
import { useJobs } from "../context/JobContext";
import { motion } from "framer-motion";

export default function AddJob() {
  const { addJob } = useJobs();
  const navigate = useNavigate();

  function handleAdd(job) {
    addJob(job);
    navigate("/");
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 3
          }}
          className="text-6xl mb-4"
        >
          ✨
        </motion.div>
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Add New Job Application
        </h2>
        <p className="text-gray-600">Fill in the details to track your new opportunity</p>
      </motion.div>

      {/* Decorative Elements */}
      <div className="relative">
        <motion.div
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut"
          }}
          className="absolute -top-8 -left-8 w-16 h-16 bg-blue-200/50 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -10, 0],
            y: [0, 10, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut"
          }}
          className="absolute -bottom-8 -right-8 w-20 h-20 bg-indigo-200/50 rounded-full blur-xl"
        />

        {/* Form */}
        <JobForm onSubmit={handleAdd} submitLabel="Add Job Application" />
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="mt-6 mx-auto flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-medium">Back to Dashboard</span>
      </motion.button>
    </div>
  );
}