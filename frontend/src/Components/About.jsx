// Import Link for navigation to the careers page
import { Link } from "react-router-dom";
import "../Styles/about.css"; // Import the About.css file for styling

function About() {
  return (
    <section className="about-section about-section-home">
      {/* About content  */}
      <div className=" about-container">
        {/* <p className="about-label">ABOUT CHAIOMI</p> */}

        {/* Heading */}
        <h2 className="about-heading">
          Personalized beverages, brewed by intelligent technology.
        </h2>
        {/* Description */}
        <p className="about-description">
          Chaiomi combines robotics and personalization to create a consistent,
          memorable beverage experience in every cup.
        </p>
        <p className="about-text">
          From the first sip to the last drop, we ensure your perfect chai every
          time.
        </p>

        {/* Button to navigate to Full About Page */}
        <Link to="/about" className="about-button">
          Learn More About Us
        </Link>
      </div>
    </section>
  );
}

export default About;
