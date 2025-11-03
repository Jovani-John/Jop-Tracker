import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const statuses = ["Applied", "Interviewing", "Offer", "Rejected"];

const statusIcons = {
  Applied: "📝",
  Interviewing: "💬",
  Offer: "🎉",
  Rejected: "❌"
};

export default function JobForm({ onSubmit, initialData, submitLabel = "Save" }) {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [status, setStatus] = useState(statuses[0]);
  const [appliedDate, setAppliedDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setCompanyName(initialData.companyName || "");
      setJobTitle(initialData.jobTitle || "");
      setStatus(initialData.status || statuses[0]);
      setAppliedDate(initialData.appliedDate ? initialData.appliedDate.split("T")[0] : "");
      setNotes(initialData.notes || "");
    }
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!companyName.trim() || !jobTitle.trim() || !appliedDate) {
      alert("Please fill company, job title, and applied date.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onSubmit({
        companyName: companyName.trim(),
        jobTitle: jobTitle.trim(),
        status,
        appliedDate,
        notes: notes.trim(),
      });
      setIsSubmitting(false);
    }, 500);
  }

  const inputClasses = "w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/50";
  const labelClasses = "block font-semibold text-gray-700 mb-2 flex items-center space-x-2";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-lg mx-auto space-y-6 border border-gray-100"
    >
      {/* Company Name */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <label className={labelClasses}>
          <span className="text-xl">🏢</span>
          <span>Company Name</span>
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className={inputClasses}
          placeholder="Enter company name"
          required
        />
      </motion.div>

      {/* Job Title */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <label className={labelClasses}>
          <span className="text-xl">💼</span>
          <span>Job Title</span>
        </label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className={inputClasses}
          placeholder="Enter job title"
          required
        />
      </motion.div>

      {/* Status */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <label className={labelClasses}>
          <span className="text-xl">📊</span>
          <span>Status</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {statuses.map((s) => (
            <motion.button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                status === s
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="text-lg">{statusIcons[s]}</span>
              <span>{s}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Applied Date */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <label className={labelClasses}>
          <span className="text-xl">📅</span>
          <span>Applied Date</span>
        </label>
        <input
          type="date"
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
          className={inputClasses}
          required
        />
      </motion.div>

      {/* Notes */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <label className={labelClasses}>
          <span className="text-xl">📝</span>
          <span>Notes</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className={`${inputClasses} resize-none`}
          placeholder="Add any additional notes..."
        />
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        className={`w-full py-4 font-bold rounded-xl text-white shadow-lg transition-all duration-300 ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-2xl"
        }`}
      >
        {isSubmitting ? (
          <motion.div
            className="flex items-center justify-center space-x-2"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <span className="text-xl">⏳</span>
            <span>Processing...</span>
          </motion.div>
        ) : (
          <span className="flex items-center justify-center space-x-2">
            <span className="text-xl">✨</span>
            <span>{submitLabel}</span>
          </span>
        )}
      </motion.button>
    </motion.form>
  );
}