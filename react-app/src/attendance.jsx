import React from "react";

export default function Attendance() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Attendance Dashboard</h1>
      </header>
      <section className="dashboard-summary">
        <div className="summary-card">
          <h2>Total Students</h2>
          <p>50</p>
        </div>
        <div className="summary-card">
          <h2>Present Today</h2>
          <p>-</p>
        </div>
        <div className="summary-card">
          <h2>Absent Today</h2>
          <p>-</p>
        </div>
      </section>
      <section className="dashboard-table">
        <h2>Student List</h2>
        <table>
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Example rows, replace with map when adding logic */}
            <tr>
              <td>S001</td>
              <td>Aarav Sharma</td>
              <td>-</td>
            </tr>
            <tr>
              <td>S002</td>
              <td>Priya Singh</td>
              <td>-</td>
            </tr>
            {/* ...more rows */}
          </tbody>
        </table>
      </section>
    </div>
  );
}
