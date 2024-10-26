import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    surname: "",
    firstName: "",
    lastName: "",
    username:"",
    email: "",
    phoneNumber: "",
    role: "",
    organization: "",
    department: "",
    location: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  // List of departments for user to select from
  const departments = [
    "Administration & Logistics",
    "Information Technology (IT)",
    "Human Resources (HR)",
    "Finance & Accounting",
  ];

  // List of locations for the user to select from during registration
  const locations = ["Nairobi", "Mombasa", "Kisumu", "Nakuru"];

  // List of roles for the user to select from
  const roles = ["Project Manager", "Team Member", "Admin", "Client"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }

    // Send formData to Django
    fetch("http://localhost:8000/registration/register/", { // Adjust port and path if necessary
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          surname: formData.surname,
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
          email: formData.email,
          phone_number: formData.phoneNumber,
          role: formData.role,
          organization: formData.organization,
          department: formData.department,
          location: formData.location,
          password: formData.password,
      }),
  })
  
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        alert("Registration successful!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Registration failed!");
      });
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Surname */}
        <div>
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>

        {/* First Name */}
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
{/* user Name */}
<div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        {/* Email Address */}
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            placeholder="wainainapete@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label>Phone Number:</label>
          <input
            placeholder="0700000000"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        {/* Organization */}
        <div>
          <label>Organization:</label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role */}
        <div>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Department */}
        <div>
          <label>Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Department
            </option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label>Location:</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Location
            </option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Password */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Terms & Conditions */}
        <div className="checkbox-container">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
          />
          <label>I agree to the Terms and Privacy Policy</label>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
