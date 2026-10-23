import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/* ------------------------------------------------------------------
   The CAD is in millimetres. kiosk.glb is in metres, centred on the
   kiosk (x, z) with the floor at y = 0. mm() converts CAD coordinates.
------------------------------------------------------------------- */
const mm = (x, y, z) =>
  new THREE.Vector3((x - 1435) / 1000, (y - 1130) / 1000, (z - 2593) / 1000);
const mmY = (y) => (y - 1130) / 1000;

/* Joint positions measured from your STEP file (CAD mm) */
const J1 = mm(1434, 2214, 3116); // base yaw axis (vertical) + shoulder pivot
const J3 = mm(1434, 2497, 3057); // elbow pivot
const J5 = mm(1434, 2196, 2960); // wrist pivot
const J6 = mm(1439, 2098, 2881); // tool flange (bottom face centre)
const BASE_MM = { x: 1434, z: 3116 };

/* Planar arm geometry derived from the joints (u = outward, v = up) */
const E = J6.x - J1.x;
const uv = (P) => [J1.z - P.z, P.y - J1.y];
const [j3u, j3v] = uv(J3);
const [j5u, j5v] = uv(J5);
const [tipU, tipV] = uv(J6);
const L1 = Math.hypot(j3u, j3v);
const L2 = Math.hypot(j5u - j3u, j5v - j3v);
const TOOL_U = tipU - j5u;
const TOOL_V = tipV - j5v;
const REST1 = Math.atan2(j3v, j3u);
const REST2 = Math.atan2(j5v - j3v, j5u - j3u);

/* ------------------------------------------------------------------
   LAYOUT (CAD mm). Matches the real kiosk: cup holder at the bottom
   left, ice machine at the bottom right, and the front machine in
   front of the arm where the finished drink is placed.
   These positions are estimates from your photo. Edit them to match
   the real machine. Keep every cup position within ~450 mm of the arm
   base (1434, 3116).
------------------------------------------------------------------- */
const DECK_Y = 1936;

const HOLDER = { x: 1160, z: 3010 }; // where the arm picks up a cup
const TUBES = [
  { x: 1048, z: 2968 },
  { x: 994, z: 3043 },
]; // the two clear cup tubes (behind the pickup spot)
const HOLDER_BASE = { x: 1080, z: 3005, w: 300, d: 200, h: 80 };
const TRAY_TOP = DECK_Y + HOLDER_BASE.h + 4;

const ICE = { x: 1765, z: 3060 }; // cup position under the ice spout
const ICE_BODY = { x0: 1830, x1: 2310, z0: 2860, z1: 3340, h: 700 };
const ICE_SPOUT = {
  x0: 1700,
  x1: 1830,
  z0: 3000,
  z1: 3120,
  y0: 2330,
  y1: 2540,
};
const ICE_NOZZLE_Y = 2290;

const FRONT = { x: 1434, z: 3400 }; // cup position on the front machine
const FRONT_BODY = { w: 220, d: 200, h: 180 };
const PAD_TOP = DECK_Y + FRONT_BODY.h + 8;
const FRONT_NOZZLE_Y = 2386;

/* TV (not in the CAD): back wall, upper left, facing the viewer. Metres. */
const TV = { x: -0.85, y: 1.85, z: -1.1, w: 0.8, h: 0.45 };

/* Drink colour (the chai poured at the front machine) */
const DRINK_COLOR = 0xc07a3a;

/* Cup and clamp sizes (metres) */
const CUP_H = 0.105;
const R_TOP = 0.04;
const R_BOT = 0.028;
const CLAMP = 0.095; // clamp holds the cup this far outward of the tool
const DROP = 0.012; // cup rim sits this far below the tool flange

const RIM_HOLDER = TRAY_TOP + CUP_H * 1000;
const RIM_FRONT = PAD_TOP + CUP_H * 1000;
const RIM_ICE = 2200;
const HOME = { x: 1439, z: 2786 }; // cup point when the arm is in its CAD rest pose

/* Motion plan. Each row: scroll position, place, cup rim height (mm), clamp open (1) or closed (0).
   Between rows the arm moves with a smooth "minimum jerk" curve and sweeps around its base. */
