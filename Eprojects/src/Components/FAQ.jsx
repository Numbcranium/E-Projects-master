import React, { useState } from "react";
import dogImage from "../assets/puppy2.jpg"; 

const faqData = [
  {
    question: "What is the purpose of this site?",
    answer:
      "This site is dedicated to providing comprehensive information and resources about bridges, including their history, design, and significance.",
  },
  {
    question: "How can I find detailed information about a specific bridge?",
    answer:
      "You can use the search or map features to locate a bridge and view detailed information including images, history, and technical specifications.",
  },
  {
    question: "Can I contribute information or photos to the site?",
    answer:
      "Yes, we welcome contributions! Please use the contact form to submit your information or photos for review and inclusion.",
  },
  {
    question: "Is the information on this site regularly updated?",
    answer:
      "We strive to keep the content accurate and up-to-date by regularly reviewing and adding new information and user contributions.",
  },
  {
    question: "Who can I contact for support or inquiries?",
    answer:
      "You can reach out to our support team via the contact page for any questions or assistance you may need.",
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
        Welcome to our FAQ page! Here you'll find answers to common questions about our site, how to navigate it, and how you can contribute. We aim to provide a rich resource for bridge enthusiasts and anyone interested in learning more about these incredible structures.
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
