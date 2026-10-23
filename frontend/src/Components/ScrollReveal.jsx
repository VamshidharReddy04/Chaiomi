// ScrollReveal.jsx is a wrapper component that animates its children when they enter the viewport.
// It uses Framer Motion for the animation and respects the user's reduced motion preference.
import { motion, useReducedMotion } from "framer-motion";
const EASE = [0.22, 1, 0.36, 1];

// Reveals a section once it enters the viewport.
function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 0,
  blur = false,
}) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) {
    return <div className={`scroll-reveal ${className}`}>{children}</div>;
  }
  const hidden = { opacity: 0, y, ...(blur && { filter: "blur(8px)" }) };
  const shown = { opacity: 1, y: 0, ...(blur && { filter: "blur(0px)" }) };

  return (
    <motion.div
      className={`scroll-reveal ${className}`}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, amount: 0.008 }}
      transition={{ duration: 0.02, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