const PLAN = [
  [0.0, HOME, 2086, 1],
  [0.08, HOLDER, RIM_HOLDER + 130, 1], // swing over the cup
  [0.13, HOLDER, RIM_HOLDER, 1], // lower
  [0.17, HOLDER, RIM_HOLDER, 0], // clamp closes
  [0.21, HOLDER, RIM_HOLDER + 130, 0], // lift
  [0.34, ICE, RIM_ICE, 0], // under the ice spout
  [0.52, ICE, RIM_ICE, 0], // ice drops (0.36 to 0.50)
  [0.64, FRONT, RIM_FRONT + 90, 0], // carry to the front machine
  [0.68, FRONT, RIM_FRONT, 0], // lower
  [0.72, FRONT, RIM_FRONT, 1], // clamp opens, cup stays
  [0.76, FRONT, RIM_FRONT + 90, 1], // lift away
  [0.9, HOME, 2086, 1], // back to rest
  [1.0, HOME, 2086, 1],
];
const GRAB = 0.17;
const RELEASE = 0.72;
const ICE_FALL = [0.36, 0.5];
const POUR = [0.74, 0.88];
const SWEEP_LIFT = 0.03; // extra height (m) in the middle of long sweeps

const KEYS = (() => {
  let prev = null;
  return PLAN.map(([p, S, y, g]) => {
    const dx = S.x - BASE_MM.x;
    const dz = S.z - BASE_MM.z;
    let psi = Math.atan2(dz, dx);
    if (prev !== null) {
      while (psi - prev > Math.PI) psi -= 2 * Math.PI;
      while (psi - prev < -Math.PI) psi += 2 * Math.PI;
    }
    prev = psi;
    return { p, psi, r: Math.hypot(dx, dz) / 1000, y: mmY(y), g };
  });
})();

/* Camera path (metres). Smooth spline through these shots. */
const CAM = [
  { p: 0, pos: [0, 1.55, 7.0], look: [0, 1.35, 0] },
  { p: 0.1, pos: [-0.9, 1.45, 3.2], look: [-0.25, 1.0, 0.4] },
  { p: 0.3, pos: [-0.2, 1.5, 3.4], look: [0.0, 1.05, 0.45] },
  { p: 0.44, pos: [1.0, 1.45, 3.1], look: [0.35, 1.05, 0.45] },
  { p: 0.62, pos: [0.3, 1.55, 3.3], look: [0.05, 1.0, 0.6] },
  { p: 0.78, pos: [0.0, 1.5, 3.0], look: [0.0, 1.0, 0.7] },
  { p: 0.92, pos: [0, 1.55, 5.2], look: [0, 1.3, 0.2] },
  { p: 1, pos: [0, 1.55, 7.0], look: [0, 1.35, 0] },
].map((k) => ({
  p: k.p,
  pos: new THREE.Vector3(...k.pos),
  look: new THREE.Vector3(...k.look),
}));

/* ------------------------------------------------------------------
   Colours. Rules are tested top to bottom against each part's name
   in kiosk.glb; the first match wins.
------------------------------------------------------------------- */
const HIDE = "hide";
const WHITE = { color: 0xf4f4f2, roughness: 0.28, metalness: 0.05 };
const BLACK = { color: 0x0b0b0c, roughness: 0.3, metalness: 0.3 };
const CHARCOAL = { color: 0x1a1b1e, roughness: 0.5, metalness: 0.25 };
const WALL = { color: 0x0e0f11, roughness: 0.6, metalness: 0.2 };
const DECK = { color: 0x1c1d20, roughness: 0.55, metalness: 0.2 };
const GREY = { color: 0xbcbec1, roughness: 0.45, metalness: 0.2 };
const BRUSHED = { color: 0xc9ccd0, roughness: 0.38, metalness: 0.7, env: 0.7 };
const SMOKED = { color: 0x0b0c0e, roughness: 0.2, metalness: 0, opacity: 0.55 };
const CLEAR = { color: 0xdfe9ee, roughness: 0.05, metalness: 0, opacity: 0.06 };
const RULES = [
  [/dispenser|Turn|Funnel|Enclosure|Enlosure|Exhaust/i, HIDE], // not in the real kiosk
  [/^arm_gripper/, CHARCOAL],
  [/^arm_/, WHITE],
  [/Back_cover_panel/i, WALL],
  [/cover_panel/i, SMOKED],
  [/Acrylic/i, CLEAR],
  [/front_bottom_extrude/i, BRUSHED],
  [/Front_bottom|Inner_Radius/i, BLACK],
  [/Front_top|Outer_Radius|Top_Frame|outer_Pipes/i, WHITE],
  [/Middle_Frame/i, GREY],
  [/Bottom_Frame|Bottom_inner/i, CHARCOAL],
  [/Middle_cover|Perforated/i, DECK],
  [/Door/i, CHARCOAL],
];
const FALLBACK = { color: 0x8b9096, roughness: 0.45, metalness: 0.45 };

