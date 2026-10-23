import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import "../StylePages/kioskScroll.css";

/* ---------- Geometry (SVG units, viewBox 800 x 520) ---------- */
const BASE = { x: 150, y: 378 }; // arm pivot on the counter
const L1 = 210; // upper arm
const L2 = 210; // forearm
const L3 = 44; // tool link
const PICK = { x: 322, y: 318 }; // cup rim while waiting on the shelf
const SERVE = { x: 560, y: 360 }; // cup rim when served
const GRAB_P = 0.18; // progress when the gripper closes on the cup
const RELEASE_P = 0.84; // progress when the gripper lets go
const RAD = Math.PI / 180;

/* Where the cup rim (tool tip) should be at each point of the scroll.
   p = scroll progress 0..1, g = gripper open amount (1 open, 0 closed) */
const KEYS = [
  { p: 0.0, x: 300, y: 190, g: 1 }, // home
  { p: 0.07, x: 322, y: 250, g: 1 }, // above the cup
  { p: 0.13, x: 322, y: 318, g: 1 }, // down to the cup
  { p: 0.18, x: 322, y: 318, g: 0 }, // grip
  { p: 0.24, x: 322, y: 250, g: 0 }, // lift
  { p: 0.31, x: 400, y: 262, g: 0 }, // under the ice maker
  { p: 0.43, x: 400, y: 262, g: 0 }, // ice drops
  { p: 0.5, x: 490, y: 262, g: 0 }, // under the brewer
  { p: 0.66, x: 490, y: 262, g: 0 }, // brewing
  { p: 0.74, x: 545, y: 300, g: 0 }, // towards pickup
  { p: 0.8, x: 560, y: 360, g: 0 }, // lower onto the counter
  { p: 0.84, x: 560, y: 360, g: 1 }, // release
  { p: 0.9, x: 480, y: 230, g: 1 }, // retreat
  { p: 1.0, x: 300, y: 190, g: 1 }, // home
];

const JOINTS = [
  { id: "J1", name: "Base", unit: "°" },
  { id: "J2", name: "Shoulder", unit: "°" },
  { id: "J3", name: "Elbow", unit: "°" },
  { id: "J4", name: "Wrist", unit: "°" },
  { id: "J5", name: "Tool roll", unit: "°" },
  { id: "J6", name: "Gripper", unit: "%" },
];

const CUBE_X = [-12, -4, 4, -8, 0];
const CUBE_REST = [30, 30, 30, 21, 21];

/* ---------- Math helpers ---------- */
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const norm = (a) => Math.atan2(Math.sin(a), Math.cos(a));

function samplePath(p) {
  let i = 0;
  while (i < KEYS.length - 2 && p > KEYS[i + 1].p) i++;
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const t = smooth(clamp((p - a.p) / (b.p - a.p), 0, 1));
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), g: lerp(a.g, b.g, t) };
}

/* Two-link inverse kinematics. The tool always points straight down. */
function solve(p) {
  const k = samplePath(p);
  const dx = k.x - BASE.x;
  const dy = k.y - L3 - BASE.y;
  const d = clamp(Math.hypot(dx, dy), 30, L1 + L2 - 0.01);
  const a = Math.atan2(dy, dx);
  const alpha = Math.acos(
    clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1),
  );
  const t1 = a - alpha; // elbow always up
  const wx = BASE.x + d * Math.cos(a);
  const wy = BASE.y + d * Math.sin(a);
  const ex = BASE.x + L1 * Math.cos(t1);
  const ey = BASE.y + L1 * Math.sin(t1);
  const t2 = norm(Math.atan2(wy - ey, wx - ex) - t1);
  const t3 = norm(Math.PI / 2 - (t1 + t2));
  return {
    t1d: t1 / RAD,
    t2d: t2 / RAD,
    t3d: t3 / RAD,
    g: k.g,
    tipX: wx,
    tipY: wy + L3,
  };
}

