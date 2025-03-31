import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true, // Allow cookies for authentication
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