export const JOINTS = [
  { id: "J1", name: "Base", unit: "°" },
  { id: "J2", name: "Shoulder", unit: "°" },
  { id: "J3", name: "Elbow", unit: "°" },
  { id: "J4", name: "Wrist", unit: "°" },
  { id: "J5", name: "Tool roll", unit: "°" },
  { id: "J6", name: "Clamp", unit: "%" },
];

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const lerp = (a, b, t) => a + (b - a) * t;
const minJerk = (u) => u * u * u * (u * (u * 6 - 15) + 10);

export const stepAt = (p, steps) => {
  let idx = 0;
  steps.forEach((s, i) => {
    if (p >= s.at) idx = i;
  });
  return idx;
};

function segIndex(keys, p) {
  let i = 0;
  while (i < keys.length - 2 && p > keys[i + 1].p) i++;
  return i;
}

/* Cup position at scroll p: sweeps around the arm base with a smooth start and stop */
function pathAt(p) {
  const i = segIndex(KEYS, p);
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const t = minJerk(clamp((p - a.p) / (b.p - a.p), 0, 1));
  const psi = lerp(a.psi, b.psi, t);
  const r = lerp(a.r, b.r, t);
  let y = lerp(a.y, b.y, t);
  if (Math.abs(b.psi - a.psi) > 0.35) y += SWEEP_LIFT * Math.sin(Math.PI * t);
  return { psi, r, y, g: lerp(a.g, b.g, t) };
}

/* Inverse kinematics for the real arm: base yaw, then a two-link planar arm
   (shoulder + elbow); the wrist angle keeps the tool pointing straight down. */
export function solve(p) {
  const k = pathAt(p);
  const uCup = Math.sqrt(Math.max(k.r * k.r - E * E, 0));
  const uTip = uCup - CLAMP;
  const theta = Math.atan2(-uCup, E) - k.psi;
  const wu = uTip - TOOL_U;
  const wv = k.y + DROP - J1.y - TOOL_V;
  const d = clamp(
    Math.hypot(wu, wv),
    Math.abs(L1 - L2) + 0.001,
    L1 + L2 - 0.001,
  );
  const gam = Math.atan2(wv, wu);
  const al = Math.acos(
    clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1),
  );
  const e1 = gam + al; // elbow up
  const ex = L1 * Math.cos(e1);
  const ey = L1 * Math.sin(e1);
  const a1 = e1 - REST1;
  const a12 =
    Math.atan2(d * Math.sin(gam) - ey, d * Math.cos(gam) - ex) - REST2;
  return {
    theta,
    a1,
    a2: a12 - a1,
    a3: -a12,
    g: k.g,
    reach: Math.hypot(wu, wv),
  };
}

/* Smooth camera: Catmull-Rom (cubic Hermite) through the shots */
const _m1 = new THREE.Vector3();
const _m2 = new THREE.Vector3();
function splineAt(keys, p, field, out) {
  const i = segIndex(keys, p);
  const k0 = keys[Math.max(i - 1, 0)];
  const k1 = keys[i];
  const k2 = keys[i + 1];
  const k3 = keys[Math.min(i + 2, keys.length - 1)];
  const h = k2.p - k1.p;
  const u = clamp((p - k1.p) / h, 0, 1);
  _m1
    .copy(k2[field])
    .sub(k0[field])
    .multiplyScalar(h / (k2.p - k0.p));
  _m2
    .copy(k3[field])
    .sub(k1[field])
    .multiplyScalar(h / (k3.p - k1.p));
  const u2 = u * u;
  const u3 = u2 * u;
  out.set(0, 0, 0);
  out.addScaledVector(k1[field], 2 * u3 - 3 * u2 + 1);
  out.addScaledVector(_m1, u3 - 2 * u2 + u);
  out.addScaledVector(k2[field], -2 * u3 + 3 * u2);
  out.addScaledVector(_m2, u3 - u2);
  return out;
}

/* ---------------- small canvas textures ---------------- */
const font = (w, s) =>
  `${w} ${s}px system-ui, -apple-system, "Segoe UI", sans-serif`;
