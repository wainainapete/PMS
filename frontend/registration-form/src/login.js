import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./login.css";
import authService from "./authService.js";
import Swal from 'sweetalert2';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.login({ username, password });
      console.log("Logged in user:", user);

      // Save username to localStorage
      localStorage.setItem("username", user.username);

      // Show success popup and redirect
      Swal.fire({
        title: 'Login Successful',
        text: `Welcome, ${user.username}!`,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate("/dashBoard"); // Redirect to the dashboard after OK is clicked
      });

    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password");
      
      // Show error popup
      Swal.fire({
        title: 'Login Failed',
        text: 'Invalid username or password',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Project Management System (PMS) Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
