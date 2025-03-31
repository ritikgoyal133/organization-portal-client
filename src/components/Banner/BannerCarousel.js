import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { getBanners } from "../../services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BannerCarousel.css"; // For styling

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await getBanners();

        //Filter only active banners
        const activeBanners = response.filter(
          (banner) => banner.status === "active"
        );

        setBanners(activeBanners);
      } catch (error) {
        toast.error("Failed to load banners. Please try again.");
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading banners...</p>
      ) : banners.length > 0 ? (
        <Carousel className="banner-carousel" interval={3000} pause="hover">
          {banners.map((banner, index) => (
            <Carousel.Item key={banner._id || index}>
              <img
                className="d-block w-100"
                src={banner.imageUrl}
                alt={`Slide ${index + 1}`}
              />
              {banner.caption && (
                <Carousel.Caption>
                  <h3>{banner.title}</h3>
                  <p>{banner.description}</p>
                </Carousel.Caption>
              )}
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>No banners available</p>
      )}
    </>
  );
};

export default BannerCarousel;
