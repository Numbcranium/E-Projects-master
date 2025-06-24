import React, { useState, useEffect } from "react";
import bridges from "../data/bridges.json";
import '../App.css';

const Homepage = () => {
  // Extract images from the first five bridge entries 
  const allImages = bridges.slice(0, 40).flatMap(bridge => bridge.images);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(allImages[0]);

  useEffect(() => {
    const preloadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    };

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % allImages.length;
        preloadImage(allImages[nextIndex]).then(() => {
          setBackgroundImage(allImages[nextIndex]);
        });
        return nextIndex;
      });
    }, 8000); // 8 seconds per image

    return () => clearInterval(interval);
  }, [allImages]);

  return (
    <section
      className="homepage"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // Removed transition on background-image to avoid flicker
        minHeight: "100vh",
      }}
    >
      <div className="content">
        <h1>Welcome to the World's Most Incredible Bridges</h1>
        <p>
          Explore the marvels of engineering and design from around the globe.
          Discover historical great bridges, iconic structures, and modern achievements.
        </p>
      </div>
    </section>
  );
};

export default Homepage;
