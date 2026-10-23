import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import "../StylePages/notFound.css";

// Fallback page for routes that do not exist.
function NotFound() {
  return (
    <>
      <Navbar />
      <section className="nf-section">
        <div className="nf-container">
          <h1 className="nf-heading">404</h1>
          <p className="nf-subtitle">404 - Page Not Found</p>
          <Link to="/" className="nf-link">
            Go back to the homepage
          </Link>
        </div>
      </section>
    </>
  );
}
export default NotFound;
