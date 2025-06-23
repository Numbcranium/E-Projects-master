import React, { useState } from "react";
import reviewBack from "../assets/review back.png";
import "../App.css";

const reviews = [
  {
    id: 1,
    name: "Ray Robertson",
    title: "ABC treks with Global Treks Guide",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore. Lorem Ipsum Dolor Sit Amet.",
    rating: 5,
  },
  {
    id: 2,
    name: "Tom Cruise",
    title: "ABC treks with Global Treks Guide",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore. Lorem Ipsum Dolor Sit Amet.",
    rating: 5,
  },
  {
    id: 3,
    name: "Person three",
    title: "ABC treks with Global Treks Guide",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    text: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore. Lorem Ipsum Dolor Sit Amet.",
    rating: 5,
  },
];

const ReviewCarousel = () => {
  const [current, setCurrent] = useState(0);
  const length = reviews.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="review-carousel-container" style={{position: "relative", padding: "2rem", height:"100vh", justifyContent:"center", display: "flex", alignItems: "center"}}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // backgroundImage: `url(${reviewBack})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
          zIndex: 0,
          // backgroundColor: "rgba(0, 0, 139, 0.5)",
          backgroundBlendMode: "overlay",
        }}
      />
      <section className="review-carousel" style={{backgroundColor: "rgba(0, 58, 124, 0.8)", color: "white", padding: "2rem", borderRadius: "20px", position: "relative", minWidth:"700px", maxWidth: "800px", margin: "auto", height:"300px", zIndex: 1}}>
        <div style={{display: "flex", gap: "2rem"}}>
        {/* Left panel */}
        <div
          style={{
            flex: "1",
            
            borderRadius: "10px",
            padding: "1.5rem",
            position: "relative",
            color: "white",
            height: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "#0071e3",
              borderRadius: "50%",
              width: "140px",
              height: "130px",
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              fontSize: "210px",
              position: "absolute",
              fontFamily: "'Georgia', serif",
              top: "-100px",
              left: "20px",
              color: "white",
              fontWeight: "bold",
              lineHeight: "1",
            }}
          >
            &#8220;
          </div>
          <h2
            style={{
              marginTop: "90px",
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "1.2",
              fontFamily: "'Georgia', serif",
              width:"80%",
            }}
          >
            What Our Customer Say
          </h2>
          <p style={{ marginTop: "1rem", lineHeight: "1.6", fontSize: "1rem" }}>
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore.
          </p>
          <a
            href="#"
            style={{
              marginTop: "1.5rem",
              display: "inline-flex",
              alignItems: "center",
              color: "white",
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "1rem",
              gap: "0.3rem",
            }}
          >
            Read More
            <span
              style={{
                display: "inline-block",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                border: "2px solid white",
                position: "relative",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "35%",
                  transform: "translate(-40%, -50%) rotate(45deg)",
                  width: "20px",
                  height: "15px",
                }}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </a>
        </div>

        {/* Review cards */}
        <div style={{flex: "2", display: "flex", gap: "1rem"}}>
          {[reviews[current], reviews[(current + 1) % length]].map((review) => (
            <div key={review.id} style={{width:"250px",backgroundColor: "white", color: "black", borderRadius: "20px", padding: "1rem", flex: "1", display: "flex", flexDirection: "column" ,position:"relative",top:"-150px" ,height:"400px"}}>
              <img
                src={review.image}
                alt={review.name}
                style={{width: "110%", height: "150px", objectFit: "cover", borderRadius: "20px 20px 0px  60px",marginLeft:"-16px",marginTop:"-16px"}}
              />
              <h3 style={{marginTop: "1rem", fontWeight: "bold"}}>{review.title}</h3>
              <div className="p-container" style={{height:""}}>
              <p style={{marginTop: "0.5rem", flexGrow: 1,height:"200px", fontSize: "0.9rem", lineHeight: "1.4"}}>
                {review.text}
              </p>
              </div>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <strong>{review.name}</strong>
                <div>
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} style={{color: "#f5a623", fontSize: "1.2rem"}}>&#9733;</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button onClick={prevSlide} style={{position: "absolute", bottom: "50px", left: "420px", backgroundColor: "#0071e3", border: "none", borderRadius: "50%", width: "30px", height: "30px", color: "white", cursor: "pointer"}}>
        &#8249;
      </button>
      <button onClick={nextSlide} style={{position: "absolute", bottom: "50px", right: "675px", backgroundColor: "#0071e3", border: "none", borderRadius: "50%", width: "30px", height: "30px", color: "white", cursor: "pointer"}}>
        &#8250;
      </button>

      {/* Pagination dots */}
      <div style={{position: "absolute", bottom: "60px", right: "60px", display: "flex", gap: "5px"}}>
        {reviews.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: current === index ? "white" : "#0071e3",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </section>
    </div>
  );
};

export default ReviewCarousel;
