// App.jsx
// Handles all website routes

import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import "./StylePages/site.css";

const Home = lazy(() => import("./Pages/Home"));
const Technology = lazy(() => import("./Pages/Technology"));
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contacts"));
const Careers = lazy(() => import("./Pages/Careers"));
const Franchise = lazy(() => import("./Pages/Franchise"));
const Locations = lazy(() => import("./Pages/Locations"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Privacy = lazy(() => import("./Pages/Privacy"));
const Terms = lazy(() => import("./Pages/Terms"));

const HowItWorks = lazy(() => import("./Pages/HowItWorks"));

// ScrollToTop Component
// Scrolls to the top whenever the route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll to top
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
  }, [pathname]);

  return null;
}

// Main App Component

function App() {
  return (
    <>
      {/* Scroll to top on every page */}
      <ScrollToTop />

      {/* Website Routes */}
      <Suspense fallback={null}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route
            path="/how-it-works"
            element={
              <div className="site-page">
                <HowItWorks />
              </div>
            }
          />
          <Route
            path="/technology"
            element={
              <div className="site-page">
                <Technology />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="site-page">
                <About />
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="site-page">
                <Contact />
              </div>
            }
          />
          <Route
            path="/location"
            element={
              <div className="site-page">
                <Locations />
              </div>
            }
          />
          <Route
            path="/locations"
            element={
              <div className="site-page">
                <Locations />
              </div>
            }
          />
          <Route
            path="/careers"
            element={
              <div className="site-page">
                <Careers />
              </div>
            }
          />
          <Route
            path="/franchise"
            element={
              <div className="site-page">
                <Franchise />
              </div>
            }
          />
          <Route
            path="/privacy"
            element={
              <div className="site-page">
                <Privacy />
              </div>
            }
          />
          <Route
            path="/terms"
            element={
              <div className="site-page">
                <Terms />
              </div>
            }
          />
          <Route
            path="/cookies"
            element={
              <div className="site-page">
                <Navigate to="/privacy#cookies" replace />
              </div>
            }
          />
          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="site-page">
                <NotFound />
              </div>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
