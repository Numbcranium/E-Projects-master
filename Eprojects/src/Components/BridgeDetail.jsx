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
    fetch("/src/data/bridges.json")
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
          }}
        >
          <h1>{bridge.name}</h1>
          <p>{bridge.description}</p>
        </div>
      </div>
      <div
        className="transport-options"
        style={{
          marginTop: "-200px",
          padding: "1rem",
          backgroundColor: "#f0f0f0",
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
    </>
  );
};

export default BridgeDetail;
