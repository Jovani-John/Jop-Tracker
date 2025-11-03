import React, { useRef, useState } from "react";
import { useJobs } from "../context/JobContext";
import JobCard from "../components/JobCard";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { jobs, importJobs } = useJobs();
  const fileInputRef = useRef();
  const [filterStatus, setFilterStatus] = useState("All");

  const statuses = ["All", "Applied", "Interviewing", "Offer", "Rejected"];

  const filteredJobs = filterStatus === "All"
    ? jobs
    : jobs.filter(job => job.status === filterStatus);

  const stats = {
    total: jobs.length,
    applied: jobs.filter(j => j.status === "Applied").length,
    interviewing: jobs.filter(j => j.status === "Interviewing").length,
    offers: jobs.filter(j => j.status === "Offer").length,
    rejected: jobs.filter(j => j.status === "Rejected").length,
  };

  function exportData() {
    const dataStr = JSON.stringify(jobs, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `job-applications-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function importFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          importJobs(imported);
          alert("Data imported successfully! 🎉");
        } else {
          alert("Invalid file format!");
        }
      } catch {
        alert("Failed to parse the file");
      }
    };
    reader.readAsText(file);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto"
    >
      {/* Header Section */}
      <motion.header variants={itemVariants} className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Job Applications Dashboard
            </h1>
            <p className="text-gray-600">Track and manage your job applications in one place</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link to="/add">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <span className="text-xl">➕</span>
                <span>Add Job</span>
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportData}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
            >
              <span className="text-xl">📥</span>
              <span>Export</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current.click()}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
            >
              <span className="text-xl">📤</span>
              <span>Import</span>
            </motion.button>

            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={importFile}
              className="hidden"
            />
          </div>
        </div>
      </motion.header>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Total", value: stats.total, icon: "📊", color: "from-blue-500 to-indigo-500" },
          { label: "Applied", value: stats.applied, icon: "📝", color: "from-cyan-500 to-blue-500" },
          { label: "Interviewing", value: stats.interviewing, icon: "💬", color: "from-yellow-500 to-orange-500" },
          { label: "Offers", value: stats.offers, icon: "🎉", color: "from-green-500 to-emerald-500" },
          { label: "Rejected", value: stats.rejected, icon: "❌", color: "from-red-500 to-rose-500" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl shadow-lg text-white`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm opacity-90">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter Tabs */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <motion.button
              key={s}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterStatus(s)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                filterStatus === s
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              {s}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Jobs Grid */}
      <AnimatePresence mode="wait">
        {filteredJobs.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2
              }}
              className="text-8xl mb-6"
            >
              📭
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No applications found</h3>
            <p className="text-gray-600 mb-6">
              {filterStatus === "All"
                ? "Start tracking your job applications by adding your first one!"
                : `No applications with status "${filterStatus}"`}
            </p>
            {filterStatus === "All" && (
              <Link to="/add">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Add Your First Job 🚀
                </motion.button>
              </Link>
            )}
          </motion.div>
        ) : (
          <motion.section
            key="grid"
            variants={containerVariants}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}