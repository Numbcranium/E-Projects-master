import React from "react";

const Sitemap = () => {
  const links = [
    "Historical Great Bridges",
    "High-Level Achievements",
    "Iconic Bridges",
    "Modern Great Bridges",
    "Longest",
    "Tallest",
    "Highest",
    "Oldest",
    "Gallery",
    "Feedback",
    "About Us",
    "FAQ",
    "Contact Us",
  ];

  return (
    <section className="sitemap-section">
      <h3>Site Map</h3>
      <ul>
        {links.map((link, index) => (
          <li key={index}>{link}</li>
        ))}
      </ul>
    </section>
  );
};

export default Sitemap;
