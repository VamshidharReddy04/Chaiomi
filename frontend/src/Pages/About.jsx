import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { teamMembers } from "../data/team";
import "../StylePages/about.css";

function About() {
  const [selectedMember, setSelectedMember] = useState(null);

  // Close the profile modal with Escape and lock page scroll while it is open
  useEffect(() => {
    if (!selectedMember) return;

    const handleKey = (event) => {
      if (event.key === "Escape") setSelectedMember(null);
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selectedMember]);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-container about-hero-content">
          <p className="about-hero-label">ABOUT CHAIOMI</p>
          <h1 className="about-hero-title">
            Brewing the Future of Personalized Beverages
          </h1>
          <p className="about-hero-description">
            AI-powered robotic microbrewing built for consistency,
            personalization and unforgettable customer experiences.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-section about-section-mist">
        <div className="about-content">
          <h2 className="about-section-title">The Chaiomi Story</h2>

          <div className="about-story-content">
            <div className="about-paragraph">
              <h3>
                <strong>A New Chapter in Every Cup.</strong>
              </h3>
              <p>
                There is no default chai. So why should there be a default way
                to make it?
              </p>
              <p>
                For generations, chai has been more than a beverage. It has been
                a ritual, a conversation starter, a comfort, and a reflection of
                who we are. Yet, in a world where personalization is
                transforming everything around us, the way we experience our
                everyday beverages has remained largely unchanged.
              </p>
              <p>At Chaiomi, we believe it is time for that to change.</p>
              <p>
                Born in India, the land of chai, Chaiomi was created with a bold
                ambition: to reimagine the everyday beverage experience by
                bringing together the warmth of tradition and the possibilities
                of technology.
              </p>

              <h3>
                <strong>Introducing OMI. Meet OMI.</strong> The Intelligence
                Behind Every Cup.
              </h3>
              <p>
                At the core of Chaiomi lies the Optimal Microbrewing
                Intelligence System, our proprietary platform integrating
                advanced robotics and intelligent brewing algorithms to deliver
                hyper-personalized beverages at scale.
              </p>
              <p>
                The OMI isn’t just a brewer—it’s your personal chai master.
                Designed to learn your taste and remember your exact
                preferences, OMI delivers a consistently flawless cup every
                single time. It bridges centuries of authentic chai
                craftsmanship with modern precision science, ensuring perfection
                in every pour.
              </p>

              <h3>
                <strong>The Future of Chai.</strong> Personal, Consistent,
                Intuitive.
              </h3>
              <p>
                The OMI is a perfect blend of personalization and consistency.
                From the strength of your chai to its sweetness, ingredients,
                and flavour profile, OMI is designed to make customization
                intuitive and brewing consistent. It enables a new generation of
                beverage experiences where technology adapts to people, rather
                than people adapting to machines.
              </p>
              <p>And this is just the beginning.</p>

              <h3>
                <strong>Not Just a Cup.</strong> A Reflection of You.
              </h3>
              <p>
                We see a future where your beverage understands your
                preferences, remembers your favourite combinations, and makes
                every visit feel more personal. With a technology-led approach
                and a growing universe of beverage possibilities, Chaiomi is
                building an ecosystem where innovation meets everyday
                indulgence.
              </p>
              <p>
                Our ambition extends beyond a single cup or a single cafe. We
                are creating a scalable beverage platform designed to bring
                personalized experiences to more people, in more places, with
                consistent quality.
              </p>

              <h3>
                <strong>Made in India.</strong> Imagined for the World.
              </h3>
              <p>
                Chaiomi is a product of India, but it is envisioned for the
                entire world. We are building Chaiomi with a global mindset and
                an Indian soul — combining the cultural richness of our beverage
                heritage with the precision and possibilities of modern
                technology.
              </p>
              <p>
                Because the future of beverages should be more personal, more
                intelligent, and more human.
              </p>

              <h3 className="about-tagline">
                <strong>Chaiomi. It Knows You.</strong>
                <br />
                <strong>Your Chai. Your Way.</strong>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="about-section about-section-white">
        <div className="about-container">
          <h2 className="about-section-title">Our Vision</h2>
          <p className="about-vision-text">
            To redefine how the world experiences beverages. To build the
            world's most loved personalized beverage brand, born in India and
            powered by intelligent technology, where every cup reflects
            individual taste, preference, and personality.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="about-section about-section-white">
        <div className="about-container">
          <h2 className="about-section-title">Our Mission</h2>
          <p className="about-mission-text">
            To make every cup uniquely yours. We combine AI, robotics, and
            intelligent brewing to deliver personalized beverages with
            exceptional consistency, convenience, and quality. Through our
            proprietary OMI technology, we are transforming everyday beverage
            experiences into moments of personal expression—making every cup the
            way you love it, every time.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="about-team-section">
        <div className="about-team-container">
          <h2 className="about-team-title">Meet the Chaiomi Team</h2>
          <p className="about-team-subtitle">
            Experienced people building the future of personalized chai.
          </p>

          <div className="about-team-grid">
            {teamMembers.map((member) => (
              <article key={member.name} className="team-card">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-image"
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-experience">{member.experience}</p>
                <p className="team-tagline">{member.tagline}</p>

                <div className="team-actions">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="team-link"
                  >
                    LinkedIn
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedMember(member)}
                    className="team-profile-button"
                  >
                    View Profile
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Profile modal */}
      {selectedMember && (
        <div
          className="profile-overlay"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="profile-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedMember.name} profile`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="profile-close"
              aria-label="Close profile"
            >
              ×
            </button>

            <div className="profile-header">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="profile-image"
                width="400"
                height="400"
                decoding="async"
              />
              <div className="profile-details">
                <h2 className="profile-name">{selectedMember.name}</h2>
                <p className="profile-role">{selectedMember.role}</p>
                <p className="profile-experience">
                  {selectedMember.experience}
                </p>
                <p className="profile-tagline">{selectedMember.tagline}</p>
              </div>
            </div>

            <div className="profile-section">
              <h3 className="profile-heading">Professional Summary</h3>
              <p className="profile-summary">{selectedMember.summary}</p>
            </div>

            <div className="profile-section">
              <h3 className="profile-heading">Career Highlights</h3>
              <ul className="profile-highlights">
                {selectedMember.highlights.map((highlight) => (
                  <li key={highlight} className="profile-highlight">
                    <span>✓</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="profile-section">
              <h3 className="profile-heading">Areas of Expertise</h3>
              <div className="profile-skills">
                {selectedMember.skills.map((skill) => (
                  <span key={skill} className="profile-skill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {selectedMember.education.length > 0 && (
              <div className="profile-section">
                <h3 className="profile-heading">Education & Certifications</h3>
                <ul className="profile-education">
                  {selectedMember.education.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="profile-linkedin-wrapper">
              <a
                href={selectedMember.linkedin}
                target="_blank"
                rel="noreferrer"
                className="profile-linkedin"
              >
                View LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Journey */}
      <section className="journey-section">
        <div className="journey-container">
          <h2 className="journey-title">Our Journey</h2>
          <p className="journey-subtitle">
            From Vision to Reality | 2024 - 2026
          </p>

          <div className="journey-list">
            <div className="journey-item">
              <h3 className="journey-year">
                2024 | Alpha — The First Breakthrough
              </h3>
              <p className="journey-description">
                One machine. No robotic arm. A team of 4 pushing boundaries
                through relentless prototyping and countless hours of
                engineering to bring our vision to life.
              </p>
            </div>

            <div className="journey-item">
              <h3 className="journey-year">
                2025 | Beta — The Robotics Revolution
              </h3>
              <p className="journey-description">
                Three brewing machines integrated with a robotic arm in a lab
                prototype. A team of 8 working tirelessly to transform an
                ambitious concept into an intelligent brewing system.
              </p>
            </div>

            <div className="journey-item">
              <h3 className="journey-year">
                2026 | Final Product — Built for Deployment
              </h3>
              <p className="journey-description">
                The complete OMI structure, engineered and ready for deployment.
                Nearly 20 team members across 8 engineering departments brought
                together their expertise, dedication, and countless engineering
                hours to make it happen.
              </p>
            </div>
          </div>

          <p className="journey-subtitle">
            3 Years. Countless Hours. One Revolutionary Vision.
          </p>
        </div>
      </section>

      {/* Join */}
      <section className="join-section">
        <div className="join-container">
          <h2 className="join-title">Join Our Journey</h2>
          <p className="join-description">
            We are building the future of intelligent beverage technology.
          </p>
          <div>
            <Link to="/careers" className="career-link">
              View Careers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;
