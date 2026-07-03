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

export default function TerrainScene({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

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
