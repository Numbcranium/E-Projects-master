import React, { useState, useEffect } from "react";

const continents = ["All", "Asia", "Europe", "North America", "South America", "Africa", "Australia"];

const BridgeSection = ({ sectionTitle }) => {
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [bridges, setBridges] = useState([]);

  useEffect(() => {
    fetch("/src/data/bridges.json")
      .then((response) => response.json())
      .then((data) => setBridges(data))
      .catch((error) => console.error("Error loading bridge data:", error));
  }, []);

  const filteredBridges =
    selectedContinent === "All"
      ? bridges
      : bridges.filter((bridge) => bridge.location.continent === selectedContinent);

  return (
    <section className="bridge-section">
      <h3>{sectionTitle}</h3>
      <div className="filter">
        <label htmlFor="continent-select">Filter by Continent: </label>
        <select
          id="continent-select"
          value={selectedContinent}
          onChange={(e) => setSelectedContinent(e.target.value)}
        >
          {continents.map((cont) => (
            <option key={cont} value={cont}>
              {cont}
            </option>
          ))}
        </select>
      </div>
      <div className="bridge-list">
        {filteredBridges.map((bridge) => (
          <div key={bridge.id} className="bridge-card">
            <img src={bridge.images[0]} alt={bridge.name} className="bridge-image" />
            <h4>{bridge.name}</h4>
            <p>{bridge.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BridgeSection;
