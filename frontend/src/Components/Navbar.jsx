import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks as links } from "../data/siteLinks"; // Import navigation links data
import "../Styles/navbar.css"; // Import the Navbar.css file for styling

function Navbar({ overlay = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const scrollFrame = useRef(null);
  const location = useLocation();

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
  const activeTo = links.find((link) => isActive(link.to))?.to;
  const pillTo = hovered ?? activeTo;

  useEffect(() => {
    const updateScrollState = () => {
      scrollFrame.current = null;
      setScrolled((wasScrolled) => {
        const isScrolled = window.scrollY > 40;
        return wasScrolled === isScrolled ? wasScrolled : isScrolled;
      });
    };
    const onScroll = () => {
      if (scrollFrame.current === null) {
        scrollFrame.current = window.requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
      }
    };
  }, []);

  const soild = !overlay || scrolled || isMenuOpen;

  const navClass = [
    "navbar",
    overlay ? "navbar-overlay" : "",
    soild ? "navbar-solid" : "",
    overlay && scrolled ? "is-scrolled" : "",
  ].join(" ");

  return (
    <nav className={navClass}>
      <div className="navbar-container">
        {/* Navbar Logo */}
        <Link to="/" className="navbar-logo">
          <img
            src="/images/chaiomi-logo.webp"
            alt="Chaiomi home"
            className="logo-image"
            width="768"
            height="384"
            decoding="async"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-links" onMouseLeave={() => setHovered(null)}>
          {links.map((link) => (
            <li
              key={link.to}
              onMouseEnter={() => setHovered(link.to)}
              onFocus={() => setHovered(link.to)}
              onBlur={() => setHovered(null)}
            >
              <Link
                to={link.to}
                aria-current={isActive(link.to) ? "page" : undefined}
                className={`navbar-link ${
                  isActive(link.to) ? "navbar-link-active" : ""
                }`}
              >
                {/* Pill that slides between links */}
                {pillTo === link.to && (
                  <motion.span
                    layoutId="nav-pill"
                    className="navbar-link-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="navbar-link-text">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        {/* Mobile Navigation Toggle Button */}
        <button
          type="button"
          className="navbar-menu-button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
            key={isMenuOpen ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="navbar-menu-icon"
          >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Navigation: slides down, links appear one after another */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            className="mobile-navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
        <ul className="mobile-navigation-list">
          {links.map((link, index) => (
            <motion.li
              key={link.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.05 + index * 0.1 }}
            >
              <Link
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                aria-current={isActive(link.to) ? "page" : undefined}
                className={` mobile-navigation-link ${
                  isActive(link.to) ? "mobile-navigation-link-active" : ""
                }`}
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
