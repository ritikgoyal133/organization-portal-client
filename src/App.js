import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminSettings from "./admin/components/Settings/SystemSettings.js";
import AdminUsers from "./admin/components/Users/UsersTable.js";
import AdminBanners from "./admin/components/Banners/BannersTable.js";
import AdminDashboard from "./admin/AdminDashboard.js";
import Profile from "./pages/Profile/Profile.js";
import AuthContext from "./context/AuthContext";
import Home from "./pages/Home";

// Uncomment your page imports as needed
// import Home from "./pages/Home";
// import Trips from "./pages/Trips";
// import Reviews from "./pages/Reviews";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";

const App = () => {
  const { user } = useContext(AuthContext);
  console.log(`user is: ${user}`);

  const isAdmin = user?.role === "admin";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*when the user visits /profile, the Profile component will be displayed. */}
        <Route path="/profile" element={<Profile />} />
        {isAdmin && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/banners" element={<AdminBanners />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    // <Router>
    //   {/* Show Home Navigation initially */}
    //   {isAdmin ? <AdminNavigation user={user} /> : <Navigation user={user} />}

    //   <Routes>
    //     {/* Routes for admin dashboard */}
    //     {isAdmin ? (
    //       <>
    //         <Route path="/admin" element={<AdminDashboard />} />
    //         <Route path="/admin/settings" element={<AdminSettings />} />
    //         {/* Add more admin routes as needed */}
    //         <Route path="*" element={<Navigate to="/admin" />} />
    //         {/* Redirect any unmatched routes to admin */}
    //       </>
    //     ) : (
    //       <>
    //         {/* Uncomment and define your routes for the public pages */}
    //         {/* <Route path="/" element={<Home />} />
    //         <Route path="/trips" element={<Trips />} />
    //         <Route path="/reviews" element={<Reviews />} />
    //         <Route path="/contact" element={<Contact />} />
    //         <Route path="/profile" element={<Profile />} />
    //         <Route path="/login" element={<Login />} /> */}
    //         <Route path="*" element={<Navigate to="/" />} />
    //         {/* Redirect any unmatched routes to home */}
    //       </>
    //     )}
    //     {/* Redirect to the appropriate dashboard */}
    //     <Route path="/" element={<Navigate to={isAdmin ? "/admin" : "/"} />} />
    //   </Routes>
    // </Router>
  );
};

export default App;