/* ---------- Draw one frame by updating SVG attributes directly ---------- */
function drawScene(r, p, cache) {
  const s = solve(p);

  r.arm1.setAttribute(
    "transform",
    `translate(${BASE.x} ${BASE.y}) rotate(${s.t1d.toFixed(2)})`,
  );
  r.arm2.setAttribute(
    "transform",
    `translate(${L1} 0) rotate(${s.t2d.toFixed(2)})`,
  );
  r.arm3.setAttribute(
    "transform",
    `translate(${L2} 0) rotate(${s.t3d.toFixed(2)})`,
  );

  const open = 15 + 14 * s.g;
  r.jawA.setAttribute("d", `M${L3 - 30} -14 L${L3 + 14} ${-open}`);
  r.jawB.setAttribute("d", `M${L3 - 30} 14 L${L3 + 14} ${open}`);

  // Cup: waits on the shelf, rides the gripper, then stays on the counter
  let cx = SERVE.x;
  let cy = SERVE.y;
  if (p < GRAB_P) {
    cx = PICK.x;
    cy = PICK.y;
  } else if (p < RELEASE_P) {
    cx = s.tipX;
    cy = s.tipY;
  }
  r.cup.setAttribute(
    "transform",
    `translate(${cx.toFixed(1)} ${cy.toFixed(1)})`,
  );

  // Ice cubes drop one after another
  for (let i = 0; i < CUBE_REST.length; i++) {
    const t = clamp((p - 0.32 - i * 0.014) / 0.045, 0, 1);
    r.cubes[i].setAttribute("y", lerp(-68, CUBE_REST[i], t * t).toFixed(1));
    r.cubes[i].setAttribute("opacity", t > 0 ? 1 : 0);
  }

  // Brew stream and liquid level
  const fill = 24 * clamp((p - 0.51) / 0.14, 0, 1);
  r.liquid.setAttribute("y", (38 - fill).toFixed(1));
  r.liquid.setAttribute("height", fill.toFixed(1));
  const brewing = p > 0.505 && p < 0.655;
  r.stream.setAttribute("opacity", brewing ? 1 : 0);
  r.stream.setAttribute("height", Math.max(0, 102 - fill).toFixed(1));

  // Pickup glow and steam
  r.glow.setAttribute(
    "opacity",
    (clamp((p - 0.8) / 0.05, 0, 1) * 0.9).toFixed(2),
  );
  r.steam.setAttribute(
    "opacity",
    (clamp((p - 0.84) / 0.05, 0, 1) * 0.7).toFixed(2),
  );
  r.steam.setAttribute("stroke-dashoffset", (-p * 320).toFixed(1));

  // Base swivel marker and joint readout
  const yaw = clamp((s.tipX - 300) / 260, -1, 1) * 55;
  r.marker.setAttribute("cx", (BASE.x + 24 * Math.sin(yaw * RAD)).toFixed(1));
  r.marker.setAttribute("cy", (382 + 2 * (1 - Math.cos(yaw * RAD))).toFixed(1));

  const values = [yaw, s.t1d + 90, s.t2d, s.t3d, -yaw * 0.4, s.g * 100];
  values.forEach((v, i) => {
    const text = `${(Math.round(v * 10) / 10 + 0).toFixed(1)}${JOINTS[i].unit}`;
    if (cache[i] !== text && r.out[i]) {
      cache[i] = text;
      r.out[i].textContent = text;
    }
  });

  if (r.bar) r.bar.style.transform = `scaleX(${p.toFixed(4)})`;
}

const stepAt = (p, steps) => {
  let idx = 0;
  steps.forEach((s, i) => {
    if (p >= s.at) idx = i;
  });
  return idx;
};

