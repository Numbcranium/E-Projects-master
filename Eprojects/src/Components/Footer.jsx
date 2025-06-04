import React, { useState, useEffect } from "react";

const Footer = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude.toFixed(2),
            longitude: position.coords.longitude.toFixed(2),
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="footer-ticker">
      <div className="ticker-content">
        <marquee>
          {dateTime.toLocaleString()} | Location:{" "}
          {location.latitude && location.longitude
            ? `${location.latitude}, ${location.longitude}`
            : "Location not available"}
        </marquee>
      </div>
    </footer>
  );
};

export default Footer;
