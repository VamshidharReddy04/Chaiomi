import { useState } from "react";
// import { motion } from "framer-motion";
import { Coffee, Save, Settings } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import TiltCard from "./TiltCard";
import "../Styles/howItWorks.css";

// const EASE = [0.22, 1, 0.36, 1];

const steps = [
  {
    number: "01",
    title: "Configure",
    description: "Choose your size, strength, spices, and sweetness.",
    icon: Settings,
    video: null,
    accent: "how-card-glow--orange",
  },
  {
    number: "02",
    title: "Brew",
    description: "OMI prepares your chai with precise robotic control.",
    icon: Coffee,
    video: null,
    accent: "how-card-glow--blue",
  },
  {
    number: "03",
    title: "Save & repeat",
    description: "Save your recipe and enjoy your perfect cup again.",
    icon: Save,
    video: null,
    accent: "how-card-glow--pink",
  },
];

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(null);

  const playPreview = (event, index) => {
    setActiveStep(index);
    const video = event.currentTarget.querySelector("video");
    video?.play().catch((error) => {
      console.warn("How It Works video could not start playback.", error);
    });
  };

  const pausePreview = (event) => {
    const video = event.currentTarget.querySelector("video");
    video?.pause();
  };

  return (
    <section className="how-section" aria-labelledby="how-it-works-title">
      {/* Decorative background */}
      <div aria-hidden="true" className="how-glow" />

      <div className="how-container">
        {/* Header */}
        <div className="how-header">
          <h2 id="how-it-works-title" className="how-title">
            How it Works
          </h2>
          <p className="how-intro">
            Your favorite drinks, exactly how you like them. Select your
            preferences,blend,OMI brew and save your recipe for future enjoyment
            again and again.
          </p>
        </div>

        {/* Cards part */}
        <ol className="how-steps">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;
            // const hasVideo = Boolean(step.video && step.video !== "null");

            return (
              <li key={step.number} className="how-step">
                <ScrollReveal delay={index * 0.14} className="how-reveal">
                  <TiltCard className="how-tilt">
                    <article
                      tabIndex={0}
                      onMouseEnter={(event) => playPreview(event, index)}
                      onMouseLeave={pausePreview}
                      onFocus={(event) => playPreview(event, index)}
                      onBlur={pausePreview}
                      onClick={(event) => {
                        setActiveStep(isActive ? null : index);
                        if (isActive) pausePreview(event);
                        else playPreview(event, index);
                      }}
                      className={`how-card ${isActive ? "is-active" : ""}`}
                    >
                      {/* Animated background */}
                      <div
                        className={`how-card-glow ${step.accent} ${isActive ? "is-active" : ""}`}
                      />

                      {/* Video Part */}
                      {/* <div className="how-media"> */}
                      {/* Real video */}
                      {/* {hasVideo && (
                          <video muted playsInline loop preload="none" className="how-video">
                            <source src={step.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )} */}

                      {/* Placeholder */}
                      {/* <div
                          className={`how-placeholder ${hasVideo ? "is-hidden" : ""}`}
                        > */}
                      {/* icon & text */}
                      {/* <div className="how-placeholder-content">
                            <div className="how-placeholder-icon">
                              <Icon size={20} strokeWidth={1.8} aria-hidden="true" className="how-icon-svg" />
                            </div> */}

                      {/* <p className="how-placeholder-text">
                              {hasVideo
                                ? "Hover to preview"
                                : "No video available"}
                            </p>
                          </div>
                        </div>
                      </div> */}

                      {/* Card Content */}
                      <div className="how-content">
                        {/* Top row */}

                        <div className="how-content-top">
                          {/* Icon */}
                          <div
                            className={`how-icon ${isActive ? "is-active" : ""}`}
                          >
                            <Icon
                              size={20}
                              strokeWidth={1.8}
                              aria-hidden="true"
                              className="how-icon-svg"
                            />
                          </div>

                          {/* Number */}
                          <span
                            className={`how-number ${isActive ? "is-active" : ""}`}
                          >
                            {step.number}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="how-card-title">{step.title}</h3>

                        {/* Description */}
                        <p className="how-card-text">{step.description}</p>
                      </div>
                    </article>
                  </TiltCard>
                </ScrollReveal>
              </li>
            );
          })}
        </ol>

        {/* Bottom statement */}
        <div className="how-footer">
          <p className="how-footer-text">
            From your preferences to your perfect cup —
            <span className="how-footer-strong"> OMI handles the rest.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
