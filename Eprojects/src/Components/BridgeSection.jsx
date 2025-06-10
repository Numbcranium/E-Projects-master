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
  const [currentPage, setCurrentPage] = useState(1);
  const bridgesPerPage = 10;

  useEffect(() => {
    fetch("/src/data/SamuelBridges.json")
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

  // Deduplicate filteredBridges by id
  const uniqueBridgesMap = new Map();
  filteredBridges.forEach((bridge) => {
    if (!uniqueBridgesMap.has(bridge.id)) {
      uniqueBridgesMap.set(bridge.id, bridge);
    }
  });
  const uniqueFilteredBridges = Array.from(uniqueBridgesMap.values());

  const totalPages = Math.ceil(uniqueFilteredBridges.length / bridgesPerPage);
  const indexOfLastBridge = currentPage * bridgesPerPage;
  const indexOfFirstBridge = indexOfLastBridge - bridgesPerPage;
  const currentBridges = uniqueFilteredBridges.slice(indexOfFirstBridge, indexOfLastBridge);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="bridge-section">
      <h3>{sectionTitle}</h3>
      <div className="filter">
        <label htmlFor="continent-select">Filter by Continent: </label>
        <select
          id="continent-select"
          value={selectedContinent}
          onChange={(e) => {
            setSelectedContinent(e.target.value);
            setCurrentPage(1); // Reset to first page on filter change
          }}
        >
          {continents.map((cont) => (
            <option key={cont} value={cont}>
              {cont}
            </option>
          ))}
        </select>
      </div>
      <div className="bridge-list">
        {currentBridges.map((bridge) => (
          <div
            key={bridge.id}
            className="bridge-card"
            style={{
              backgroundImage: `url(${bridge.images[0]})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              cursor: "pointer",
            }}
            onClick={() => {
              window.location.href = `/bridge/${bridge.id}`;
            }}
          >
            <h4>{bridge.name}</h4>
            <p>{bridge.description}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          {"<"}
        </button>
        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              onClick={() => paginate(pageNum)}
              className={currentPage === pageNum ? "active" : ""}
              aria-label={`Page ${pageNum}`}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          {">"}
        </button>
      </div>
    </section>
  );
};

export default BridgeSection;
