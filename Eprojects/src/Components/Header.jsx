import React from "react";

const Header = ({ visitorCount, toggleSidebar }) => {
  return (
    <header className="header">
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
        &#9776;
      </button>
      <div className="logo-visitor">
        <img
          src="/vite.svg"
          alt="Logo"
          className="logo"
          style={{ height: "40px" }}
        />
        <div className="visitor-count">Visitors: {visitorCount}</div>
      </div>
    </header>
  );
};

export default Header;
