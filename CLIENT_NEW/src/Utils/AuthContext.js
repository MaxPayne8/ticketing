// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a Context for Auth
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component that will wrap your app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Function to get the current user
  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/api/users/currentuser");
      setCurrentUser(response.data.currentUser);
    } catch (err) {
      console.error("Failed to fetch current user", err);
      setCurrentUser(null);
    }
  };

  // Function to sign out the user
  const signOut = async () => {
    try {
      await axios.post("/api/users/signout");
      setCurrentUser(null);
    } catch (err) {
      console.error("Failed to sign out", err);
    }
  };

  // Fetch the current user when the component mounts
  useEffect(() => {
    getCurrentUser();
  }, []);

  // Provide the current user and auth functions to children
  return (
    <AuthContext.Provider value={{ currentUser, getCurrentUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
