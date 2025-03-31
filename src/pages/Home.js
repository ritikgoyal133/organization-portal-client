import React, { useContext } from "react";
import Navigation from "../components/Navbar/Navbar";
import AuthContext from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import Banner from "../components/Banner/BannerCarousel";
// import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel/Carousel";
import UserCard from "../components/User/UserCard";
import TripCard from "../components/Trip/TripCard";
import ReviewCard from "../components/Review/ReviewCard";
import { users, trips, reviews } from "../utils/dummyData";

const Home = () => {
  const { user } = useContext(AuthContext);
  //   const navigate = useNavigate();
  //   const isAdmin = user?.role === "admin";
  const handleViewUserDetails = (user) => {
    console.log("View details for:", user);
  };

  return (
    <div>
      <Navigation user={user} />
      <ToastContainer position="top-right" autoClose={3000} />
      <Banner />
      <h2>Top Travelers</h2>
      <Carousel
        items={users}
        renderCard={(user) => (
          <UserCard user={user} onViewDetails={handleViewUserDetails} />
        )}
      />

      <h2>Popular Trips</h2>
      <Carousel items={trips} renderCard={(trip) => <TripCard trip={trip} />} />

      <h2>Best Reviews</h2>
      <Carousel
        items={reviews}
        renderCard={(review) => <ReviewCard review={review} />}
      />
    </div>
  );
};

export default Home;
