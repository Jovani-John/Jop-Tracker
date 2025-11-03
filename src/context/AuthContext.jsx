import React, { createContext, useContext, useState, useEffect } from "react";
import { sendSignUpNotification, sendLoginNotification } from "../services/EmailService";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    try {
      const loggedInUser = localStorage.getItem("currentUser");
      if (loggedInUser) {
        setCurrentUser(JSON.parse(loggedInUser));
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sign Up
  async function signUp(name, email, password) {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Check if user already exists
      if (users.find(u => u.email === email)) {
        throw new Error("User already exists with this email");
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        createdAt: new Date().toISOString()
      };

      // Save user
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Login the user
      const userWithoutPassword = { ...newUser };
      delete userWithoutPassword.password;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

      // Send email notification (async, don't wait for it)
      sendSignUpNotification(newUser.name, newUser.email)
        .then((result) => {
          if (result.success) {
            console.log("✅ Sign up notification sent successfully");
          } else {
            console.warn("⚠️ Failed to send sign up notification:", result.message);
          }
        })
        .catch((error) => {
          console.error("❌ Error sending sign up notification:", error);
        });

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Login
  async function login(email, password) {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        u => u.email === email.trim().toLowerCase() && u.password === password
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

      // Send email notification (async, don't wait for it)
      sendLoginNotification(user.name, user.email)
        .then((result) => {
          if (result.success) {
            console.log("✅ Login notification sent successfully");
          } else {
            console.warn("⚠️ Failed to send login notification:", result.message);
          }
        })
        .catch((error) => {
          console.error("❌ Error sending login notification:", error);
        });

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Logout
  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }

  const value = {
    currentUser,
    isLoading,
    signUp,
    login,
    logout,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}