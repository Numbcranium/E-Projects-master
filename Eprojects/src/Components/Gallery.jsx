import React, { useState, useEffect } from "react";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    fetch("/data/SamuelBridges.json")
      .then((response) => response.json())
      .then((data) => {
        // Extract first image URL from each unique bridge to avoid duplicates
        const uniqueBridgesMap = new Map();
        data.forEach((bridge) => {
          if (bridge.images && bridge.images.length > 0 && !uniqueBridgesMap.has(bridge.id)) {
            uniqueBridgesMap.set(bridge.id, bridge.images[0]);
          }
        });
        const images = Array.from(uniqueBridgesMap.values());
        setGalleryImages(images);
      })
      .catch((error) => console.error("Error loading bridge images:", error));
  }, []);

  return (
    <section className="gallery-section">
      <h3>Gallery</h3>
      <div className="gallery-grid">
        {galleryImages.map((src, index) => (
          <img key={index} src={src} alt={`Bridge Image ${index + 1}`} className="gallery-image" />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