/* ---------- The static SVG scene (rendered once) ---------- */
const Scene = memo(function Scene({ r }) {
  return (
    <svg
      ref={(el) => (r.root = el)}
      className="kiosk-svg"
      viewBox="0 0 800 520"
      role="img"
      aria-label="Animated diagram of the Chaiomi kiosk. A robotic arm picks a cup, adds ice, brews the drink and serves it."
      data-step="0"
    >
      <defs>
        <linearGradient id="k-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a6e0f0" stopOpacity=".16" />
          <stop offset="1" stopColor="#a6e0f0" stopOpacity=".03" />
        </linearGradient>
        <radialGradient id="k-amber">
          <stop offset="0" stopColor="#f0a479" stopOpacity=".6" />
          <stop offset="1" stopColor="#f0a479" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="k-steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a4f78" />
          <stop offset="1" stopColor="#14304f" />
        </linearGradient>
        <linearGradient id="k-tea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e3a869" />
          <stop offset="1" stopColor="#b06a33" />
        </linearGradient>
        <clipPath id="k-cup">
          <path d="M-15 0 L15 0 L11 40 L-11 40 Z" />
        </clipPath>
      </defs>

      {/* Glass enclosure and amber ring light */}
      <rect
        x="40"
        y="30"
        width="720"
        height="370"
        rx="22"
        fill="url(#k-glass)"
        stroke="rgba(166,224,240,.35)"
      />
      <ellipse cx="400" cy="46" rx="270" ry="26" fill="url(#k-amber)" />
      <ellipse
        cx="400"
        cy="44"
        rx="230"
        ry="10"
        fill="none"
        stroke="#f0a479"
        strokeOpacity=".7"
        strokeWidth="3"
      />

      {/* OMI screen */}
      <rect
        x="620"
        y="62"
        width="116"
        height="70"
        rx="8"
        fill="#061329"
        stroke="rgba(166,224,240,.45)"
      />
      <text x="678" y="92" textAnchor="middle" className="k-screen-title">
        OMI
      </text>
      <text
        ref={(el) => (r.status = el)}
        x="678"
        y="116"
        textAnchor="middle"
        className="k-screen-text"
      >
        Picking a cup
      </text>

      {/* Cup dispenser */}
      <g className="k-st k-st-cups">
        <rect
          className="k-box"
          x="236"
          y="215"
          width="60"
          height="185"
          rx="10"
          fill="url(#k-steel)"
        />
        <rect
          x="244"
          y="150"
          width="44"
          height="65"
          rx="6"
          fill="rgba(255,255,255,.05)"
          stroke="rgba(255,255,255,.35)"
        />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M248 ${158 + i * 18} L284 ${158 + i * 18} L280 ${172 + i * 18} L252 ${172 + i * 18} Z`}
            fill="none"
            stroke="rgba(255,255,255,.55)"
          />
        ))}
        <rect x="296" y="358" width="54" height="8" rx="3" fill="#2a4f78" />
      </g>

      {/* Ice maker */}
      <g className="k-st k-st-ice">
        <rect
          className="k-box"
          x="360"
          y="64"
          width="80"
          height="116"
          rx="10"
          fill="url(#k-steel)"
        />
        <rect
          x="372"
          y="80"
          width="56"
          height="32"
          rx="6"
          fill="#0a1e3a"
          stroke="rgba(166,224,240,.4)"
        />
        <path d="M386 180 H414 L408 196 H392 Z" fill="#2a4f78" />
      </g>

      {/* Brewer */}
      <g className="k-st k-st-brew">
        <rect
          className="k-box"
          x="450"
          y="64"
          width="80"
          height="120"
          rx="10"
          fill="url(#k-steel)"
        />
        <circle
          cx="490"
          cy="100"
          r="14"
          fill="#0a1e3a"
          stroke="#f0a479"
          strokeOpacity=".8"
        />
        <rect x="482" y="184" width="16" height="14" rx="3" fill="#2a4f78" />
      </g>
      <rect
        ref={(el) => (r.stream = el)}
        x="488.5"
        y="198"
        width="3"
        height="0"
        fill="url(#k-tea)"
        opacity="0"
      />

      {/* Counter */}
      <rect
        x="40"
        y="400"
        width="720"
        height="22"
        rx="6"
        fill="#0c2a50"
        stroke="rgba(166,224,240,.35)"
      />
      <rect x="40" y="422" width="720" height="78" fill="#08182f" />
      <text className="k-label k-l0" x="266" y="466" textAnchor="middle">
        CUPS
      </text>
      <text className="k-label k-l1" x="400" y="466" textAnchor="middle">
        ICE
      </text>
      <text className="k-label k-l2" x="490" y="466" textAnchor="middle">
        BREWER
      </text>
      <text className="k-label k-l3" x="560" y="466" textAnchor="middle">
        PICKUP
      </text>

      {/* Pickup window */}
      <g className="k-st k-st-pick">
        <rect
          className="k-box"
          x="515"
          y="305"
          width="90"
          height="95"
          rx="12"
          fill="none"
          strokeDasharray="6 6"
        />
        <ellipse
          ref={(el) => (r.glow = el)}
          cx="560"
          cy="402"
          rx="56"
          ry="9"
          fill="url(#k-amber)"
          opacity="0"
        />
      </g>

      {/* Cup */}
      <g ref={(el) => (r.cup = el)}>
        <path
          d="M-15 0 L15 0 L11 40 L-11 40 Z"
          fill="rgba(255,255,255,.08)"
          stroke="rgba(255,255,255,.8)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <g clipPath="url(#k-cup)">
          <rect
            ref={(el) => (r.liquid = el)}
            x="-15"
            y="38"
            width="30"
            height="0"
            fill="url(#k-tea)"
          />
        </g>
        {CUBE_X.map((x, i) => (
          <rect
            key={x + "-" + i}
            ref={(el) => (r.cubes[i] = el)}
            x={x}
            y="-68"
            width="8"
            height="8"
            rx="2"
            fill="rgba(220,245,255,.9)"
            stroke="rgba(255,255,255,.9)"
            opacity="0"
          />
        ))}
      </g>

      {/* Steam over the served cup */}
      <path
        ref={(el) => (r.steam = el)}
        d="M552 346 q-6 -14 0 -26 t0 -26 M568 350 q6 -14 0 -26 t0 -26"
        fill="none"
        stroke="rgba(255,255,255,.6)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="10 8"
        opacity="0"
      />

      {/* Arm base */}
      <rect
        x="114"
        y="384"
        width="72"
        height="16"
        rx="6"
        fill="url(#k-steel)"
        stroke="rgba(166,224,240,.4)"
      />
      <ellipse
        cx="150"
        cy="382"
        rx="34"
        ry="7"
        fill="#0a1e3a"
        stroke="rgba(166,224,240,.5)"
      />
      <circle
        ref={(el) => (r.marker = el)}
        cx="150"
        cy="382"
        r="3.5"
        fill="#f0a479"
      />

      {/* Six-joint arm, drawn as nested groups so each joint rotates the rest */}
      <g ref={(el) => (r.arm1 = el)}>
        <rect
          x="-10"
          y="-9"
          width={L1 + 20}
          height="18"
          rx="9"
          fill="url(#k-steel)"
          stroke="rgba(166,224,240,.55)"
        />
        <g ref={(el) => (r.arm2 = el)}>
          <rect
            x="-10"
            y="-8"
            width={L2 + 20}
            height="16"
            rx="8"
            fill="url(#k-steel)"
            stroke="rgba(166,224,240,.55)"
          />
          <g ref={(el) => (r.arm3 = el)}>
            <rect
              x="-8"
              y="-7"
              width={L3 + 8}
              height="14"
              rx="7"
              fill="url(#k-steel)"
              stroke="rgba(166,224,240,.55)"
            />
            <path
              ref={(el) => (r.jawA = el)}
              d=""
              fill="none"
              stroke="#f0a479"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              ref={(el) => (r.jawB = el)}
              d=""
              fill="none"
              stroke="#f0a479"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle r="9" fill="#0a1e3a" stroke="#9be8f1" strokeWidth="2" />
          </g>
          <circle r="11" fill="#0a1e3a" stroke="#9be8f1" strokeWidth="2" />
        </g>
        <circle r="13" fill="#0a1e3a" stroke="#9be8f1" strokeWidth="2" />
      </g>

      {/* Glass reflection */}
      <path
        d="M40 60 L180 30 L250 30 L40 250 Z"
        fill="rgba(255,255,255,.04)"
        pointerEvents="none"
      />
    </svg>
  );
});

/* ---------- Component ---------- */
export default function KioskScroll({
  steps,
  scrollHeight = 500,
  label = "How the Chaiomi kiosk works",
}) {
  const [reduce] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const cacheRef = useRef({});
  const r = useRef({ cubes: [], out: [] }).current;

  // First paint: home pose, or the finished drink for reduced motion
  useLayoutEffect(() => {
    const p = reduce ? 0.95 : 0;
    drawScene(r, p, cacheRef.current);
    const idx = reduce ? steps.length - 1 : 0;
    r.status.textContent = steps[idx].status;
    r.root.dataset.step = idx;
  }, [reduce, r, steps]);

  useEffect(() => {
    if (reduce || !wrapRef.current) return;
    const wrap = wrapRef.current;
    let target = 0;
    let shown = 0;
    let raf = 0;
    let lastStep = -1;

    const readTarget = () => {
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      target = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
    };

    const frame = () => {
      shown += (target - shown) * 0.16; // gentle smoothing
      if (Math.abs(target - shown) < 0.0004) shown = target;
      drawScene(r, shown, cacheRef.current);

      const idx = stepAt(shown, steps);
      if (idx !== lastStep) {
        lastStep = idx;
        setActive(idx);
        r.status.textContent = steps[idx].status;
        r.root.dataset.step = idx;
      }
      raf = shown === target ? 0 : requestAnimationFrame(frame);
    };

    const kick = () => {
      readTarget();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      cancelAnimationFrame(raf);
    };
  }, [reduce, r, steps]);

  const readout = (
    <ul className="kiosk-readout" aria-hidden="true">
      {JOINTS.map((j, i) => (
        <li key={j.id}>
          <span>
            {j.id} <em>{j.name}</em>
          </span>
          <output ref={(el) => (r.out[i] = el)}>0.0{j.unit}</output>
        </li>
      ))}
    </ul>
  );

  if (reduce) {
    return (
      <section className="kiosk kiosk-static" aria-label={label}>
        <div className="kiosk-stage">
          <Scene r={r} />
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
        <div className="kiosk-stage">
          <Scene r={r} />
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
          <span ref={(el) => (r.bar = el)} />
        </div>
      </div>

      {/* The same content as plain text for screen readers */}
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
