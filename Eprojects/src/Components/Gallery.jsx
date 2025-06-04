import React from "react";

const galleryImages = [
  "https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/5/5c/Tower_Bridge_London_Feb_2006.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6a/Akashi-Kaikyo_Bridge_2010-10-16.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/3a/Brooklyn_Bridge_Postdlf.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/1a/Charles_Bridge_Prague_2007.jpg",
];

const Gallery = () => {
  return (
    <section className="gallery-section">
      <h3>Gallery</h3>
      <div className="gallery-grid">
        {galleryImages.map((src, index) => (
          <img key={index} src={src} alt={`Bridge ${index + 1}`} className="gallery-image" />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
