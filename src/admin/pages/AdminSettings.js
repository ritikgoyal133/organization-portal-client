// src/admin/pages/AdminSettings.js
import React, { useState } from "react";
import UsersTable from "../components/Users/UsersTable";
import SystemSettings from "../components/Settings/SystemSettings";
import "./AdminSettings.css";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="admin-settings">
      <h1>Admin Settings</h1>

      <div className="settings-tabs">
        <button
          onClick={() => setActiveTab("users")}
          className={activeTab === "users" ? "active" : ""}
        >
          Manage Users
        </button>
        <button
          onClick={() => setActiveTab("system")}
          className={activeTab === "system" ? "active" : ""}
        >
          System Settings
        </button>
      </div>

      <div className="settings-content">
        {activeTab === "users" && <UsersTable />}
        {activeTab === "system" && <SystemSettings />}
      </div>
    </div>
  );
};

export default AdminSettings;
