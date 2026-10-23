import { useEffect, useRef, useState } from "react";
import { createKioskScene, JOINTS, stepAt } from "../data/KioskScene3D";
import "../StylePages/kioskScroll.css";

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

export default function KioskScroll3D({
  steps,
  modelUrl = "/models/kiosk.glb",
  scrollHeight = 500,
  label = "How the Chaiomi kiosk works",
  onError,
}) {
  const [reduce] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [active, setActive] = useState(-1);
  const [loadPct, setLoadPct] = useState(0);
  const [ready, setReady] = useState(false);
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const outRef = useRef([]);
  const barRef = useRef(null);
  const introRef = useRef(null);
  const errorRef = useRef(onError);
  // errorRef.current = onError;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    let cancelled = false;
    let scene = null;
    let teardown = () => {};

    (async () => {
      try {
        scene = await createKioskScene(canvas, {
          modelUrl,
          steps,
          onProgress: (v) => !cancelled && setLoadPct(v),
        });
      } catch (err) {
        console.error("3D kiosk failed to load:", err);
        if (!cancelled) errorRef.current?.();
        return;
      }
      if (cancelled) {
        scene.dispose();
        return;
      }
      setReady(true);

      let target = reduce ? 0.95 : 0;
      let shown = target;
      let raf = 0;
      let lastStep = -1;

      const paint = (p) => {
        const values = scene.draw(p);
        values.forEach((n, i) => {
          const el = outRef.current[i];
          if (el)
            el.textContent = `${(Math.round(n * 10) / 10).toFixed(1)}${JOINTS[i].unit}`;
        });
        if (barRef.current)
          barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
        const idx = p < steps[0].at ? -1 : stepAt(p, steps);
        if (introRef.current) {
          introRef.current.classList.toggle("is-hidden", p >= steps[0].at);
        }
        if (idx !== lastStep) {
          lastStep = idx;
          setActive(idx);
        }
      };

      const resize = () => {
        scene.resize(canvas.clientWidth, canvas.clientHeight);
        paint(shown);
      };
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);
      resize();

      const readTarget = () => {
        const rect = wrap.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        target = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
      };
      // Frame-rate independent easing toward the scroll position (same feel on 60 Hz and 144 Hz screens).
      // Rendering stops once it settles.
      let lastT = 0;
      const frame = (now) => {
        const dt = Math.min((now - lastT) / 1000, 0.05);
        lastT = now;
        shown += (target - shown) * (1 - Math.exp(-dt * 7));
        if (Math.abs(target - shown) < 0.0003) shown = target;
        paint(shown);
        raf = shown === target ? 0 : requestAnimationFrame(frame);
      };
      const kick = () => {
        readTarget();
        if (!raf) {
          lastT = performance.now();
          raf = requestAnimationFrame(frame);
        }
      };

      if (!reduce) {
        kick();
        window.addEventListener("scroll", kick, { passive: true });
        window.addEventListener("resize", kick);
      }
      teardown = () => {
        window.removeEventListener("scroll", kick);
        window.removeEventListener("resize", kick);
        cancelAnimationFrame(raf);
        ro.disconnect();
      };
    })();

    return () => {
      cancelled = true;
      teardown();
      if (scene) scene.dispose();
    };
  }, [reduce, steps, modelUrl]);

  const readout = (
    <ul className="kiosk-readout" aria-hidden="true">
      {JOINTS.map((j, i) => (
        <li key={j.id}>
          <span>
            {j.id} <em>{j.name}</em>
          </span>
          <output ref={(el) => (outRef.current[i] = el)}>0.0{j.unit}</output>
        </li>
      ))}
    </ul>
  );

  const loading = !ready && (
    <div className="kiosk-loading" role="status">
      Loading 3D model… {Math.round(loadPct * 100)}%
    </div>
  );

  if (reduce) {
    return (
      <section className="kiosk kiosk-static" aria-label={label}>
        <div className="kiosk-stage" style={{ aspectRatio: "16 / 10" }}>
          <canvas
            ref={canvasRef}
            className="kiosk-canvas"
            role="img"
            aria-label={label}
          />
          {loading}
        </div>
        {readout}
        <ol className="kiosk-static-steps">
          {steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      ref={wrapRef}
      className="kiosk"
      style={{ "--kiosk-height": `${scrollHeight}vh` }}
      aria-label={label}
    >
      <div className="kiosk-sticky">
        <div ref={introRef} className="kiosk-hero-copy">
          <p className="kiosk-intro-label">How it works</p>
          <h1 className="kiosk-intro-title">A café in a glass box.</h1>
          <p className="kiosk-intro-text">
            Robotic precision, in full view. Scroll to watch one cup being made.
          </p>
        </div>
        <div className="kiosk-stage">
          <canvas
            ref={canvasRef}
            className="kiosk-canvas"
            role="img"
            aria-label={label}
          />
          {loading}
        </div>
        {readout}
        <div className="kiosk-captions">
          {steps.map((s, i) => (
            <article
              key={s.title}
              className={`kiosk-step${i === active ? " is-active" : ""}`}
              aria-hidden={i !== active}
            >
              <span className="kiosk-step-number">{s.number}</span>
              <h3 className="kiosk-step-title">{s.title}</h3>
              <p className="kiosk-step-text">{s.text}</p>
            </article>
          ))}
        </div>
        <div className="kiosk-progress" aria-hidden="true">
          <span ref={barRef} />
        </div>
      </div>
      <ol className="kiosk-sr">
        {steps.map((s) => (
          <li key={s.title}>
            {s.title}. {s.text}
          </li>
        ))}
      </ol>
    </section>
  );
}
