import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "../context/JobContext";
import JobForm from "../components/JobForm";
import { motion, AnimatePresence } from "framer-motion";

export default function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, updateJob, deleteJob } = useJobs();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center mt-16"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 2
          }}
          className="text-8xl mb-6"
        >
          🔍
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Job Not Found</h2>
        <p className="text-gray-600 mb-8">The job application you're looking for doesn't exist.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg"
        >
          Back to Dashboard
        </motion.button>
      </motion.div>
    );
  }

  function handleUpdate(updatedJob) {
    updateJob(id, updatedJob);
    
    // Success animation
    const successDiv = document.createElement("div");
    successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg z-50";
    successDiv.innerHTML = `
      <div class="flex items-center space-x-2">
        <span class="text-2xl">✅</span>
        <span class="font-semibold">Job updated successfully!</span>
      </div>
    `;
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 3000);
  }

  function handleDelete() {
    deleteJob(id);
    navigate("/");
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear"
          }}
          className="text-6xl mb-4"
        >
          ⚙️
        </motion.div>
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Edit Job Details
        </h2>
        <p className="text-gray-600">Update your job application information</p>
      </motion.div>

      {/* Form */}
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            repeat: Infinity,
            duration: 4
          }}
          className="absolute -top-4 -left-4 w-24 h-24 bg-purple-200 rounded-full blur-2xl"
        />
        <JobForm onSubmit={handleUpdate} initialData={job} submitLabel="Update Job" />
      </div>

      {/* Delete Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowDeleteConfirm(true)}
        className="mt-6 w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
      >
        <span className="text-xl">🗑️</span>
        <span>Delete Job Application</span>
      </motion.button>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="mt-4 mx-auto flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-medium">Back to Dashboard</span>
      </motion.button>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteConfirm(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 shadow-2xl z-50 max-w-md w-full mx-4"
            >
              <div className="text-center">
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2
                  }}
                  className="text-6xl mb-4"
                >
                  ⚠️
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Delete Confirmation</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this job application? This action cannot be undone.
                </p>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDelete}
                    className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all"
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}