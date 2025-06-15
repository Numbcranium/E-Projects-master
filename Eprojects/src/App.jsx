import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Header from "./Components/Header";
import Menu from "./Components/Menu";
import visitorCount from "./Components/VisitorCount";
import BridgeSection from "./Components/BridgeSection";
import Gallery from "./Components/Gallery";
import Sitemap from "./Components/Sitemap";
import Footer from "./Components/Footer";
import ReviewCarousel from "./Components/ReviewCarousel";
import BridgeDetail from "./Components/BridgeDetail";
import FAQ from "./Components/FAQ";
import FeedbackForm from "./Components/FeedbackForm";
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
  { key: "faq", label: "FAQ" }
];

function App() {
  const [selectedMenu, setSelectedMenu] = React.useState("home");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // Sync selectedMenu with current path
    const path = location.pathname.slice(1); // remove leading '/'
    if (path === "") {
      setSelectedMenu("home");
    } else if (menuItems.some((item) => item.key === path)) {
      setSelectedMenu(path);
    } else if (path.startsWith("bridge/")) {
      // Do not change selectedMenu on bridge detail page
    } else {
      setSelectedMenu("home");
    }
  }, [location]);

  const handleSelectMenu = (key) => {
    setSelectedMenu(key);
    setSidebarOpen(false);
    navigate(key === "home" ? "/" : `/${key}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Header visitorCount={visitorCount} toggleSidebar={toggleSidebar} />
      <Menu
        menuItems={menuItems}
        selectedMenu={selectedMenu}
        onSelectMenu={handleSelectMenu}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <main className="main-content fullpage">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/bridge/:id" element={<BridgeDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route
            path="/:category"
            element={<BridgeSection sectionTitle={menuItems.find((item) => item.key === selectedMenu)?.label} />}
          />
          <Route
            path="*"
            element={
              <>
                <h2>{menuItems.find((item) => item.key === selectedMenu)?.label}</h2>
                <p>Content for {selectedMenu} will be displayed here.</p>
              </>
            }
          />
        </Routes>
      </main>
      {selectedMenu === "home" && <ReviewCarousel />}
      <Footer />
    </>
  );
}

export default App;
