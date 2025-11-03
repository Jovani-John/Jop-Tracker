import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthContext";

const JobContext = createContext();

export function useJobs() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within JobProvider");
  }
  return context;
}

export function JobProvider({ children }) {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);

  // Load jobs for current user
  useEffect(() => {
    if (currentUser) {
      try {
        const userJobsKey = `jobs_${currentUser.id}`;
        const stored = localStorage.getItem(userJobsKey);
        setJobs(stored ? JSON.parse(stored) : []);
      } catch (error) {
        console.error("Error loading jobs:", error);
        setJobs([]);
      }
    } else {
      // Clear jobs when user logs out
      setJobs([]);
    }
  }, [currentUser]);

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    if (currentUser) {
      try {
        const userJobsKey = `jobs_${currentUser.id}`;
        localStorage.setItem(userJobsKey, JSON.stringify(jobs));
      } catch (error) {
        console.error("Error saving jobs:", error);
      }
    }
  }, [jobs, currentUser]);

  function addJob(job) {
    if (!currentUser) {
      throw new Error("You must be logged in to add jobs");
    }
    const newJob = {
      ...job,
      id: uuidv4(),
      userId: currentUser.id,
      createdAt: new Date().toISOString()
    };
    setJobs((prev) => [newJob, ...prev]);
  }

  function updateJob(id, updatedJob) {
    if (!currentUser) {
      throw new Error("You must be logged in to update jobs");
    }
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id
          ? { ...updatedJob, id, userId: currentUser.id, updatedAt: new Date().toISOString() }
          : job
      )
    );
  }

  function deleteJob(id) {
    if (!currentUser) {
      throw new Error("You must be logged in to delete jobs");
    }
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }

  function importJobs(importedJobs) {
    if (!currentUser) {
      throw new Error("You must be logged in to import jobs");
    }
    if (!Array.isArray(importedJobs)) {
      throw new Error("Invalid import data: must be an array");
    }
    // Add userId to imported jobs
    const jobsWithUser = importedJobs.map(job => ({
      ...job,
      userId: currentUser.id
    }));
    setJobs(jobsWithUser);
  }

  function clearAllJobs() {
    if (!currentUser) {
      throw new Error("You must be logged in");
    }
    if (window.confirm("Are you sure you want to delete all job applications?")) {
      setJobs([]);
    }
  }

  const value = {
    jobs,
    addJob,
    updateJob,
    deleteJob,
    importJobs,
    clearAllJobs
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}