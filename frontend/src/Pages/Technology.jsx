// Technology page for Chaiomi website.
import { useState } from "react";
import {
  Cpu,
  Save,
  Settings,
  ShieldCheck,
  Thermometer,
  Brain,
  Clock,
  Infinity as InfinityIcon,
  Leaf,
  Shield,
} from "lucide-react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../StylePages/technology.css";

const brewingSteps = [
  {
    number: "01",
    title: "Configure",
    description: "Choose your size, spices, sweetness, and preferred strength.",
    icon: Settings,
    accent: "tech-card-glow--orange",
    accentColor: "#f97316",
    animation: "configure",
  },
  {
    number: "02",
    title: "Brew",
    description: "OMI prepares your drink with precise robotic control.",
    icon: Cpu,
    accent: "tech-card-glow--blue",
    accentColor: "#3b82f6",
    animation: "brew",
  },
  {
    number: "03",
    title: "Perfect",
    description: "Temperature and brewing variables are carefully managed.",
    icon: Thermometer,
    accent: "tech-card-glow--green",
    accentColor: "#10b981",
    animation: "perfect",
  },
  {
    number: "04",
    title: "Save & reorder",
    description:
      "Save your recipe and enjoy the same taste on your next visit.",
    icon: Save,
    accent: "tech-card-glow--yellow",
    accentColor: "#eab308",
    animation: "save",
  },
];

// Innovation cards
const innovationFeatures = [
  {
    title: "OMI- Optimal Microbrew Intelligence",
    description:
      "Chaiomi’s robotic system precisely controls and micro-brews every cup for true personalization and consistency.",
    icon: Cpu,
  },
  {
    title: "AI Hyper-Personalization",
    description:
      "Learns your mood, adapts to weather, considers your health—crafting chai that truly understands you.",
    icon: Brain,
  },
  {
    title: "1 Billion+ Recipe Combinations",
    description:
      "Endless possibilities from authentic masala chai to innovative fusion blends, all customized to your taste.",
    icon: InfinityIcon,
  },
  {
    title: "Contactless & Hygienic",
    description:
      "100% automated brewing process ensures every cup is prepared with the highest hygiene standards.",
    icon: Shield,
  },
  {
    title: "Sustainable Design",
    description:
      "Ethically sourced ingredients and eco-conscious packaging that respects both tradition and planet.",
    icon: Leaf,
  },
  {
    title: "Ready in 45seconds <1 Minute",
    description:
      "Premium chai crafted fresh in under two minutes—because great things should not keep you waiting.",
    icon: Clock,
  },
];

function MiniAnimation({ active }) {
  if (!active) return null;
}

function Technology() {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <>
      <Navbar />

      <main>
        {/* hero section*/}
        <section className="tech-hero">
          <div className="tech-hero-inner">
            <p className="tech-eyebrow">Chaiomi innovation</p>

            <h1 className="tech-title">Meet OMI</h1>

            <p className="tech-subtitle">Optimal Microbrew Intelligence</p>

            <p className="tech-lead">
              Our robotic brewing system combines precision, personalization,
              and consistency to make every Chaiomi beverage your perfect cup.
            </p>
          </div>
        </section>

        {/* CHALLENGE / SOLUTION */}
        <section className="tech-compare">
          <div className="tech-compare-grid">
            <article className="tech-compare-card tech-compare-card--problem">
              <p className="tech-compare-label tech-compare-label--problem">
                The challenge
              </p>

              <h2 className="tech-compare-title">
                Great taste should not depend on location.
              </h2>

              <p className="tech-compare-text">
                Traditional brewing can vary from cup to cup and location to
                location. Water quality, temperature, timing, and preparation
                methods all affect the final experience.
              </p>
            </article>

            <article className="tech-compare-card tech-compare-card--solution">
              <p className="tech-compare-label tech-compare-label--solution">
                The OMI solution
              </p>

              <h2 className="tech-compare-title">
                Your recipe, brewed precisely every time.
              </h2>

              <p className="tech-compare-text">
                OMI remembers your preferences and standardizes the brewing
                process. Every location can deliver the same personalized
                experience with reliable precision.
              </p>
            </article>
          </div>
        </section>

        {/* INNOVATION */}
        <section
          className="tech-innovation"
          aria-labelledby="tech-innovation-title"
        >
          <div className="tech-innovation-container">
            <div className="tech-innovation-header">
              <p className="tech-innovation-eyebrow">Innovation</p>

              <h2 id="tech-innovation-title" className="tech-innovation-title">
                Where Tradition Meets Technology
              </h2>
            </div>

            <ul className="tech-innovation-grid">
              {innovationFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <li key={feature.title} className="tech-innovation-card">
                    <div className="tech-innovation-icon">
                      <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                    </div>

                    <h3 className="tech-innovation-card-title">
                      {feature.title}
                    </h3>

                    <p className="tech-innovation-card-text">
                      {feature.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section className="tech-process">
          {/* Decorative background */}
          <div aria-hidden="true" className="tech-process-glow" />

          <div className="tech-process-container">
            {/* Header */}
            <div className="tech-process-header">
              <div className="tech-process-badge">
                <span className="tech-process-badge-dot" />
                How it works
              </div>

              <h2 className="tech-process-title">
                From preference to perfect cup
              </h2>

              <p className="tech-process-intro">
                A simple experience powered by intelligent brewing technology.
              </p>
            </div>

            {/* Steps */}
            <ol className="tech-steps">
              {/* Connecting line */}
              <div aria-hidden="true" className="tech-steps-line" />

              {brewingSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;

                return (
                  <li
                    key={step.number}
                    className="tech-step"
                    onMouseEnter={() => setActiveStep(index)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <article
                      tabIndex={0}
                      onFocus={() => setActiveStep(index)}
                      onBlur={() => setActiveStep(null)}
                      onClick={() => setActiveStep(isActive ? null : index)}
                      className={`tech-card ${isActive ? "is-active" : ""}`}
                      style={{ "--tech-accent": step.accentColor }}
                    >
                      {/* Animated background */}
                      <div
                        className={`tech-card-glow ${step.accent} ${isActive ? "is-active" : ""}`}
                      />

                      {/* Animation */}
                      <MiniAnimation active={isActive} />

                      {/* Content */}
                      <div className="tech-card-content">
                        {/* Icon + number */}
                        <div className="tech-card-top">
                          <div
                            className={`tech-card-icon ${isActive ? "is-active" : ""}`}
                          >
                            <Icon
                              size={29}
                              strokeWidth={1.8}
                              aria-hidden="true"
                              className="tech-card-icon-svg"
                            />
                          </div>

                          <span
                            className={`tech-card-number ${isActive ? "is-active" : ""}`}
                          >
                            {step.number}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="tech-card-title">{step.title}</h3>

                        {/* Description */}
                        <p className="tech-card-text">{step.description}</p>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>

            {/* Bottom statement */}
            <div className="tech-process-footer">
              <p className="tech-process-footer-text">
                From your preferences to your perfect cup —
                <span className="tech-process-footer-strong">
                  OMI handles the rest.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section className="tech-cta">
          <div className="tech-cta-inner">
            <div className="tech-cta-icon">
              <ShieldCheck size={32} aria-hidden="true" />
            </div>

            <p className="tech-cta-eyebrow">Built for trust</p>

            <h2 className="tech-cta-title">Patented innovation</h2>

            <p className="tech-cta-text">
              OMI brings consistency and personalization together in one
              intelligent beverage platform, helping every Chaiomi location
              deliver a dependable, delightful experience.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Technology;