function canvasTex(w, h, draw) {
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  const c = cv.getContext("2d");
  draw(c, w, h);
  const tex = new THREE.CanvasTexture(cv);
  if ("colorSpace" in tex) tex.colorSpace = THREE.SRGBColorSpace;
  else tex.encoding = THREE.sRGBEncoding;
  tex.anisotropy = 4;
  return tex;
}

function makeTv(steps) {
  const W = 1024;
  const H = 576;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const c = cv.getContext("2d");
  const tex = new THREE.CanvasTexture(cv);
  if ("colorSpace" in tex) tex.colorSpace = THREE.SRGBColorSpace;
  else tex.encoding = THREE.sRGBEncoding;
  let last = "";
  const paint = (p, idx) => {
    const key = `${idx}-${Math.round(p * 60)}`;
    if (key === last) return;
    last = key;
    const grd = c.createLinearGradient(0, 0, W, H);
    grd.addColorStop(0, "#0b1a63");
    grd.addColorStop(1, "#1a2f94");
    c.fillStyle = grd;
    c.fillRect(0, 0, W, H);
    c.fillStyle = "rgba(255,255,255,0.08)";
    c.beginPath();
    c.arc(W * 0.5, H * 0.38, 190, 0, Math.PI * 2);
    c.fill();
    c.textAlign = "left";
    c.fillStyle = "rgba(255,255,255,0.75)";
    c.font = font(600, 24);
    c.fillText("OMI LIVE", 48, 62);
    c.textAlign = "center";
    c.fillStyle = "#ffffff";
    c.font = font(700, 96);
    c.fillText("CHAIOMI", W / 2, 250);
    c.fillStyle = "rgba(255,255,255,0.8)";
    c.font = font(500, 32);
    c.fillText("It knows you.", W / 2, 305);
    const s = steps[idx] || {};
    c.fillStyle = "#ffb27a";
    c.font = font(600, 40);
    c.fillText(s.status || "", W / 2, 420);
    c.fillStyle = "rgba(255,255,255,0.2)";
    c.fillRect(120, 470, W - 240, 12);
    c.fillStyle = "#ffb27a";
    c.fillRect(120, 470, (W - 240) * p, 12);
    tex.needsUpdate = true;
  };
  return { tex, paint };
}

