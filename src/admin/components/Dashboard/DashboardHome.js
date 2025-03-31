// src/admin/components/Dashboard/DashboardHome.js
import React, { useEffect, useState } from "react";
import "./DashboardHome.css";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    users: 0,
    trips: 0,
    reviews: 0,
  });

  useEffect(() => {
    // Simulate fetching data from API
    const fetchStats = async () => {
      try {
        // Replace with API calls later
        setStats({ users: 120, trips: 50, reviews: 200 });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-home">
      {/* <h2>Admin Dashboard</h2> */}

      {/* Stats Container */}
      <div className="stats-container">
        <div className="stat-card users">
          <h3>{stats.users}</h3>
          <p>Total Users</p>
        </div>
        <div className="stat-card trips">
          <h3>{stats.trips}</h3>
          <p>Total Trips</p>
        </div>
        <div className="stat-card reviews">
          <h3>{stats.reviews}</h3>
          <p>Total Reviews</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          <li>
            <strong>John Doe</strong> booked a trip to <strong>Paris</strong>.
          </li>
          <li>
            <strong>Jane Smith</strong> left a review on{" "}
            <strong>Goa Trip</strong>.
          </li>
          <li>
            New user <strong>Alex Johnson</strong> signed up.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
