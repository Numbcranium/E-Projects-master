import React, { useState, useEffect } from "react";

const continents = ["All", "Asia", "Europe", "North America", "South America", "Africa", "Australia"];

const categoryMapping = {
  "Historical Great Bridges": ["Historical Great Bridges"],
  "High-Level Achievements": ["High-Level Achievements"],
  "Iconic Bridges": ["Iconic", "Iconic Bridges"],
  "Modern Great Bridges": ["Modern Great Bridges"],
  "Longest": ["Longest"],
  "Tallest": ["Tallest"],
  "Highest": ["Highest"],
  "Oldest": ["Oldest"],
};

const BridgeSection = ({ sectionTitle }) => {
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [bridges, setBridges] = useState([]);

  useEffect(() => {
    fetch("/src/data/bridges.json")
      .then((response) => response.json())
      .then((data) => setBridges(data))
      .catch((error) => console.error("Error loading bridge data:", error));
  }, []);

  const filteredBridges = bridges.filter((bridge) => {
    const matchesContinent =
      selectedContinent === "All" || bridge.location.continent === selectedContinent;

    const mappedCategories = categoryMapping[sectionTitle] || [sectionTitle];

    const matchesCategory =
      !sectionTitle ||
      sectionTitle === "All" ||
      bridge.categories.some((cat) =>
        mappedCategories.some(
          (mappedCat) => cat.toLowerCase() === mappedCat.toLowerCase()
        )
      );

    return matchesContinent && matchesCategory;
  });

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
          <div key={bridge.id} className="bridge-card"   style={{ backgroundImage: `url(${bridge.images[0]})`, backgroundPosition: "center", backgroundSize: "cover"}}>
            <h4>{bridge.name}</h4>
            <p>{bridge.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BridgeSection;
