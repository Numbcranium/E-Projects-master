import React from "react";

const Menu = ({ menuItems, selectedMenu, onSelectMenu, sidebarOpen, toggleSidebar }) => {
  return (
    <nav className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar} aria-label="Close menu">
        &times;
      </button>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.key}
            className={selectedMenu === item.key ? "active" : ""}
            onClick={() => onSelectMenu(item.key)}
            onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
