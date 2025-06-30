import React, { useState, useEffect } from "react";
import bridges from "../data/SamuelBridges.json";
import '../App.css';
import reviewBack from "../assets/review back.png";

const initialReviews = [
  {
    id: 1,
    name: "Ray Robertson",
    title: "ABC treks with Global Treks Guide",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "My experience with Global Treks was absolutely phenomenal. The guide was user friendly, knowledgable, and made the entire journey smooth and exciting. I highly recommend them for anyone looking for adventure.",
    rating: 5,
  },
  {
    id: 2,
    name: "Tom Cruise",
    title: "ABC treks with Global Treks Guide",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "I've traveled with several tour companies, but none matched the quality and passion of Global Treks. From the start to finish, it was well-organized and filled with breathtaking views and unforgettable moments.",
    rating: 5,
  },
  {
    id: 3,
    name: "Person three",
    title: "ABC treks with Global Treks Guide",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    text: "I couldn't have asked for a better adventure. The team was incredibly supportive and made sure everyone felt safe and included. Every detail was taken care of, allowing me to fully enjoy the experience.",
    rating: 5,
  },
];

const Homepage = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [current, setCurrent] = useState(0);
  const length = reviews.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
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
    <>
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
{/*  */}
    </>
  )
}



export default Homepage;

