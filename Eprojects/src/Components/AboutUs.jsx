// import React from "react";
// import mypic from '../../../Eprojects/src/assets/my pic.jpg'; 
// import sampic from '../../../Eprojects/src/assets/samuel pic.jpg'

// const AboutUs = () => {
//   return (
//     <div style={{ padding: "2rem",  justifyContent: "space-between",  }}>
//       <h2 style={{ margin: 0, alignSelf: "flex-start",marginTop:"50px",marginBottom:"100px", color:"wheat" }}>About us</h2>
//       <div style={{ display: "flex", gap: "1rem",marginLeft:"350px",marginBottom:"80px" }}>
        
//         <div style={{ height: "250px", width: "200px", backgroundColor: "#aaa",borderRadius:"20px" ,backgroundImage: `url(${sampic})`, backgroundSize: "cover", backgroundPosition: "50%", }}></div>
//        <div style={{ height: "250px", width: "200px", backgroundColor: "#888",borderRadius:"20px" }}></div>
//        <div style={{ height: "250px", width: "200px", backgroundColor: "#ccc",borderRadius:"20px" ,backgroundImage: `url(${mypic})`, backgroundSize: "cover", backgroundPosition: "50%",  }}>
        
//         </div>
//       </div>
//       <div style={{ maxWidth: "700px", marginLeft: "0px" }}>
//         <p style={{fontSize: "1.2rem", lineHeight: "1.6",fontWeight: "bold",fontFamily:"revert" , color: "burlywood"}}>
//           Welcome to our website dedicated to the world's most incredible bridges! We are a team of passionate
//           individuals who believe that bridges are not just structures, but symbols of human ingenuity and connection.
//           <br  />
//           Our mission is to showcase the beauty, history, and engineering marvels of bridges from around the globe.
//         </p>
//         <p style={{fontSize: "1.2rem", lineHeight: "1.6"}}>
//           Whether you're an architecture enthusiast, a history buff, or simply curious about these magnificent structures,
//           we invite you to explore our collection of articles, images, and stories that celebrate the art and science of bridge building.
//         </p>
//     </div>
//     <div style={{fontWeight:"bolder",marginTop:"200px"}}>Company-Phone:<i style={{color:"wheat"}}>+2347026852298</i></div>
//     <div className="contact-info" style={{fontSize:"15px",marginTop:"20px",marginLeft:"70%",fontWeight:"bolder",}}>
//       <div>Address:No11 Monarch Enterprise Street</div>
//       <br />
//       <div>Email:<a href="#"style={{textDecoration:"underlined"}}>IncredileBridges CSM@gmail.com</a></div>
//     </div>
//     </div>
    
//   );
// };

// export default AboutUs;
import React from "react";
import mypic from '../../../Eprojects/src/assets/my pic.jpg'; 
import sampic from '../../../Eprojects/src/assets/samuel pic.jpg'

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
