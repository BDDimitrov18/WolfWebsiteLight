"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The living survey — hero background.
 *
 * A triangulated terrain (deterministic value noise, so SSR/replay-safe)
 * rendered as wireframe lines with survey-station points, an ember
 * scan-line sweeping the ground like a LiDAR pass, and gentle camera
 * parallax on mouse. Everything fades into the ink fog.
 *
 * Budget rules:
 *  - DPR clamped (1.75 desktop / 1.5 mobile), geometry halved on mobile
 *  - rAF paused when offscreen or tab hidden
 *  - prefers-reduced-motion → renders exactly one static frame
 *  - no WebGL → bails silently (the SVG contours behind remain)
 */

// ---- Deterministic noise --------------------------------------------------

function hash2(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function smoothstep01(t: number): number {
  return t * t * (3 - 2 * t);
}

function valueNoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);
  const u = smoothstep01(xf);
  const v = smoothstep01(yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** Terrain height at world (x, z). Flat near the camera, ridges far away. */
function terrainHeight(x: number, z: number): number {
  let h = 0;
  let amp = 1;
  let freq = 0.055;
  for (let o = 0; o < 3; o++) {
    h += valueNoise(x * freq + 13.7, z * freq + 7.3) * amp;
    amp *= 0.5;
    freq *= 2.15;
  }
  // z runs 6 (near) → -58 (far): grow relief toward the horizon
  const depth = THREE.MathUtils.clamp((6 - z) / 64, 0, 1);
  return h * 7.5 * smoothstep01(depth) - 0.4;
}

// ---- Scene ----------------------------------------------------------------

const INK_FOG = 0x0e1422; // --color-ink-900
const LINE_COL = 0x3a465f; // --color-ink-500
const STATION_COL = 0xc9d2e4; // cool paper
const EMBER = 0xed9a57; // --color-ember-400
const PARCEL_COL = 0xd8c9b4; // warm survey-paper — parcels read as drawn on the map

/** Soft round sprite so points render as glows, not squares. */
function makePointTexture(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.5)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

export interface DocLabel {
  title: string;
  meta: string;
}

const DEFAULT_LABELS: DocLabel[] = [
  { title: "Проект № 2418", meta: "Имот 68134.905.211" },
  { title: "Проект № 2431", meta: "Имот 68134.902.77" },
];

/**
 * Small project card pinned to a parcel: project + number on top, the
 * plot it concerns at the bottom, sealed — how Wolf ties work to land.
 */
function makeDocTexture(label: DocLabel): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = 320;
  c.height = 240;
  const ctx = c.getContext("2d")!;
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") ctx.roundRect(6, 6, 308, 228, 24);
  else ctx.rect(6, 6, 308, 228);
  ctx.fillStyle = "rgba(11,16,27,0.86)";
  ctx.fill();
  ctx.strokeStyle = "rgba(237,154,87,0.55)";
  ctx.lineWidth = 4;
  ctx.stroke();
  // project + number
  ctx.fillStyle = "rgba(237,154,87,0.95)";
  ctx.font = '600 26px "IBM Plex Mono", monospace';
  ctx.fillText(label.title.toUpperCase(), 36, 70);
  // hairline
  ctx.fillStyle = "rgba(237,154,87,0.25)";
  ctx.fillRect(36, 90, 248, 2);
  // one abstract body line
  ctx.fillStyle = "rgba(160,172,196,0.35)";
  ctx.fillRect(36, 122, 172, 8);
  // the plot the project concerns, at the bottom
  ctx.fillStyle = "rgba(247,242,234,0.78)";
  ctx.font = '400 23px "IBM Plex Sans", sans-serif';
  ctx.fillText(label.meta, 36, 202);
  // ember seal with check
  ctx.beginPath();
  ctx.arc(268, 158, 20, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(237,154,87,0.85)";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(258, 158);
  ctx.lineTo(265, 165);
  ctx.lineTo(279, 150);
  ctx.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

// A cadastral parcel: jittered lattice cell with its centroid.
interface Parcel {
  corners: [number, number][]; // [x, z] in draw order
  cx: number;
  cz: number;
}

/** Irregular parcel block in the mid-foreground — deterministic like the terrain. */
function buildParcels(): Parcel[] {
  const xs = [-21, -12, -3, 7, 17];
  const zs = [-3, -11, -19, -27];
  const grid = zs.map((z, j) =>
    xs.map(
      (x, i) =>
        [
          x + (hash2(i * 3.1, j * 5.7) - 0.5) * 3.2,
          z + (hash2(i * 7.9, j * 2.3) - 0.5) * 3.0,
        ] as [number, number],
    ),
  );
  const parcels: Parcel[] = [];
  for (let j = 0; j < zs.length - 1; j++) {
    for (let i = 0; i < xs.length - 1; i++) {
      // drop a few cells so the block reads organic, not checkerboard
      if (hash2(i * 11.3, j * 17.7) < 0.22) continue;
      const corners = [grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]];
      const cx = corners.reduce((s, p) => s + p[0], 0) / 4;
      const cz = corners.reduce((s, p) => s + p[1], 0) / 4;
      parcels.push({ corners, cx, cz });
    }
  }
  return parcels;
}

/** Boundary of a parcel as line-segment pairs hugging the terrain. */
function parcelOutline(p: Parcel, lift: number): number[] {
  const out: number[] = [];
  for (let e = 0; e < 4; e++) {
    const [ax, az] = p.corners[e];
    const [bx, bz] = p.corners[(e + 1) % 4];
    const len = Math.hypot(bx - ax, bz - az);
    const steps = Math.max(2, Math.ceil(len / 1.1));
    for (let s = 0; s < steps; s++) {
      const t0 = s / steps;
      const t1 = (s + 1) / steps;
      const x0 = ax + (bx - ax) * t0;
      const z0 = az + (bz - az) * t0;
      const x1 = ax + (bx - ax) * t1;
      const z1 = az + (bz - az) * t1;
      out.push(x0, terrainHeight(x0, z0) + lift, z0);
      out.push(x1, terrainHeight(x1, z1) + lift, z1);
    }
  }
  return out;
}

export default function TerrainScene({
  className = "",
  docLabels,
}: {
  className?: string;
  docLabels?: DocLabel[];
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  // Labels flow in from the locale; the scene reads them via refs so a
  // language switch retextures the chips without rebuilding the scene.
  const labelsRef = useRef<DocLabel[] | undefined>(docLabels);
  const chipMatsRef = useRef<THREE.SpriteMaterial[]>([]);
  const appliedKeyRef = useRef("");

  const labelsKey = JSON.stringify(docLabels ?? []);
  useEffect(() => {
    labelsRef.current = docLabels;
    if (!chipMatsRef.current.length || labelsKey === appliedKeyRef.current) return;
    appliedKeyRef.current = labelsKey;
    chipMatsRef.current.forEach((mat, i) => {
      const label = labelsRef.current?.[i] ?? DEFAULT_LABELS[i];
      if (!label) return;
      const old = mat.map;
      mat.map = makeDocTexture(label);
      old?.dispose();
    });
  }, [docLabels, labelsKey]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      return; // no WebGL — SVG background stays
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 1.75));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(INK_FOG, 18, 62);

    const camera = new THREE.PerspectiveCamera(
      55,
      host.clientWidth / host.clientHeight,
      0.1,
      120,
    );
    camera.position.set(0, 5.4, 13);

    // ---- Terrain wireframe (triangulated) ----
    const W = 96;
    const D = 64;
    const SEG_X = mobile ? 56 : 104;
    const SEG_Z = mobile ? 36 : 68;
    const plane = new THREE.PlaneGeometry(W, D, SEG_X, SEG_Z);
    plane.rotateX(-Math.PI / 2);
    plane.translate(0, 0, 6 - D / 2); // near edge at z=6, far at z=-58

    const pos = plane.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, terrainHeight(x, z));
    }
    pos.needsUpdate = true;
    plane.computeVertexNormals();

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(plane),
      new THREE.LineBasicMaterial({
        color: LINE_COL,
        transparent: true,
        opacity: 0.30,
      }),
    );
    scene.add(wire);

    // ---- Survey stations: sparse points on the grid ----
    const pointTex = makePointTexture();
    const stationPositions: number[] = [];
    const emberPositions: number[] = [];
    for (let i = 0; i < pos.count; i++) {
      // deterministic sparse picks
      const r = hash2(i * 0.734, i * 0.271);
      if (r > 0.965) {
        stationPositions.push(pos.getX(i), pos.getY(i) + 0.05, pos.getZ(i));
        if (r > 0.9955) {
          emberPositions.push(pos.getX(i), pos.getY(i) + 0.12, pos.getZ(i));
        }
      }
    }
    const stationGeo = new THREE.BufferGeometry();
    stationGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(stationPositions, 3),
    );
    const stations = new THREE.Points(
      stationGeo,
      new THREE.PointsMaterial({
        color: STATION_COL,
        size: 0.28,
        map: pointTex,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    scene.add(stations);

    const emberGeo = new THREE.BufferGeometry();
    emberGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(emberPositions, 3),
    );
    const emberMat = new THREE.PointsMaterial({
      color: EMBER,
      size: 0.85,
      map: pointTex,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const emberPoints = new THREE.Points(emberGeo, emberMat);
    scene.add(emberPoints);

    // ---- Ember scan-line (LiDAR sweep) ----
    const SCAN_N = 140;
    const scanGeo = new THREE.BufferGeometry();
    scanGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(new Float32Array(SCAN_N * 3), 3),
    );
    const scanMat = new THREE.LineBasicMaterial({
      color: EMBER,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const scan = new THREE.Line(scanGeo, scanMat);
    scene.add(scan);

    // ---- Cadastral parcels: the land, subdivided ----
    const parcels = buildParcels();

    // Three parcels carry the product story: boundary lit, document attached.
    // Anchors match actual (jittered) centroids that project inside the
    // above-the-fold viewport: lower-left, right flank, bottom-center.
    const featuredAt: [number, number][] = mobile
      ? [[2, -15]]
      : [
          [-7, -14],
          [13, -22],
          [2, -15],
        ];
    // Chip world positions solved against the camera so they float low in
    // the frame's far corners, well clear of the hero copy (the canvas is
    // taller than the viewport — the whole hero section — so "low on
    // screen" means high in world y).
    const chipAnchors: [number, number, number][] = [
      [-6.59, 3.6, -6],
      [6.59, 3.6, -6],
    ];
    const featured = featuredAt
      .map((q) => {
        let best: Parcel | null = null;
        let bd = Infinity;
        for (const p of parcels) {
          const d = Math.hypot(p.cx - q[0], p.cz - q[1]);
          if (d < bd) {
            bd = d;
            best = p;
          }
        }
        return best;
      })
      .filter((p, i, arr): p is Parcel => !!p && arr.indexOf(p) === i);

    // Quiet parcels: one merged LineSegments draw
    const quietPos: number[] = [];
    for (const p of parcels) {
      if (featured.includes(p)) continue;
      quietPos.push(...parcelOutline(p, 0.07));
    }
    const quietGeo = new THREE.BufferGeometry();
    quietGeo.setAttribute("position", new THREE.Float32BufferAttribute(quietPos, 3));
    const quietMat = new THREE.LineBasicMaterial({
      color: PARCEL_COL,
      transparent: true,
      opacity: 0.2,
    });
    scene.add(new THREE.LineSegments(quietGeo, quietMat));

    // Featured parcels: own material (pulsed by the scan) + faint ember fill
    const chipsEnabled = !mobile;
    interface Marker {
      cx: number;
      lineMat: THREE.LineBasicMaterial;
      fillMat: THREE.MeshBasicMaterial;
      leaderMat: THREE.LineBasicMaterial | null;
      leaderGeo: THREE.BufferGeometry | null;
      sprite: THREE.Sprite | null;
      baseY: number;
      phase: number;
      pulse: number;
    }
    const markers: Marker[] = [];
    const featuredDisposables: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [];

    featured.forEach((p, idx) => {
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(parcelOutline(p, 0.09), 3),
      );
      const lineMat = new THREE.LineBasicMaterial({
        color: EMBER,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      scene.add(new THREE.LineSegments(lineGeo, lineMat));

      // fill: bilinear 4×4 patch over the quad, hugging the terrain
      const N = 4;
      const fillPos: number[] = [];
      const fillIdx: number[] = [];
      const [c0, c1, c2, c3] = p.corners;
      for (let j = 0; j <= N; j++) {
        for (let i = 0; i <= N; i++) {
          const u = i / N;
          const v = j / N;
          const x =
            (1 - u) * (1 - v) * c0[0] + u * (1 - v) * c1[0] + u * v * c2[0] + (1 - u) * v * c3[0];
          const z =
            (1 - u) * (1 - v) * c0[1] + u * (1 - v) * c1[1] + u * v * c2[1] + (1 - u) * v * c3[1];
          fillPos.push(x, terrainHeight(x, z) + 0.05, z);
        }
      }
      for (let j = 0; j < N; j++) {
        for (let i = 0; i < N; i++) {
          const a = j * (N + 1) + i;
          fillIdx.push(a, a + 1, a + N + 1, a + 1, a + N + 2, a + N + 1);
        }
      }
      const fillGeo = new THREE.BufferGeometry();
      fillGeo.setAttribute("position", new THREE.Float32BufferAttribute(fillPos, 3));
      fillGeo.setIndex(fillIdx);
      const fillMat = new THREE.MeshBasicMaterial({
        color: EMBER,
        transparent: true,
        opacity: 0.05,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      scene.add(new THREE.Mesh(fillGeo, fillMat));
      featuredDisposables.push(lineGeo, lineMat, fillGeo, fillMat);

      // Document chip on a slanted cartographic leader line (desktop only,
      // first two parcels only).
      let sprite: THREE.Sprite | null = null;
      let leaderMat: THREE.LineBasicMaterial | null = null;
      let leaderGeo: THREE.BufferGeometry | null = null;
      const groundY = terrainHeight(p.cx, p.cz);
      const [chipX, baseY, chipZ] = chipAnchors[idx] ?? [p.cx, groundY + 2, p.cz];
      if (chipsEnabled && idx < chipAnchors.length) {
        const label = labelsRef.current?.[idx] ?? DEFAULT_LABELS[idx] ?? DEFAULT_LABELS[0];
        const spriteMat = new THREE.SpriteMaterial({
          map: makeDocTexture(label),
          transparent: true,
          opacity: 0.62,
          depthWrite: false,
          fog: false, // keep the ember/ink colors true at depth
        });
        sprite = new THREE.Sprite(spriteMat);
        sprite.scale.set(2.1, 1.58, 1);
        sprite.position.set(chipX, baseY, chipZ);
        scene.add(sprite);
        chipMatsRef.current.push(spriteMat);

        leaderGeo = new THREE.BufferGeometry();
        leaderGeo.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(
            [p.cx, groundY + 0.1, p.cz, chipX, baseY - 0.9, chipZ],
            3,
          ),
        );
        leaderMat = new THREE.LineBasicMaterial({
          color: EMBER,
          transparent: true,
          opacity: 0.32,
          blending: THREE.AdditiveBlending,
        });
        scene.add(new THREE.Line(leaderGeo, leaderMat));
        featuredDisposables.push(spriteMat, leaderGeo, leaderMat);
      }

      markers.push({
        cx: p.cx,
        lineMat,
        fillMat,
        leaderMat,
        leaderGeo,
        sprite,
        baseY,
        phase: idx * 2.4,
        pulse: 0,
      });
    });
    appliedKeyRef.current = JSON.stringify(labelsRef.current ?? []);

    const updateScan = (t: number) => {
      // sweep x across the terrain every 11s, with a soft in/out
      const cycle = (t % 11) / 11;
      const x = THREE.MathUtils.lerp(-W / 2, W / 2, cycle);
      const sp = scanGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < SCAN_N; i++) {
        const z = THREE.MathUtils.lerp(6, -58, i / (SCAN_N - 1));
        sp.setXYZ(i, x, terrainHeight(x, z) + 0.06, z);
      }
      sp.needsUpdate = true;
      // fade in/out at the edges of the sweep
      const edge = Math.min(cycle, 1 - cycle);
      scanMat.opacity = THREE.MathUtils.clamp(edge * 10, 0, 1) * 0.5;

      // The pass "registers" featured parcels: boundary and fill flare as
      // the sweep crosses them, then settle back.
      const strength = scanMat.opacity / 0.5;
      for (const m of markers) {
        const target =
          THREE.MathUtils.clamp(1 - Math.abs(x - m.cx) / 4.5, 0, 1) * strength;
        m.pulse += (target - m.pulse) * 0.12; // ease so the flare decays softly
        m.lineMat.opacity = 0.5 + m.pulse * 0.45;
        m.fillMat.opacity = 0.05 + m.pulse * 0.1;
        if (m.leaderMat) m.leaderMat.opacity = 0.4 + m.pulse * 0.35;
      }
    };

    // ---- Mouse parallax ----
    const target = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduce && !mobile) window.addEventListener("mousemove", onMouse, { passive: true });

    // ---- Render loop with visibility gating ----
    let raf = 0;
    let running = false;
    let inView = true;
    let last = 0; // performance.now() of previous frame (0 = fresh start)
    let elapsed = 0;

    const renderFrame = () => {
      const now = performance.now();
      if (last !== 0) elapsed += Math.min((now - last) / 1000, 0.1);
      last = now;
      const t = elapsed;
      updateScan(t);
      // slow drift + parallax
      camera.position.x += (target.x * 1.6 - camera.position.x) * 0.03;
      camera.position.y +=
        (5.4 + Math.sin(t * 0.22) * 0.25 - target.y * 0.9 - camera.position.y) * 0.03;
      camera.lookAt(0, 1.2, -14);
      emberMat.opacity = 0.75 + Math.sin(t * 1.7) * 0.2;
      // document chips bob like the hero's floating UI chips;
      // their leader lines stay pinned to the card edge
      for (const m of markers) {
        if (!m.sprite) continue;
        m.sprite.position.y = m.baseY + Math.sin(t * 0.8 + m.phase) * 0.12;
        const s = 1 + m.pulse * 0.08;
        m.sprite.scale.set(2.1 * s, 1.58 * s, 1);
        (m.sprite.material as THREE.SpriteMaterial).opacity = 0.62 + m.pulse * 0.28;
        if (m.leaderGeo) {
          const lp = m.leaderGeo.attributes.position as THREE.BufferAttribute;
          lp.setY(1, m.sprite.position.y - 0.9 * s);
          lp.needsUpdate = true;
        }
      }
      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!running) return;
      renderFrame();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      last = 0; // don't count paused time as a giant delta
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduce) {
      // one composed frame, no motion
      updateScan(4.6);
      renderer.render(scene, camera);
    } else {
      start();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !document.hidden) start();
        else stop();
      },
      { threshold: 0.02 },
    );
    io.observe(host);

    const onVis = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };
    document.addEventListener("visibilitychange", onVis);

    const onResize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (reduce) renderer.render(scene, camera);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      plane.dispose();
      wire.geometry.dispose();
      (wire.material as THREE.Material).dispose();
      stationGeo.dispose();
      (stations.material as THREE.Material).dispose();
      emberGeo.dispose();
      emberMat.dispose();
      scanGeo.dispose();
      scanMat.dispose();
      quietGeo.dispose();
      quietMat.dispose();
      for (const d of featuredDisposables) d.dispose();
      for (const mat of chipMatsRef.current) mat.map?.dispose();
      chipMatsRef.current = [];
      pointTex.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full ${className}`}
    />
  );
}
