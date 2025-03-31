import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

const Carousel = ({ items, renderCard }) => {
  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000, // Time per slide in ms
    pauseOnHover: true, // Pause on mouse hover
    cssEase: "ease-in-out", // Smooth animation
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true, // Allow dragging on desktop
    swipe: true, // Allow swiping on mobile
    touchMove: true, // Enable touch gestures
    swipeToSlide: true, // Allow partial slide on swipe
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index}>{renderCard(item)}</div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
