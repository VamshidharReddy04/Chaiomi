import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import {
  navLinks as navigationLinks,
  appStoreLinks as appLinks,
  socialLinks,
} from "../data/siteLinks";
import "../Styles/footer.css";

const socialIconPaths = {
  facebook:
    "M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v8h4v-8h3.2l.8-4H13V9c0-.7.3-1 1-1Z",
  instagram:
    "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 12 16.5 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 12 14.5 2.5 2.5 0 0 0 12 9.5ZM17.5 6A1.5 1.5 0 1 1 16 7.5 1.5 1.5 0 0 1 17.5 6Z",
  linkedin:
    "M5 3.5A2.5 2.5 0 1 1 5 8.5 2.5 2.5 0 0 1 5 3.5ZM3 10h4v11H3V10Zm6 0h3.8v1.5h.1A4.2 4.2 0 0 1 16.7 10c3.8 0 4.3 2.5 4.3 5.7V21h-4v-4.7c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V21H9V10Z",
  youtube:
    "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z",
};

function SocialIcon({ name }) {
  if (name === "x") {
    return (
      <svg
        aria-hidden="true"
        className="footer-social-icon footer-social-icon-x"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.964 6.817H1.683l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    );
  }

  const path = socialIconPaths[name];
  return path ? (
    <svg
      aria-hidden="true"
      className="footer-social-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d={path} />
    </svg>
  ) : null;
}

// Shared site footer with navigation, social, and app-download links.
function Footer() {
  return (
    // Footer section with a navy background and white text
    <footer className="footer">
      {/* Background decoration */}
      <div className="footer-background" aria-hidden="true" />
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            {/* Logo click to home page */}
            <Link to="/" className="footer-logo-link">
              <img
                src="/images/chaiomi-logo.webp"
                alt="Chaiomi home"
                className="footer-logo"
                width="768"
                height="384"
                loading="lazy"
                decoding="async"
              />
            </Link>

            <p className="footer-description">
              OMI - the perfect personalized beverage experience, powered by
              intelligent technology.
            </p>

            {/* Social Links */}
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Chaiomi on ${social.label}`}
                  className="footer-social-link"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-navigation">
            <h2 className="footer-heading">Explore</h2>

            <ul className="footer-nav-list" aria-label="Footer navigation">
              {navigationLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer-nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App Download Links */}
          <div className="footer-app">
            <h2 className="footer-heading">Stay connected</h2>

            <p className="footer-app-description">
              Download the Chaiomi app and enjoy your favorite beverages
              wherever you go.
            </p>

            <div className="footer-app-links">
              <a
                href={appLinks.ios}
                target="_blank"
                rel="noreferrer"
                className="footer-app-link"
              >
                iOS App
              </a>

              {/* Android App */}
              <a
                href={appLinks.android}
                target="_blank"
                rel="noreferrer"
                className="footer-app-link"
              >
                Android App
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>
            &copy; {new Date().getFullYear()} Chaiomi. Ayaanz Food Labs Pvt Ltd
          </p>

          <div className="footer-copyright-links">
            <Link to="/contact" className="footer-button-copyright">
              Contact
            </Link>
            <Link to="/privacy" className="footer-button-copyright">
              Privacy Policy
            </Link>
            <Link to="/terms" className="footer-button-copyright">
              Terms & Conditions
            </Link>
            <Link to="/cookies" className="footer-button-copyright">
              Cookies
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="footer-button"
            >
              Back to top
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
        {/* Privacy and Terms pages don't exist yet — add real routes here once that content is ready */}
      </div>
    </footer>
  );
}

export default Footer;
