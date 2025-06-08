import React, { useState, useEffect } from "react";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    fetch("/src/data/bridges.json")
      .then((response) => response.json())
      .then((data) => {
        // Extract all image URLs from all bridges
        const images = data.flatMap((bridge) => bridge.images).filter(Boolean);
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
