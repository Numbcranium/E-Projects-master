import React, { useState } from "react";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    message: "",
    rating: "5",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // You can store this in a backend or state for display
  };

  const styles = {
    wrapper: {
      minHeight: "60vh",
      minWidth: "60vw",
      background: "linear-gradient(to bottom right, #0a3d62, #1e3799)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "30px",
      fontFamily: "Segoe UI, sans-serif",
    },
    container: {
      backgroundColor: "#fff",
      borderRadius: "16px",
      padding: "30px 40px",
      maxWidth: "100%",
      width: "100%",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
      display: "flex",
      flexDirection: "row",
      gap: "20px",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    group: {
      flex: "1 1 45%",
      marginBottom: "20px",
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontWeight: "600",
      color: "#123456",
      marginBottom: "6px",
    },
    input: {
      padding: "10px 12px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "15px",
    },
    textarea: {
      padding: "10px 12px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "15px",
      resize: "vertical",
      minHeight: "100px",
    },
    select: {
      padding: "10px 12px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "15px",
    },
    buttonContainer: {
      flex: "1 1 100%",
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
    },
    button: {
      backgroundColor: "#012c6d",
      color: "#fff",
      padding: "12px 40px",
      fontSize: "16px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={{ color: "#012c6d", fontSize: "24px", fontWeight: "bold", width: "100%", textAlign: "center", marginBottom: "25px" }}>
          Leave a Testimonial
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "contents" }}>
          {/* Full Name */}
          <div style={styles.group}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. Ray Robertson"
              style={styles.input}
              onChange={handleChange}
              required
            />
          </div>

          {/* Review Title */}
          <div style={styles.group}>
            <label style={styles.label}>Review Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. ABC treks with Global Treks Guide"
              style={styles.input}
              onChange={handleChange}
              required
            />
          </div>

          {/* Message */}
          <div style={styles.group}>
            <label style={styles.label}>Message</label>
            <textarea
              name="message"
              placeholder="Write your experience..."
              style={styles.textarea}
              onChange={handleChange}
              required
            />
          </div>

          {/* Upload Photo */}
          <div style={styles.group}>
            <label style={styles.label}>Upload Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              style={styles.input}
              onChange={handleChange}
              required
            />
          </div>

          {/* Rating */}
          <div style={styles.group}>
            <label style={styles.label}>Rating</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="5">★★★★★</option>
              <option value="4">★★★★☆</option>
              <option value="3">★★★☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="1">★☆☆☆☆</option>
            </select>
          </div>

          {/* Submit Button */}
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