export async function createKioskScene(
  canvas,
  { modelUrl = "/models/kiosk.glb", steps = [], onProgress } = {},
) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  let gltf;
  try {
    gltf = await loader.loadAsync(modelUrl, (e) => {
      if (onProgress && e.total) onProgress(e.loaded / e.total);
    });
  } catch (err) {
    renderer.dispose();
    throw err;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  if ("environmentIntensity" in scene) scene.environmentIntensity = 0.35;
  scene.add(new THREE.AmbientLight(0xffffff, 0.2));
  const key = new THREE.DirectionalLight(0xffffff, 0.75);
  key.position.set(2.5, 6, 7);
  scene.add(key);
  // warm ceiling light over the work area
  const spot = new THREE.SpotLight(0xffe2b8, 30, 0, 0.95, 0.6, 2);
  spot.position.set(0, 2.2, 0.45);
  spot.target.position.set(0, 0.8, 0.5);
  spot.castShadow = true;
  spot.shadow.mapSize.set(1024, 1024);
  spot.shadow.bias = -0.0004;
  spot.shadow.normalBias = 0.01;
  spot.shadow.radius = 4;
  scene.add(spot, spot.target);

  scene.add(gltf.scene);

  /* ---- recolour every part by name; hide parts the real kiosk does not have ---- */
  const matCache = new Map();
  const matFor = (spec) => {
    if (!matCache.has(spec)) {
      const m = new THREE.MeshStandardMaterial({
        color: spec.color,
        roughness: spec.roughness,
        metalness: spec.metalness,
        envMapIntensity: spec.env ?? 0.35,
      });
      if (spec.opacity !== undefined) {
        m.transparent = true;
        m.opacity = spec.opacity;
        m.depthWrite = false;
        m.side = THREE.DoubleSide;
      }
      matCache.set(spec, m);
    }
    return matCache.get(spec);
  };
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    const rule = RULES.find(([re]) => re.test(o.name));
    const spec = rule ? rule[1] : FALLBACK;
    if (spec === HIDE) {
      o.visible = false;
      return;
    }
    o.material = matFor(spec);
    if (/^arm_/.test(o.name)) o.castShadow = true;
    if (/Middle_cover|Perforated/i.test(o.name)) o.receiveShadow = true;
  });

  /* ---- build the arm rig from the real parts ---- */
  const yawG = new THREE.Group();
  yawG.position.copy(J1);
  const j2G = new THREE.Group();
  const j3G = new THREE.Group();
  j3G.position.copy(J3).sub(J1);
  const j5G = new THREE.Group();
  j5G.position.copy(J5).sub(J3);
  const j6G = new THREE.Group();
  j6G.position.copy(J6).sub(J5);
  scene.add(yawG);
  yawG.add(j2G);
  j2G.add(j3G);
  j3G.add(j5G);
  j5G.add(j6G);
  scene.updateMatrixWorld(true);

  const need = (name) => {
    const o = gltf.scene.getObjectByName(name);
    if (!o) throw new Error(`kiosk.glb is missing part "${name}"`);
    return o;
  };
  yawG.attach(need("arm_shoulder2"));
  j2G.attach(need("arm_upper"));
  j3G.attach(need("arm_elbow"));
  j3G.attach(need("arm_wrist1"));
  j5G.attach(need("arm_wrist2"));
  j6G.attach(need("arm_gripper"));

  /* ---- helpers ---- */
  const std = (color, o = {}) =>
    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.45,
      metalness: 0.25,
      ...o,
    });
  const mesh = (geo, m, parent, x = 0, y = 0, z = 0) => {
    const o = new THREE.Mesh(geo, m);
    o.position.set(x, y, z);
    parent.add(o);
    return o;
  };
  const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
  /* a box given by CAD mm extents */
  const mmBox = (x0, x1, y0, y1, z0, z1, m, parent = scene) => {
    const c = mm((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    const o = mesh(
      box((x1 - x0) / 1000, (y1 - y0) / 1000, (z1 - z0) / 1000),
      m,
      parent,
      c.x,
      c.y,
      c.z,
    );
    o.castShadow = true;
    o.receiveShadow = true;
    return o;
  };

  const black = std(0x0b0b0c, { roughness: 0.3, metalness: 0.3 });
  const dark = std(0x1a1b1e, { roughness: 0.45, metalness: 0.3 });
  const white = std(0xf4f4f2, { roughness: 0.28, metalness: 0.05 });
  const silver = std(0xc3c6cb, {
    roughness: 0.38,
    metalness: 0.65,
    envMapIntensity: 0.7,
  });
  const acrylic = std(0xdfe9ee, {
    transparent: true,
    opacity: 0.12,
    roughness: 0.05,
    metalness: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  /* ---- clamp that holds the cup beside the tool (procedural) ---- */
  mesh(box(0.012, 0.042, 0.012), dark, j6G, 0, -0.021, 0);
  mesh(box(0.012, 0.008, CLAMP), dark, j6G, 0, -0.042, -CLAMP / 2);
  const ringG = new THREE.Group();
  ringG.position.set(0, -0.042, -CLAMP);
  j6G.add(ringG);
  mesh(
    new THREE.CylinderGeometry(0.0395, 0.0395, 0.012, 28, 1, true),
    std(0x1a1b1e, { side: THREE.DoubleSide }),
    ringG,
  );

  /* ---- bottom left: cup holder ---- */
  mmBox(
    HOLDER_BASE.x - HOLDER_BASE.w / 2,
    HOLDER_BASE.x + HOLDER_BASE.w / 2,
    DECK_Y,
    DECK_Y + HOLDER_BASE.h,
    HOLDER_BASE.z - HOLDER_BASE.d / 2,
    HOLDER_BASE.z + HOLDER_BASE.d / 2,
    black,
  );
  const trayP = mm(HOLDER.x, TRAY_TOP - 2, HOLDER.z);
  mesh(
    new THREE.CylinderGeometry(0.058, 0.058, 0.004, 32),
    std(0x2a2c30, { roughness: 0.3 }),
    scene,
    trayP.x,
    trayP.y,
    trayP.z,
  );
  const stackParts = [];
  for (let i = 0; i < 14; i++)
    stackParts.push(
      new THREE.CylinderGeometry(0.04, 0.03, 0.03, 24, 1, true).translate(
        0,
        0.045 + i * 0.027,
        0,
      ),
    );
  const merge =
    BufferGeometryUtils.mergeGeometries ||
    BufferGeometryUtils.mergeBufferGeometries;
  const stackGeo = merge(stackParts);
  const stackMat = std(0xf6f6f6, {
    roughness: 0.3,
    metalness: 0,
    side: THREE.DoubleSide,
  });
  const tubeGeo = new THREE.CylinderGeometry(
    0.046,
    0.046,
    0.55,
    28,
    1,
    true,
  ).translate(0, 0.275, 0);
  TUBES.forEach((t) => {
    const p = mm(t.x, HOLDER_BASE.h + DECK_Y, t.z);
    mesh(stackGeo, stackMat, scene, p.x, p.y, p.z);
    mesh(tubeGeo, acrylic, scene, p.x, p.y, p.z);
    mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.012, 28),
      dark,
      scene,
      p.x,
      p.y + 0.006,
      p.z,
    );
  });

  /* ---- bottom right: ice machine (silver body, black spout unit, vent grill) ---- */
  mmBox(
    ICE_BODY.x0,
    ICE_BODY.x1,
    DECK_Y,
    DECK_Y + ICE_BODY.h,
    ICE_BODY.z0,
    ICE_BODY.z1,
    silver,
  );
  mmBox(
    ICE_BODY.x0 - 4,
    ICE_BODY.x1 - 90,
    DECK_Y + ICE_BODY.h - 260,
    DECK_Y + ICE_BODY.h + 4,
    ICE_BODY.z0 + 30,
    ICE_BODY.z1 - 30,
    black,
  );
  mmBox(
    ICE_SPOUT.x0,
    ICE_SPOUT.x1,
    ICE_SPOUT.y0,
    ICE_SPOUT.y1,
    ICE_SPOUT.z0,
    ICE_SPOUT.z1,
    black,
  );
  const noz = mm(ICE.x, (ICE_SPOUT.y0 + ICE_NOZZLE_Y) / 2, ICE.z);
  mesh(
    new THREE.CylinderGeometry(
      0.014,
      0.008,
      (ICE_SPOUT.y0 - ICE_NOZZLE_Y) / 1000,
      16,
    ),
    silver,
    scene,
    noz.x,
    noz.y,
    noz.z,
  );
  const grillTex = canvasTex(256, 256, (c, w, h) => {
    c.fillStyle = "#b9bcc1";
    c.fillRect(0, 0, w, h);
    c.fillStyle = "#4a4d52";
    for (let y = 14; y < h - 10; y += 14) c.fillRect(16, y, w - 32, 5);
  });
  const grill = mesh(
    new THREE.PlaneGeometry(0.19, 0.17),
    new THREE.MeshStandardMaterial({
      map: grillTex,
      roughness: 0.5,
      metalness: 0.4,
      envMapIntensity: 0.4,
    }),
    scene,
  );
  grill.position.copy(mm(2200, DECK_Y + 130, ICE_BODY.z1 + 1));
  const iceTop = mm(0, DECK_Y + ICE_BODY.h, 0).y;
  void iceTop;

  /* ---- front machine: white body, black screen, small spout for the drink ---- */
  const FB = FRONT_BODY;
  mmBox(
    FRONT.x - FB.w / 2,
    FRONT.x + FB.w / 2,
    DECK_Y,
    DECK_Y + FB.h,
    FRONT.z - FB.d / 2,
    FRONT.z + FB.d / 2,
    white,
  );
  const screenTex = canvasTex(256, 160, (c, w, h) => {
    c.fillStyle = "#050506";
    c.fillRect(0, 0, w, h);
    c.fillStyle = "rgba(255,255,255,0.75)";
    c.font = font(600, 26);
    c.textAlign = "center";
    c.fillText("PICK UP", w / 2, h / 2 + 9);
  });
  const fScreen = mesh(
    new THREE.PlaneGeometry(0.16, 0.1),
    new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false }),
    scene,
  );
  fScreen.position.copy(mm(FRONT.x, DECK_Y + 95, FRONT.z + FB.d / 2 + 1));
  const padC = mm(FRONT.x, PAD_TOP - 4, FRONT.z);
  const padMat = std(0xe8e8e8, {
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 0.05,
    roughness: 0.4,
  });
  mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.008, 32),
    padMat,
    scene,
    padC.x,
    padC.y,
    padC.z,
  );
  const nozPost = mm(FRONT.x, 0, FRONT.z + 90);
  const barY = mmY(DECK_Y + FB.h + 300);
  mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 0.3, 16),
    black,
    scene,
    nozPost.x,
    mmY(DECK_Y + FB.h + 150),
    nozPost.z,
  );
  mesh(
    box(0.02, 0.02, 0.1),
    black,
    scene,
    nozPost.x,
    barY,
    mm(0, 0, FRONT.z + 45).z,
  );
  const nozF = mm(FRONT.x, 0, FRONT.z);
  const frontNozTop = mmY(FRONT_NOZZLE_Y);
  mesh(
    new THREE.CylinderGeometry(0.012, 0.006, 0.03, 16),
    black,
    scene,
    nozF.x,
    barY - 0.02,
    nozF.z,
  );

  /* ---- cup, ice and drink ---- */
  const cup = new THREE.Group();
  scene.add(cup);
  const glassMat = std(0xffffff, {
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide,
    roughness: 0.15,
    metalness: 0,
    depthWrite: false,
  });
  const shell = mesh(
    new THREE.CylinderGeometry(R_TOP, R_BOT, CUP_H, 32, 1, true).translate(
      0,
      -CUP_H / 2,
      0,
    ),
    glassMat,
    cup,
  );
  shell.renderOrder = 3;
  mesh(
    new THREE.CircleGeometry(R_BOT, 32)
      .rotateX(-Math.PI / 2)
      .translate(0, -CUP_H, 0),
    glassMat,
    cup,
  ).renderOrder = 3;
  const liquid = mesh(
    new THREE.CylinderGeometry(0.0265, 0.0265, 1, 28).translate(0, 0.5, 0),
    std(DRINK_COLOR, {
      metalness: 0,
      roughness: 0.25,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    }),
    cup,
    0,
    -CUP_H + 0.003,
    0,
  );
  liquid.renderOrder = 2;
  const LIQ_MAX = 0.072;

  const iceMat = std(0xe8f6ff, {
    metalness: 0,
    roughness: 0.08,
    transparent: true,
    opacity: 0.82,
  });
  const cubeGeo = box(0.019, 0.019, 0.019);
  const cubes = [];
  for (let i = 0; i < 12; i++) {
    const layer = Math.floor(i / 4);
    const ang = (i % 4) * (Math.PI / 2) + layer * 0.7;
    const rad = 0.011 + (i % 2) * 0.004;
    const c = mesh(
      cubeGeo,
      iceMat,
      cup,
      Math.cos(ang) * rad,
      0,
      Math.sin(ang) * rad,
    );
    c.rotation.set(i * 0.7, i * 1.3, i * 0.4);
    c.visible = false;
    c.userData.rest = -CUP_H + 0.014 + layer * 0.021;
    c.userData.t0 = ICE_FALL[0] + i * ((ICE_FALL[1] - ICE_FALL[0] - 0.04) / 11);
    cubes.push(c);
  }
  const iceStartY = mmY(ICE_NOZZLE_Y) - mmY(RIM_ICE); // nozzle height above the cup rim

  const streamMat = std(DRINK_COLOR, { metalness: 0, roughness: 0.25 });
  const streamGeo = new THREE.CylinderGeometry(0.0035, 0.0035, 1, 8).translate(
    0,
    -0.5,
    0,
  );
  const stream = mesh(streamGeo, streamMat, scene, nozF.x, frontNozTop, nozF.z);
  stream.visible = false;

  const standPos = mm(HOLDER.x, RIM_HOLDER, HOLDER.z);
  const padPos = mm(FRONT.x, RIM_FRONT, FRONT.z);
  cup.traverse((o) => (o.castShadow = false));

  /* ---- TV on the back wall, facing the viewer ---- */
  const tvG = new THREE.Group();
  tvG.position.set(TV.x, TV.y, TV.z);
  scene.add(tvG);
  mesh(
    box(TV.w, TV.h, 0.03),
    std(0x050506, { metalness: 0.4, roughness: 0.4 }),
    tvG,
  );
  const tv = makeTv(steps);
  mesh(
    new THREE.PlaneGeometry(TV.w - 0.03, TV.h - 0.03),
    new THREE.MeshBasicMaterial({ map: tv.tex, toneMapped: false }),
    tvG,
    0,
    0,
    0.0155,
  );
  mesh(box(0.18, 0.1, 0.03), std(0x050506), tvG, 0, 0, -0.03);

  /* ---- CHAIOMI lettering on the glass (right side, vertical) ---- */
  const logoTex = canvasTex(256, 1024, (c, w, h) => {
    c.clearRect(0, 0, w, h);
    c.save();
    c.translate(w / 2, h / 2);
    c.rotate(Math.PI / 2);
    c.fillStyle = "#ffffff";
    c.font = font(700, 190);
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("CHAIOMI", 0, 0);
    c.restore();
  });
  mesh(
    new THREE.PlaneGeometry(0.3, 1.2),
    new THREE.MeshBasicMaterial({
      map: logoTex,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      toneMapped: false,
    }),
    scene,
    1.03,
    1.55,
    1.146,
  );

  /* ---- ceiling lights: warm neon outline and white strips (as in the photo) ---- */
  const neon = new THREE.MeshBasicMaterial({
    color: 0xffb43c,
    toneMapped: false,
  });
  const strip = new THREE.MeshBasicMaterial({
    color: 0xeaf6ff,
    toneMapped: false,
  });
  const lamp = (m, w, d, x, y, z) => mesh(box(w, 0.008, d), m, scene, x, y, z);
  lamp(neon, 0.8, 0.014, 0.2, 2.27, -0.1);
  lamp(neon, 0.8, 0.014, 0.2, 2.27, 0.35);
  lamp(neon, 0.014, 0.45, -0.2, 2.27, 0.125);
  lamp(neon, 0.014, 0.45, 0.6, 2.27, 0.125);
  lamp(strip, 0.9, 0.012, -0.1, 2.12, -1.0);
  lamp(strip, 0.9, 0.012, 0.8, 1.7, -1.0);

  /* ---- soft contact shadow on the ground ---- */
  const shadowTex = canvasTex(256, 256, (c, w, h) => {
    const g = c.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(0,0,0,0.65)");
    g.addColorStop(0.6, "rgba(0,0,0,0.35)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
  });
  mesh(
    new THREE.PlaneGeometry(4.6, 3.8).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    }),
    scene,
    0,
    -0.004,
    0,
  );

  /* ---- per-frame update ---- */
  const tmp = new THREE.Vector3();
  const lookAt = new THREE.Vector3();
  const D = 180 / Math.PI;

  function draw(p) {
    const s = solve(p);
    yawG.rotation.y = s.theta;
    j2G.rotation.x = s.a1;
    j3G.rotation.x = s.a2;
    j5G.rotation.x = s.a3;
    ringG.scale.setScalar(1 + 0.15 * s.g);
    scene.updateMatrixWorld(true);

    if (p >= GRAB && p < RELEASE) {
      tmp.set(0, -DROP, -CLAMP);
      j6G.localToWorld(tmp);
      cup.position.copy(tmp);
    } else {
      cup.position.copy(p < GRAB ? standPos : padPos);
    }

    // ice cubes fall from the spout into the cup
    cubes.forEach((c) => {
      const t = clamp((p - c.userData.t0) / 0.04, 0, 1);
      c.visible = t > 0;
      c.position.y = lerp(iceStartY, c.userData.rest, t * t);
    });

    // drink pours at the front machine
    const f = clamp((p - POUR[0]) / (POUR[1] - POUR[0]), 0, 1);
    liquid.visible = f > 0;
    liquid.scale.y = Math.max(f * LIQ_MAX, 0.0001);
    const pouring = p > POUR[0] - 0.01 && p < POUR[1] + 0.01;
    stream.visible = pouring;
    if (pouring) {
      const surface = cup.position.y - CUP_H + 0.003 + f * LIQ_MAX;
      stream.scale.y = Math.max(barY - 0.035 - surface, 0.01);
      stream.position.y = barY - 0.035;
    }
    padMat.emissiveIntensity =
      0.05 +
      0.5 *
        clamp((p - RELEASE) / 0.05, 0, 1) *
        (1 - clamp((p - 0.9) / 0.08, 0, 1));

    splineAt(CAM, p, "pos", camera.position);
    splineAt(CAM, p, "look", lookAt);
    const zoomOut = Math.max(1, 1.35 / camera.aspect); // keep the kiosk in frame on tall screens
    camera.position.sub(lookAt).multiplyScalar(zoomOut).add(lookAt);
    camera.lookAt(lookAt);

    const idx = stepAt(p, steps);
    tv.paint(p, idx);
    renderer.render(scene, camera);

    return [s.theta * D, s.a1 * D, s.a2 * D, s.a3 * D, 0, s.g * 100];
  }

  function resize(w, h) {
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function dispose() {
    scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material)
        [].concat(o.material).forEach((m) => {
          if (m.map) m.map.dispose();
          m.dispose();
        });
    });
    envTex.dispose();
    pmrem.dispose();
    renderer.dispose();
  }

  return { draw, resize, dispose };
}
