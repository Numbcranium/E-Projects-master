

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <h2 className="aboutus-title">About us</h2>
      <div className="aboutus-images">
        <div className="aboutus-image sampic"></div>
        <div className="aboutus-image placeholder"></div>
        <div className="aboutus-image mypic"></div>
      </div>
      <div className="aboutus-text-container">
        <p className="aboutus-text-bold">
          Welcome to our website dedicated to the world's most incredible bridges! We are a team of passionate
          individuals who believe that bridges are not just structures, but symbols of human ingenuity and connection.
          <br  />
          Our mission is to showcase the beauty, history, and engineering marvels of bridges from around the globe.
        </p>
        <p className="aboutus-text">
          Whether you're an architecture enthusiast, a history buff, or simply curious about these magnificent structures,
          we invite you to explore our collection of articles, images, and stories that celebrate the art and science of bridge building.
        </p>
      </div>
      <div className="aboutus-contact-phone">Company-Phone:<i>+2347026852298</i></div>
      <div className="aboutus-contact-info">
        <div>Address: No11 Monarch Enterprise Street</div>
        <br />
        <div>Email: <a href="#" className="aboutus-email">IncredileBridges CSM@gmail.com</a></div>
      </div>
    </div>
  );
};

export default AboutUs;
