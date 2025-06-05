import React from "react";
import '../App.css'
const Homepage = () => {
  return (
    <section className="homepage">
        <video autoPlay muted  loop className="video-background">
            <source src="../assets/" type="video/mp4"/>
            Your browser does not support the video tag.
        </video>
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
