import React, { useState } from "react";
import dogImage from "../assets/puppy.jpg"; 

const faqData = [
  {
    question: "How will DoggieLawn help me?",
    answer:
      "DoggieLawn is an innovative, natural indoor dog potty that pets and humans alike love. It uses authentic grass with naturally-occurring microbes that break down dog urine, eliminating smells while providing a natural environment for your pup.",
  },
  {
    question: "What sizes do you offer?",
    answer:
      "We offer multiple sizes to fit your home and your dog's needs. Please check our shop page for detailed size options.",
  },
  {
    question: "How do I know which subscription is best for me and my furry friend?",
    answer:
      "Our subscription plans are tailored to your dog's size and usage. Contact our support for personalized recommendations.",
  },
];


const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <section className="faq-top-section">
        <div className="faq-text">
          <h1>Frequently Asked Questions</h1>
          <p>
            At DoggieLawn, we believe that human and pet comfort should never be mutually exclusive. That's why we created the DoggieLawn - an innovative, natural indoor dog potty that pets and humans alike love. This dog potty grass is authentic grass with naturally-occurring microbes that break down dog urine, eliminating smells while providing a natural environment for your pup to do its business. DoggieLawn is easy to use, perfect for pets, and much better for the environment than artificial dog grass pads.
          </p>
        </div>
        <div className="faq-image-container">
          <img src={dogImage} alt="Dog" />
        </div>
      </section>

      <section className="faq-list">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {item.question}
              <span className="faq-icon">{activeIndex === index ? "-" : "+"}</span>
            </button>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default FAQ;
