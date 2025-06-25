  import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const transportTimesPerKm = {
  plane: 10 / 60, // 10 seconds per km converted to minutes
  train: 30 / 60, // 30 seconds per km converted to minutes
};

const BridgeDetail = () => {
  const { id } = useParams();
  const [bridge, setBridge] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [transportOptions, setTransportOptions] = useState([]);
  const [distanceKm, setDistanceKm] = useState(null);

  useEffect(() => {
    // Fetch bridge data by id
    fetch("/src/data/SamuelBridges.json")
      .then((res) => res.json())
      .then((data) => {
        const foundBridge = data.find((b) => b.id.toString() === id);
        setBridge(foundBridge);
      })
      .catch((err) => console.error("Error loading bridge data:", err));
  }, [id]);

  useEffect(() => {
    // Get user location via browser geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          setUserLocation(null);
        }
      );
    } else {
      setUserLocation(null);
    }
  }, []);

  // Helper: Calculate distance between two lat/lon points in km (Haversine formula)
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  useEffect(() => {
    if (bridge && userLocation) {
      const bridgeContinent = bridge.location.continent;
      const userContinent = "Unknown"; // For simplicity, assume unknown or same continent
      // In real app, you might map userLocation to continent via reverse geocoding or IP

      // Calculate distance
      const distanceKm = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        bridge.location.coordinates.latitude,
        bridge.location.coordinates.longitude
      );

      let options = [];

      if (distanceKm >= 10000) {
        // Distance 10000km or more: only plane
        options = [
          {
            mode: "Plane",
            time: Math.round(distanceKm * transportTimesPerKm.plane),
          },
        ];
      } else {
        // Distance less than 10000km: show all transport modes
        options = [
          {
            mode: "Plane",
            time: Math.round(distanceKm * transportTimesPerKm.plane),
          },
          {
            mode: "Train",
            time: Math.round(distanceKm * transportTimesPerKm.train),
          },
        ];
      }
      setTransportOptions(options);
      setDistanceKm(distanceKm);
    }
  }, [bridge, userLocation]);

  if (!bridge) {
    return <div>Loading bridge details...</div>;
  }

  return (
    <>
      {/* <button
        onClick={() => {
          navigate(-1);
        }}
        style={{
          margin: "1rem",
          padding: "0.5rem 1rem",
          position:"relative",top:"100px",left:"530px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        &larr; Back to Bridges
      </button> */}
      <div
        className="bridge-detail"
        style={{
          display: "flex",
          minHeight: "100vh",
          padding: "2rem",
          color: "black",
          gap: "2rem",
        
        }}
      >
        <div
          className="bridge-image"
          style={{
            width: "45vw",
            marginTop:'5rem',
            height: "55vh",
            borderRadius: "10px 10px 10px 20px",
            backgroundImage: `url(${bridge.images[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="bridge-info"
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "1rem",
            color:"wheat"
          }}
        >
          <h1>{bridge.name}</h1>
          <p>{bridge.description}</p>
        </div>
      </div>
      <div
        className="transport-options"
        style={{
          marginTop: "-100px",
          padding: "1rem",
          backgroundColor: "whitesmoke",
          borderRadius: "10px",
          color: "black",
          width:"90vw",
          height:"fit-content",
        }}
      >
        <h2>Transport Options</h2>
        {userLocation ? (
          <ul>
            {transportOptions.map((option) => {
              const hours = Math.floor(option.time / 60);
              const minutes = option.time % 60;
              return (
                <li key={option.mode}>
                {option.mode}: Distance: {distanceKm ? `${distanceKm.toFixed(2)} km` : "N/A"} - Duration:{" "}
                {hours > 0 ? `${hours}h ` : ""}
                {minutes}m
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Unable to determine your location to show transport options.</p>
        )}
      </div>
      <div className="bridgemap">


      </div>
      <div
        className="bridge-attributes"
        style={{
          marginTop: "50px",
          padding: "0rem",
          borderRadius: "10px",
          overflow: "hidden",
          fontFamily: "'Arial Black', Arial, sans-serif",
          color: "black",
          width: "50vw",
          maxWidth: "35vw",
          marginLeft:"58%",
          zIndex:"100",
          backgroundColor: "whitesmoke",
        }}
      >
        <div style={{ justifyContent: "space-between", alignItems: "center" , width:"100%",height:"50px", backgroundColor: "red",fontSize:"25px", fontFamily:"sans-serif", padding:"10px 100px 0 "}}>STATS AND FACTS</div>
        <div style={{ backgroundColor: "#f4a261", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Height</div>
            <div style={{ fontSize: "1rem" }}>{bridge.attributes.height_meters} meters</div>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>01</div>
        </div>
        <div style={{ backgroundColor: "#e9c46a", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Year Created</div>
            <div style={{ fontSize: "1rem" }}>{bridge.attributes.opened_year}</div>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>02</div>
        </div>
        <div style={{ backgroundColor: "#264653", color: "white", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Length</div>
            <div style={{ fontSize: "1rem" }}>{bridge.attributes.length_meters} meters</div>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>03</div>
        </div>
      </div>
      {/* <div style={{height:"500px", width:"100%", backgroundColor:"black", zIndex:"10",marginBottom:"-500px"}}></div> */}
    </>
  );
};

export default BridgeDetail;
