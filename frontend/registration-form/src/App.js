import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./login"; // Ensure the correct path and filename
import RegistrationForm from "./RegistrationForm"; // Ensure correct path
import Dashboard from "./dashBoard"; // Ensure correct path

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />
        <Route path="/dashBoard" element={<Dashboard />} />
       
      </Routes>
    </Router>
  );
}

export default App;
