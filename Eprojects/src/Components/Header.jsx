import React from "react";
import { useLocation } from 'react-router-dom'
import VisitorCount from "./VisitorCount";

function Header ({ toggleSidebar })  {

  const location = useLocation();
  const isHome = location.pathname === "/home";
  return (
    <header className={`header ${isHome ? "transparent" : ""}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
        &#9776;
      </button>
      <div className="logo-visitor">
        <img
          src=""
          alt=""
          className="logo"
          style={{ height: "50px", width: "50px", borderRadius: "50%"}}
        />
        <div className="visitor-count">Visitors:< VisitorCount/> </div>
      </div>
    </header>
  );
};

export default Header;
