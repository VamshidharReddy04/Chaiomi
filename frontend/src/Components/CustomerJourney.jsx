import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { journeySteps } from "../data/CustomerJounery";
import "../Styles/customerJourney.css";

// Typing animation for the subtitle text
const TYPE_SPEED = 40; // milliseconds per character

function CustomerJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedDescription, setTypedDescription] = useState("");
  const touchStartX = useRef(null);
  const activeStep = journeySteps[activeIndex];

  const goToStep = (index) => {
    setTypedDescription("");
    setActiveIndex((index + journeySteps.length) % journeySteps.length);
  };

  // Typing effect for the description text
  useEffect(() => {
    // Typing effect for the description text
    let character = 0;
    const typeSpeed = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : TYPE_SPEED;

    const typingTimer = window.setInterval(() => {
      character += 1;
      setTypedDescription(activeStep.description.slice(0, character)); // Update the typed description with the next character
      if (character >= activeStep.description.length)
        window.clearInterval(typingTimer); // Stop the typing effect when the full description is displayed
    }, typeSpeed);

    return () => window.clearInterval(typingTimer); // Cleanup the interval on component unmount or when activeStep changes
  }, [activeStep.description, activeStep.step]);

  // Handle touch events for swipe gestures
  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const distance = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(distance) > 50)
      goToStep(activeIndex + (distance < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  return (
    <section
      className="customer-journey-section"
      aria-labelledby="journey-title"
    >
      <div className="customer-journey-container">
        {/* Decorative elements */}

        <header className="customer-journey-header">
          <p className="customer-journey-eyebrow">
            • AI-Powered • Personalised • Robotic-Brewed Chai
          </p>

          <h2 id="journey-title" className="customer-journey-title">
            Chaiomi Customer Journey
          </h2>

          <p className="customer-journey-intro">
            A calming,Guided five step experience that remembers the way you
            like your chai.
          </p>
        </header>

        <div
          className="customer-journey-carousel"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={handleTouchEnd}
        >
          <div className="customer-journey-card">
            <div key={activeStep.step} className="customer-journey-slide">
              <div
                className="customer-journey-media"
                style={{
                  "--journey-image-ratio": `${activeStep.width} / ${activeStep.height}`,
                }}
              >
                {/* Image for each step */}
                <img
                  key={activeStep.image}
                  src={activeStep.image}
                  srcSet={activeStep.responsiveImage}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  alt={activeStep.title}
                  className="customer-journey-image"
                  loading="lazy"
                  width={activeStep.width}
                  height={activeStep.height}
                  decoding="async"
                />
              </div>

              {/* Article for each step */}
              <article className="customer-journey-content">
                <p className="customer-journey-step-label">
                  The Chaiomi Customer Journey
                </p>

                <h3 className="customer-journey-step-title">
                  {activeStep.title}
                </h3>

                <p className="customer-journey-step-summary">
                  {activeStep.subtitle}
                </p>

                <div className="customer-journey-detail">
                  <p className="customer-journey-detail-text">
                    {typedDescription}
                    <span
                      aria-hidden="true"
                      className="customer-journey-cursor"
                    />
                  </p>
                </div>

                {/* Additional content for each step */}
                <div className="customer-journey-footer">
                  <div className="customer-journey-meta">
                    <p className="customer-journey-counter" aria-live="polite">
                      {activeIndex + 1}
                      <span className="customer-journey-counter-total">
                        {" "}
                        of {journeySteps.length}
                      </span>
                    </p>

                    <div className="customer-journey-buttons">
                      <button
                        type="button"
                        onClick={() => goToStep(activeIndex - 1)}
                        className="customer-journey-button-prev"
                        aria-label="Go to previous step"
                      >
                        <ArrowLeft size={20} />
                      </button>

                      <button
                        type="button"
                        onClick={() => goToStep(activeIndex + 1)}
                        className="customer-journey-button-next"
                        aria-label="Go to next step"
                      >
                        <ArrowRight size={20} strokeWidth={2.25} />
                      </button>
                    </div>
                  </div>

                  <div
                    className="customer-journey-dots"
                    role="tablist"
                    aria-label="Choose a journey step"
                  >
                    {journeySteps.map((step, index) => (
                      <button
                        key={step.step}
                        type="button"
                        onClick={() => goToStep(index)}
                        className={`customer-journey-dot ${index === activeIndex ? "is-active" : ""}`}
                        role="tab"
                        aria-selected={index === activeIndex}
                        aria-label={`Go to step ${step.step}:${step.title}`}
                      />
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CustomerJourney;
