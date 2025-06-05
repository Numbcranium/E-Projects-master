import React, { useState, useEffect } from "react";
import "../App.css";

const reviews = [
  {
    id: 1,
    name: "Person one",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cupiditate recusandae quam amet enim voluptates alias accusantium sapiente!",
  },
  {
    id: 2,
    name: "Person two",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cupiditate recusandae quam amet enim voluptates alias accusantium sapiente! Adipisci vero fugiat aliquid explicabo quas eius!",
  },
  {
    id: 3,
    name: "Person three",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cupiditate recusandae quam amet enim voluptates alias accusantium sapiente! Adipisci vero fugiat aliquid explicabo quas eius!",
  },
];

const ReviewCarousel = () => {
  const [current, setCurrent] = useState(0);
  const length = reviews.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 4000); // Change slide every 4 seconds
    return () => clearTimeout(timer);
  }, [current, length]);

  return (
    <section className="review-carousel">
      <div className="carousel-wrapper">
        {reviews.map((review, index) => {
          let position = "nextSlide";
          if (index === current) {
            position = "activeSlide";
          } else if (
            index === current - 1 ||
            (current === 0 && index === length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <article className={`slide ${position}`} key={review.id}>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="review-image"
                  />
                  <h3 className="review-name">{review.name}</h3>
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ReviewCarousel;
