import { createContext, useState, useEffect } from "react";
import { registerUser, loginUser, verifyToken } from "../services/authService";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data
  const [loading, setLoading] = useState(true); // Loading state

  // Check if user is already logged in (on page refresh)
  useEffect(() => {
    const verifyUser = async () => {
      setLoading(true); // Start loading before verification

      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        // Use axios-based verifyToken function
        const data = await verifyToken();
        setUser(data); // Set user if token is valid
        localStorage.setItem("user", JSON.stringify(data)); // Update user data in localStorage
      } catch (error) {
        console.error("Failed to verify user:", error);
        logout(); // Call logout if token is invalid
      } finally {
        setLoading(false); // Ensure loading is set to false after check
      }
    };

    verifyUser();
  }, []);

  // Register function
  const register = async (formData) => {
    try {
      const response = await registerUser(formData);
      setUser(response.data); // Update global user state
      localStorage.setItem("user", JSON.stringify(response.data)); // Store user data in localStorage
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      const res = await loginUser(credentials);
      console.log("Login response:", res);
      setUser(res); // Set the user state with the whole response
      localStorage.setItem("user", JSON.stringify(res)); // Store user data in localStorage
      return { success: true, message: res.message }; // Return the success status and message
    } catch (error) {
      return { success: false, message: error.message || "Login failed." };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setUser(null); // Clear user from context
      localStorage.removeItem("user"); // Remove user data from local storage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
