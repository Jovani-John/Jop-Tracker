import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "../context/JobContext";
import JobForm from "../components/JobForm";
import { motion } from "framer-motion";

export default function JobDetailsPage() {
  const { id } = useParams();
  const { jobs, updateJob, deleteJob } = useJobs();
  const job = jobs.find((j) => j.id === id);
  const navigate = useNavigate();

  if (!job) {
    return <p className="text-center mt-10 text-red-600">Job not found!</p>;
  }

  function handleUpdate(updatedJob) {
    updateJob(id, updatedJob);
    alert("Job updated!");
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this job application?")) {
      deleteJob(id);
      navigate("/");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Job Details</h2>
      <JobForm onSubmit={handleUpdate} initialData={job} submitLabel="Update Job" />
      <button
        onClick={handleDelete}
        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold shadow"
      >
        Delete Job
      </button>
    </motion.div>
  );
}