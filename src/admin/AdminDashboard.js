import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import AdminNavigation from "./components/Navbar/AdminNavbar.js";
import Dashboard from "./components/Dashboard/DashboardHome.js";
import Users from "./components/Users/UsersTable.js";
import Banners from "./components/Banners/BannersTable.js";
import SystemSettings from "./components/Settings/SystemSettings";
import Reviews from "./components/Reviews/ReviewsTable.js";
import Trips from "./components/Trips/TripsTable.js";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <Users />;
      case "settings":
        return <SystemSettings />;
      case "reviews":
        return <Reviews />;
      case "trips":
        return <Trips />;
      case "banners":
        return <Banners />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <AdminNavigation />
      <div className="admin-dashboard">
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
        <div className="admin-main">
          <div className="admin-content">{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
