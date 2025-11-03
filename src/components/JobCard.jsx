import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const statusConfig = {
  Applied: {
    color: "from-blue-500 to-blue-600",
    icon: "📝",
    shadow: "shadow-blue-500/50"
  },
  Interviewing: {
    color: "from-yellow-500 to-orange-500",
    icon: "💬",
    shadow: "shadow-yellow-500/50"
  },
  Offer: {
    color: "from-green-500 to-emerald-600",
    icon: "🎉",
    shadow: "shadow-green-500/50"
  },
  Rejected: {
    color: "from-red-500 to-rose-600",
    icon: "❌",
    shadow: "shadow-red-500/50"
  },
};

export default function JobCard({ job }) {
  const config = statusConfig[job.status] || statusConfig.Applied;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.03,
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      <Link to={`/job/${job.id}`}>
        {/* Glowing background effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-r ${config.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-2xl`} />
        
        {/* Card Container */}
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
          {/* Decorative corner gradient */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${config.color} opacity-10 blur-2xl rounded-full -translate-y-16 translate-x-16`} />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <motion.h3
                  className="font-bold text-xl text-gray-800 mb-1 group-hover:text-blue-600 transition-colors"
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                >
                  {job.jobTitle}
                </motion.h3>
                <p className="text-gray-600 font-medium">{job.companyName}</p>
              </div>

              {/* Status Badge */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`flex items-center space-x-2 bg-gradient-to-r ${config.color} text-white px-4 py-2 rounded-full shadow-lg ${config.shadow}`}
              >
                <span className="text-lg">{config.icon}</span>
                <span className="text-sm font-semibold whitespace-nowrap">{job.status}</span>
              </motion.div>
            </div>

            {/* Date Info */}
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <motion.span
                animate={{ rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-lg"
              >
                📅
              </motion.span>
              <span>Applied: {new Date(job.appliedDate).toLocaleDateString()}</span>
            </div>

            {/* Notes Preview (if exists) */}
            {job.notes && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <p className="text-gray-600 text-sm line-clamp-2">
                  {job.notes}
                </p>
              </motion.div>
            )}

            {/* Hover Arrow Indicator */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
              className="absolute bottom-6 right-6 text-blue-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>

          {/* Bottom Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.color} origin-left`}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}