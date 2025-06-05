import React from "react";
import Homepage from "./Components/Homepage";
import Header from "./Components/Header";
import Menu from "./Components/Menu";
import visitorCount from "./Components/VisitorCount";
import BridgeSection from "./Components/BridgeSection";
import Gallery from "./Components/Gallery";
import Sitemap from "./Components/Sitemap";
import Footer from "./Components/Footer";
import ReviewCarousel from "./Components/ReviewCarousel";
import "./App.css";

// Menu items for sidebar navigation
const menuItems = [
  { key: "home", label: "Home" },
  { key: "historical", label: "Historical Great Bridges" },
  { key: "highlevel", label: "High-Level Achievements" },
  { key: "iconic", label: "Iconic Bridges" },
  { key: "modern", label: "Modern Great Bridges" },
  { key: "longest", label: "Longest" },
  { key: "tallest", label: "Tallest" },
  { key: "highest", label: "Highest" },
  { key: "oldest", label: "Oldest" },
  { key: "sitemap", label: "Site Map" },
  { key: "gallery", label: "Gallery" },
  { key: "feedback", label: "Feedback" },
  { key: "aboutus", label: "About Us" },
  { key: "faq", label: "FAQ" },
  { key: "contactus", label: "Contact Us" }
];

function App() {
  // State to track the currently selected menu item
  const [selectedMenu, setSelectedMenu] = React.useState("home");
  // State to track visitor count (simulated)

  // State to control sidebar open/close
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Handler for menu item selection
  const handleSelectMenu = (key) => {
    setSelectedMenu(key);
    setSidebarOpen(false); // close sidebar on menu select
  };

  // Toggle sidebar open/close state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Header with logo and visitor count */}
      <Header visitorCount={visitorCount} toggleSidebar={toggleSidebar} />
      {/* Sidebar menu */}
      <Menu
        menuItems={menuItems}
        selectedMenu={selectedMenu}
        onSelectMenu={handleSelectMenu}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      {/* Main content area */}
      <main className="main-content fullpage">
        {selectedMenu === "home" ? (
          <>
            <Homepage />
            <section className="review-section" style={{ marginTop: "2rem" }}>
              <ReviewCarousel />
            </section>
          </>
        ) : [
          "historical",
          "highlevel",
          "iconic",
          "modern",
          "longest",
          "tallest",
          "highest",
          "oldest",
        ].includes(selectedMenu) ? (
          <BridgeSection sectionTitle={menuItems.find((item) => item.key === selectedMenu)?.label} />
        ) : selectedMenu === "gallery" ? (
          <Gallery />
        ) : selectedMenu === "feedback" ? (
          <FeedbackComponent />
        ) : selectedMenu === "aboutus" ? (
          <AboutUs />
        ) : selectedMenu === "contactus" ? (
          <ContactUs />
        ) : selectedMenu === "sitemap" ? (
          <Sitemap />
        ) : selectedMenu === "faq" ? (
          <FAQ />
        ) : (
          <>
            <h2>{menuItems.find((item) => item.key === selectedMenu)?.label}</h2>
            <p>Content for {selectedMenu} will be displayed here.</p>
          </>
        )}
      </main>
      {/* Footer with scrolling ticker */}
      <Footer />
    </>
  );
}

export default App;
