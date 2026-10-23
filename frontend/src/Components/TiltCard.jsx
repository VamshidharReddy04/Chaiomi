import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

function TiltCard({ children, className = "", max = 6 }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  // position of cursor inside the card
  const posX = useMotionValue(0.5);
  const posY = useMotionValue(0.5);

  // Springs make the movement smoother and more natural
  const spring = { stiffness: 220, damping: 20, mass: 0.5 };
  const springX = useSpring(posX, spring);
  const springY = useSpring(posY, spring);

  const rotateX = useTransform(springX, [0, 1], [max, -max]);
  const rotateY = useTransform(springY, [0, 1], [-max, max]);

  const glareX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(springY, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.4), transparent 55%)`;

  const handleMove = (event) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    posX.set(Math.max(0, Math.min(1, x)));
    posY.set(Math.max(0, Math.min(1, y)));
  };

  const handleLeave = () => {
    posX.set(0.5);
    posY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={
        reducedMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 900 }
      }
      className={`group/tilt relative ${className}`}
    >
      {children}
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ background: glare }}
          className="tilt-glare"
        />
      )}
    </motion.div>
  );
}

export default TiltCard;
