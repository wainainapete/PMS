import React from "react";
import { Link } from "react-router-dom"; // Use Link for navigation between pages
import "./dashBoard.css"; // Ensure you have the right styling for layout

function Dashboard() {
  const username = localStorage.getItem("username");

  const tasks = [
    {
      name: "UI Creation",
      status: "Active",
      deadline: "October 18, 7:00 PM",
      createdBy: "Peter Wainaina N",
      assignee: "Peter Wainaina N",
      project: "Project Alpha",
      tags: "Design"
    }
    // Add more tasks as needed
  ];

  return (
    <div className="dashboard-container">
      {/* Main Project Title */}
      <div className="project-header">
        <h1>PROJECT MANAGEMENT SYSTEM</h1>
      </div>

      {/* Header Section */}
      <header className="dashBoard-header">
        
        {username && <h3>Welcome, {username}!</h3>}
        <button className="create-button">Create Task</button>
        <input type="text" className="search-input" placeholder="Filter and search" />
      </header>

      {/* Sidebar Section */}
      <aside className="sidebar">
        <ul>
          <li><Link to="/dashBoard">Dashboard</Link></li>
          <li><Link to="/tasks">My Tasks</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/RegistrationForm">Register User</Link></li> {/* Navigates to the RegistrationForm page */}
          <li><Link to="/login">Log Out</Link></li>
        </ul>
      </aside>

      {/* Main Content Section */}
      <main className="main-content">
        <h2>My Tasks</h2>
        <div className="task-table-container">
          <table className="task-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Created by</th>
                <th>Assignee</th>
                <th>Project</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                  <td>{task.deadline}</td>
                  <td>{task.createdBy}</td>
                  <td>{task.assignee}</td>
                  <td>{task.project}</td>
                  <td>{task.tags}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="dashBoard-footer">
        <p>Total Tasks: {tasks.length}</p>
        <p>Records: 50</p>
      </footer>
    </div>
  );
}

export default Dashboard;
