import React from "react";
import { motion } from "framer-motion";

export default function About() {
  const features = [
    { icon: "📊", title: "Track Applications", desc: "Keep all your job applications organized in one place" },
    { icon: "✨", title: "Beautiful UI", desc: "Modern, responsive design with smooth animations" },
    { icon: "💾", title: "Local Storage", desc: "Your data stays private and secure on your device" },
    { icon: "📱", title: "Mobile Friendly", desc: "Works perfectly on all devices and screen sizes" },
    { icon: "📥", title: "Import/Export", desc: "Backup and restore your data easily" },
    { icon: "🚀", title: "Fast & Simple", desc: "No backend required, works offline" }
  ];

  const technologies = [
    { name: "React", color: "from-cyan-400 to-blue-500", icon: "⚛️" },
    { name: "Tailwind CSS", color: "from-sky-400 to-cyan-500", icon: "🎨" },
    { name: "Framer Motion", color: "from-pink-400 to-rose-500", icon: "🎬" },
    { name: "React Router", color: "from-red-400 to-pink-500", icon: "🛣️" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-16"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear"
          }}
          className="text-8xl mb-6"
        >
          🎯
        </motion.div>
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          About JobTracker
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your modern companion for tracking job applications with style
        </p>
      </motion.div>

      {/* Description Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-12 border border-gray-100"
      >
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong className="text-blue-600">JobTracker</strong> is a modern and responsive web application 
            designed to help you track your job applications easily and efficiently. Whether you're actively 
            job hunting or casually exploring opportunities, JobTracker keeps everything organized.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You can add, edit, and manage your job application details, filter by status, import/export your 
            data, and keep everything organized in one beautiful interface. Built with the latest web technologies 
            and designed with user experience in mind.
          </p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  delay: index * 0.2
                }}
                className="text-5xl mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Technologies Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Built With</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`bg-gradient-to-br ${tech.color} rounded-2xl p-6 shadow-lg text-white text-center`}
            >
              <div className="text-4xl mb-3">{tech.icon}</div>
              <div className="font-bold text-lg">{tech.name}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200"
      >
        <div className="flex items-start space-x-4">
          <motion.div
            animate={{
              scale: [1, 1.2, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 2
            }}
            className="text-4xl"
          >
            🔒
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Privacy First</h3>
            <p className="text-green-700">
              All your data is stored locally in your browser using LocalStorage. No data is sent to 
              any server, ensuring complete privacy and security. You can use this app completely 
              offline without any backend or internet connection.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Fun Footer Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-12 py-8"
      >
        <motion.div
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 2
          }}
          className="text-6xl mb-4"
        >
          🚀
        </motion.div>
        <p className="text-gray-600 font-medium">
          Happy job hunting! May all your applications turn into offers! 🎉
        </p>
      </motion.div>
    </motion.div>
  );
}