import React from "react";

const AboutUs = () => {
  return (
    <div style={{ padding: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <h2 style={{ margin: 0, alignSelf: "flex-start" }}>About us</h2>
      <div style={{ display: "flex", gap: "1rem",marginLeft:"350px" }}>
        <div style={{ height: "250px", width: "200px", backgroundColor: "#ccc",borderRadius:"20px" }}></div>
        <div style={{ height: "250px", width: "200px", backgroundColor: "#aaa",borderRadius:"20px" }}></div>
        <div style={{ height: "250px", width: "200px", backgroundColor: "#888",borderRadius:"20px" }}></div>
      </div>
    </div>
  );
};

export default AboutUs;
