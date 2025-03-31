import React from "react";
import { Link } from "react-router-dom";
import {
  Dashboard,
  People,
  RateReview,
  Flight,
  Settings,
} from "@mui/icons-material";
import "./Sidebar.css";

const Sidebar = ({ setActiveTab, activeTab }) => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <Dashboard />,
      key: "dashboard",
      path: "/admin/dashboard",
    },
    { name: "Users", icon: <People />, key: "users", path: "/admin/users" },
    {
      name: "Banners",
      icon: <People />,
      key: "banners",
      path: "/admin/banners",
    },
    {
      name: "Reviews",
      icon: <RateReview />,
      key: "reviews",
      path: "/admin/reviews",
    },
    { name: "Trips", icon: <Flight />, key: "trips", path: "/admin/trips" },
    {
      name: "Settings",
      icon: <Settings />,
      key: "settings",
      path: "/admin/settings",
    },
  ];

  return (
    <div className="sidebar">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.key}
            className={activeTab === item.key ? "active" : ""}
            onClick={() => setActiveTab(item.key)}
          >
            <Link to={item.path}>
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
