import { lazy, Suspense, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../StylePages/kioskScroll.css";

const KioskScroll3D = lazy(() => import("../Components/KioskScroll3D"));
const KioskScroll = lazy(() => import("../Components/KioskScroll")); // 2D fallback

// Defined outside the component so the reference never changes.
// "at" = scroll progress (0 to 1) where each caption appears.
const steps = [
  {
    at: 0.18,
    number: "01",
    status: "Pick",
    title: "A fresh cup, every time.",
    text: "Cups are dispensed one at a time, and no hand ever touches yours.",
  },
  {
    at: 0.5,
    number: "02",
    status: "Ice & brew",
    title: "Ice first. Then your brew.",
    text: "The ice maker drops fresh ice, then the brewer adds every ingredient your recipe asks for.",
  },
  {
    at: 0.75,
    number: "03",
    status: "Serve",
    title: "On the counter in under a minute.",
    text: "Placed at the pickup point, ready to drink.",
  },
];

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function HowItWorksPage() {
  const [use3D, setUse3D] = useState(hasWebGL);

  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="kiosk-fallback" />}>
        {use3D ? (
          <KioskScroll3D steps={steps} onError={() => setUse3D(false)} />
        ) : (
          <KioskScroll steps={steps} />
        )}
      </Suspense>
      <Footer />
    </>
  );
}
