import React, { useState, useEffect } from "react";
import bridges from "../data/bridges.json";
import '../App.css';

const Homepage = () => {
  // Extract images from the first five bridge entries since fakuade hasnt added all of them yet
  const allImages = bridges.slice(0, 5).flatMap(bridge => bridge.images);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 8000); // 8 seconds per image

    return () => clearInterval(interval);
  }, [allImages.length]);

  return (
    <section
      className="homepage"
      style={{
        backgroundImage: `url(${allImages[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 2s ease-in-out",
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
