import axios from 'axios';

const API_URL = "http://localhost:8000/login/"; // Adjust this URL as necessary

// Create an Axios instance for better configuration management
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000, // Set a timeout for requests
  headers: {
    'Content-Type': 'application/json', // Set content type for requests
  },
});

const authService = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('', credentials); // Sending credentials to the API

      if (response.status === 200) {
        // Login successful, handle token or user data here if needed
        // Store token in localStorage if your backend provides it
        if (response.data.token) {
          localStorage.setItem('token', response.data.token); // Store token
        }
        return response.data; // Assuming the server returns user data
      } else {
        throw new Error("Login failed: " + response.statusText); // Handle non-200 responses
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error logging in:", error);
      throw new Error(
        error.response ? error.response.data.message : "Login failed"
      ); // Customize error message
    }
  },

  logout: () => {
    localStorage.removeItem('token'); // Clear token on logout
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token'); // Check if a token exists
  },
};

export default authService;
