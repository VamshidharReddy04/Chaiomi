// Hero.jsx shows the homepage hero section with a video background, title, description, and primary actions for visitors to find a Chaiomi kiosk or explore OMI technology.
// It also includes links to download the Chaiomi app for iOS and Android.
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { appStoreLinks as appLinks } from "../data/siteLinks";
import "../Styles/Hero.css"; // Import the Hero.css file for styling

const EASE = [0.22, 1, 0.36, 1];

// Reveals one after another
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 2, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.2, ease: EASE },
  },
};

// Homepage hero introducing OMI and the primary visitor actions.
function Hero() {
  const reducedMotion = useReducedMotion();
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  // Mouse position inside the hero section, used for subtle parallax effects.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Each layer moves a different amount based on the mouse position, creating a parallax effect.
  const videoX = useTransform(springX, [-0.5, 0.5], [12, -12]);
  const videoY = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const glowX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const glowY = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const chipX = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const chipY = useTransform(springY, [-0.5, 0.5], [14, -14]);

  const handleMove = (event) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;

    if (!hero || !video) return undefined;

    const syncPlayback = () => {
      const { top, bottom } = hero.getBoundingClientRect();
      const heroIsAtTopOfViewport = top >= 0 && bottom > 0;

      if (heroIsAtTopOfViewport && video.paused) {
        video.play().catch((error) => {
          console.warn("Hero video could not start playback.", error);
        });
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(syncPlayback, { threshold: 0 });

    observer.observe(hero);
    window.addEventListener("scroll", syncPlayback, { passive: true });
    video.addEventListener("loadeddata", syncPlayback);
    syncPlayback();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncPlayback);
      video.removeEventListener("loadeddata", syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {/* OMI video background */}
      <motion.div
        className="hero-video-wrap"
        variants={item}
        style={reducedMotion ? undefined : { x: videoX, y: videoY }}
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          className="hero-video"
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/journey/Step-4 OMI Brews.webp"
          aria-label="OMI robotic brewing system demonstration"
        >
          <source src="/videos/omi-demo.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* layered lighting readable gradient, faint wrap, warm glow */}
      <div className="hero-video-overlay" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <motion.div
        className="hero-glow"
        variants={item}
        style={reducedMotion ? undefined : { x: glowX, y: glowY }}
        aria-hidden="true"
      />
      {/* Cool cyan light + thin ring, the "technology" lighting */}
      <motion.div
        className="hero-glow-cyan"
        variants={item}
        style={reducedMotion ? undefined : { x: chipX, y: chipY }}
        aria-hidden="true"
      >
        <span className="hero-ring" />
      </motion.div>

      {/* Floating glass chips only in desktop view */}
      {/* <motion.div
        className="hero-chips"
        style={reducedMotion ? undefined : { x: chipX, y: chipY }}
        aria-hidden="true"
      >
        <div className="hero-chip hero-chip-one">
          <span className="hero-chip-icon hero-chip-icon-ok">
            <Check size={18} strokeWidth={2} aria-hidden="true" />
          </span>
          Recipe Saved
        </div>
        <div className="hero-chip hero-chip-two">
          <span className="hero-chip-icon">
            <Thermometer size={18} strokeWidth={2} aria-hidden="true" />
          </span>
          Brewing • 92°C
        </div>
      </motion.div> */}
      {/* Hero content */}
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={container}
          initial={reducedMotion ? false : "hidden"}
          animate="show"
        >
          {/* Main hero title */}
          <motion.h1 variants={item} className="hero-title">
            The Future of Chai is Personal.
          </motion.h1>

          {/* Hero description */}
          <motion.p variants={item} className="hero-description">
            Meet Chaiomi — where intelligent technology meets the timeless love
            of chai.
          </motion.p>

          {/* Hero actions */}
          <motion.div variants={item} className="hero-action">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Trendz+Orbit+Hitech+City+Hyderabad"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              <MapPin size={18} aria-hidden="true" />
              Find a Chaiomi
            </a>
            <Link to="/technology" className="btn btn-glass ">
              Explore OMI
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </motion.div>

          {/* App download links */}
          <motion.div variants={item} className="hero-app-text">
            <p>Download the Chaiomi app for iOS or Android:</p>
          </motion.div>
          <motion.div variants={item} className="hero-action">
            <a
              href={appLinks.ios}
              target="_blank"
              rel="noreferrer"
              className="btn btn-glass btn-sm"
            >
              iOS App
            </a>

            <a
              href={appLinks.android}
              target="_blank"
              rel="noreferrer"
              className="btn btn-glass btn-sm"
            >
              Android App
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
