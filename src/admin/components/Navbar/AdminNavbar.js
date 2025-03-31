import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminNavbar.css";
import { Menu, Home } from "@mui/icons-material"; // Import Material Icons

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const brandName = process.env.REACT_APP_BRAND_NAME;
  return (
    <nav className="admin-navbar">
      <div className="admin-left">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="admin-right">
        <span className="org-name">{brandName}</span>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu fontSize="large" />
        </button>
      </div>

      {/* Responsive Dropdown Menu */}
      {menuOpen && (
        <div className="admin-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <Home fontSize="small" /> Go to Website
          </Link>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
