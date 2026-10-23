import {
  ArrowRight,
  Bot,
  Sparkles,
  TrendingUp,
  Users,
  CheckCircle,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../StylePages/franchise.css";

const franchiseFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLScyoKsZgfPZEVS_e-hSk4oVdBXFY3iq7MDjh4KtBdarxpt_3Q/viewform?usp=header";

const benefits = [
  {
    icon: Bot,
    title: "AI-powered robotic brewing",
    description:
      "OMI, our AI-powered brewing technology, delivers a consistent, personalized cup every time — without needing a master chai-maker on every shift.",
  },
  {
    icon: Sparkles,
    title: "Premium Brand Experience",
    description:
      "Chaiomi is built for the modern chai lover, with a premium kiosk design, a memorable brand identity, and a focus on personalization and quality.",
  },
  {
    icon: TrendingUp,
    title: "Growing market opportunity",
    description:
      "The chai market is experiencing significant growth, with increasing demand for premium, personalized experiences.",
  },
  {
    icon: Users,
    title: "Complete Franchise Support",
    description:
      "We provide comprehensive support to our franchisees, including training, marketing, and operational assistance, ensuring your success from day one.",
  },
];
// Franchise Process Steps
const steps = [
  "Submit your franchise inquiry",
  "Business discussion with our team",
  "Site selection and evaluation",
  "Franchise agreement and onboarding",
  "Kiosk setup and training",
  "Grand opening and ongoing support",
];

function Franchise() {
  return (
    <>
      <Navbar />
      <main className="franchise-page">
        {/* Franchise Hero Section */}
        <section className="franchise-hero">
          <div className="franchise-hero-inner">
            <p className="franchise-eyebrow">Franchise with Chaiomi</p>
            <h1 className="franchise-title">
              Build the Future of Personalized Chai.
            </h1>
            <p className="franchise-lead">
              Partner with Chaiomi and launch an AI-powered, robotic-brewed chai
              kiosk in your city with complete business and operational support.
            </p>
            <a href="#franchise-form" className="franchise-hero-button">
              Apply for Franchise
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* Why franchise with Chaiomi */}
        <section className="franchise-section">
          <div className="franchise-container">
            <div className="franchise-section-header">
              <p className="franchise-eyebrow">Why Chaiomi</p>
              <h2 className="franchise-section-title-lg">
                Why partner with Chaiomi?
              </h2>
            </div>

            <div className="franchise-benefit-grid">
              {benefits.map(({ icon: Icon, title, description }) => (
                <article key={title} className="franchise-benefit-card">
                  <Icon className="franchise-benefit-icon" aria-hidden="true" />
                  <h3 className="franchise-benefit-title">{title}</h3>
                  <p className="franchise-benefit-text">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Franchise Application Process */}
        <section className="franchise-section-white">
          <div className="franchise-container-narrow">
            <div className="franchise-section-header">
              <p className="franchise-eyebrow">Franchise Process</p>
              <h2 className="franchise-section-title">
                Franchise Application Process
              </h2>
            </div>

            <div className="franchise-step-list">
              {steps.map((step, index) => (
                <div key={step} className="franchise-step">
                  <div className="franchise-step-number">{index + 1}</div>

                  <div className="franchise-step-body">
                    <h3 className="franchise-step-title">{step}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What will you get as a Chaiomi franchisee? */}
        <section className="franchise-section">
          <div className="franchise-container-narrow">
            <div className="franchise-section-header">
              <p className="franchise-eyebrow">Franchise Partner Benefits</p>
              <h2 className="franchise-section-title">
                Everything you need to succeed as a Chaiomi franchisee.
              </h2>

              <div className="franchise-support-grid">
                {[
                  "Kiosk setup and design assistance",
                  "Branding and marketing support",
                  "Operational training and technology support",
                  "Continuous business and marketing support",
                  "Access to our AI-powered robotic brewing technology",
                  "Exclusive franchisee community and networking opportunities",
                ].map((item) => (
                  <div key={item} className="franchise-support-card">
                    <CheckCircle className="franchise-support-icon" />
                    <p className="franchise-support-text">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="franchise-cta">
              <h2 className="franchise-cta-title">
                Ready to become a Chaiomi franchisee?
              </h2>
              <p className="franchise-cta-text">
                Complete the inquiry form below, and our team will get in touch
                with you to discuss the next steps.
              </p>
              <a href="#franchise-form" className="franchise-cta-button">
                Apply for Franchise
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* Franchise Google Form */}
        <section className="franchise-section-white" id="franchise-form">
          <div className="franchise-container-narrow">
            <div className="franchise-section-header">
              <p className="franchise-form-eyebrow">Inquiry Form</p>
              <h2 className="franchise-section-title-lg">
                Franchise Inquiry Form
              </h2>
              <p className="franchise-form-text">
                Please fill out the official franchise inquiry form below.
              </p>
            </div>
            <div className="franchise-form-frame">
              <div className="franchise-form-access">
                <h3 className="franchise-form-access-title">
                  Open the Chaiomi franchise form
                </h3>
                <p className="franchise-form-access-text">
                  The official form opens securely in a new tab. Complete your
                  details there and submit your franchise inquiry.
                </p>
                <a
                  href={franchiseFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="franchise-form-access-button"
                >
                  Open Franchise Form
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Franchise;
