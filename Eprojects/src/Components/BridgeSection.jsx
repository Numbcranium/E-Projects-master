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
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [bridges, setBridges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bridgesPerPage = 10;

  useEffect(() => {
    fetch("/data/SamuelBridges.json")
      .then((response) => response.json())
      .then((data) => setBridges(data))
      .catch((error) => console.error("Error loading bridge data:", error));
  }, []);

  const filteredBridges = bridges.filter((bridge) => {
    const mappedCategories = categoryMapping[sectionTitle] || [sectionTitle];

    const matchesCategory =
      !sectionTitle ||
      sectionTitle === "All" ||
      bridge.categories.some((cat) =>
        mappedCategories.some(
          (mappedCat) => cat.toLowerCase() === mappedCat.toLowerCase()
        )
      );

    if (searchTerm.trim() !== "") {
      // Filter by bridge name starting with searchTerm (case-insensitive)
      return (
        bridge.name.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
        matchesCategory
      );
    } else {
      // Filter by continent and category if no search term
      const matchesContinent =
        selectedContinent === "All" || bridge.location.continent === selectedContinent;
      return matchesContinent && matchesCategory;
    }
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
      <h3 style={{color:"wheat"}}>{sectionTitle}</h3>
      <div className="filter" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <label style={{color:"wheat",}} htmlFor="continent-select">Filtered by Continent: </label>
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
        {!showSearchBar && (
          <button
            onClick={() => setShowSearchBar(true)}
            aria-label="Show search bar"
            style={{
              background: "none",
              border: "none",
              color: "wheat",
              cursor: "pointer",
              fontSize: "1.2rem",
              padding: 0,
              
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              viewBox="0 0 24 24"
              width="40"
              fill="wheat"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </button>
        )}
        {showSearchBar && (
          <div
            onMouseLeave={() => setShowSearchBar(false)}
            style={{ display: "inline-block" }}
          >
            <input
              type="text"
              placeholder="Search bridges by name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search change
              }}
              autoFocus
              style={{ padding: "0.25rem 0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
        )}
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
