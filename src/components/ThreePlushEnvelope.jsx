import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreePlushEnvelope.css';

// ── Superformula Mathematical Curves & Height Fields ──
const ak = (e, t) => Math.pow(Math.pow(Math.abs(e / 1.78), 6) + Math.pow(Math.abs(t / 1.22), 6), 1 / 6);
const aW = (e, t) => (1 - ak(e, t)) / Math.max(1e-4, Math.hypot((ak(e + 0.001, t) - ak(e - 0.001, t)) / 0.002, (ak(e, t + 0.001) - ak(e, t - 0.001)) / 0.002));
const aX = (e) => Math.sqrt(1 - (1 - Math.min(1, Math.max(0, e / 0.36))) ** 2);

function aj(e, t, [i, n], [r, a], [s, o]) {
  const l = r - i, h = a - n, c = s - r, u = o - a, d = i - s, p = n - o;
  const f = e - i, m = t - n, g = e - r, _ = t - a, v = e - s, x = t - o;
  const M = (val) => Math.min(1, Math.max(0, val));
  const S = M((f * l + m * h) / (l * l + h * h));
  const y = M((g * c + _ * u) / (c * c + u * u));
  const E = M((v * d + x * p) / (d * d + p * p));
  const T = f - l * S, b = m - h * S, A = g - c * y, w = _ - u * y, R = v - d * E, C = x - p * E;
  const P = Math.sign(l * p - h * d);
  const L = [T * T + b * b, P * (f * h - m * l)];
  const N = [A * A + w * w, P * (g * u - _ * c)];
  const U = [R * R + C * C, P * (v * p - x * d)];
  return -Math.sqrt(Math.min(L[0], N[0], U[0])) * Math.sign(Math.min(L[1], N[1], U[1]));
}

const aq = [[-2.225, 1.586], [2.225, 1.586], [0, -0.18 + 0.34]];
const aY = [[-2.403, -1.586], [0, 0.62], [2.403, -1.586]];
const aZ = (e, t) => 1 - (1 - Math.min(1, Math.max(0, -e / t))) ** 3;
const aK = (e, t) => aj(e, t, ...aq) - 0.34;
const aJ = (e, t) => aj(e, t, ...aY) - 0.3;
const a$ = -0.18 + 0.27;

function aQ(e, t, i = true) {
  const n = aW(e, t);
  const r = aZ(aK(e, t), 0.15);
  const a = aZ(aJ(e, t), 0.11);
  const s = 0.035 * (1 - Math.min(1, ak(e, t)) ** 2);
  return aX(n) * (0.36 + s + (i ? 0.11 * r : 0) + 0.05 * a * (1 - r));
}

function a1(e, t, i = false) {
  const n = aK(e, t), r = aJ(e, t);
  let a = 1;
  return i
    ? (a -= n < 0 ? 0.4 : 0.4 * Math.exp(-n / 0.1), r > 0 && n > 0 && (a -= 0.16 * Math.exp(-r / 0.08)), Math.max(0.45, a))
    : (n > 0 && (a -= 0.32 * Math.exp(-n / 0.1)), r > 0 && n > 0 && (a -= 0.16 * Math.exp(-r / 0.08)), Math.max(0.45, a -= 0.3 * Math.exp(-Math.max(0, Math.hypot(e, (t - a$) * 1.15) - 0.22) / 0.09)));
}

const a3 = (e, t) => -aX(aW(e, t)) * (0.34 + 0.035 * (1 - Math.min(1, ak(e, t)) ** 2));

// ── Procedural Face Generator ──
const NUM_RINGS = 70;
const NUM_PTS = 240;

function buildFace(fn, sign, isFront = false) {
  const pos = [], norm = [], col = [], idx = [];
  const l = [];
  const totalPerim = [0];
  const P_STEPS = 3000;
  for (let i = 0; i <= P_STEPS; i++) {
    const rad = (i / P_STEPS) * Math.PI * 2;
    const cos = Math.cos(rad), sin = Math.sin(rad);
    const pt = [
      1.78 * Math.sign(cos) * Math.abs(cos) ** (1 / 3),
      1.22 * Math.sign(sin) * Math.abs(sin) ** (1 / 3)
    ];
    l.push(pt);
    if (i > 0) totalPerim.push(totalPerim[i - 1] + Math.hypot(pt[0] - l[i - 1][0], pt[1] - l[i - 1][1]));
  }
  const perimPts = [];
  const totalLen = totalPerim[P_STEPS];
  for (let r = 0, a = 0; r < NUM_PTS; r++) {
    const target = (r / NUM_PTS) * totalLen;
    while (totalPerim[a + 1] < target) a++;
    const ratio = (target - totalPerim[a]) / (totalPerim[a + 1] - totalPerim[a] || 1);
    perimPts.push([
      l[a][0] + (l[a + 1][0] - l[a][0]) * ratio,
      l[a][1] + (l[a + 1][1] - l[a][1]) * ratio
    ]);
  }

  const addVertex = (s, o) => {
    const h = fn(s, o);
    const nx = -((fn(s + 0.002, o) - fn(s - 0.002, o)) / 0.004) * sign;
    const ny = -((fn(s, o + 0.002) - fn(s, o - 0.002)) / 0.004) * sign;
    const len = Math.hypot(nx, ny, 1);
    pos.push(s, o, h);
    norm.push((nx / len) * sign, (ny / len) * sign, (1 / len) * sign);
    const c = sign > 0 ? a1(s, o, isFront) : 1;
    col.push(c, c, c);
  };

  addVertex(0, 0);
  for (let e = 1; e <= NUM_RINGS; e++) {
    const t = 1 - (1 - e / NUM_RINGS) ** 1.6;
    for (let p = 0; p < NUM_PTS; p++) {
      addVertex(perimPts[p][0] * t, perimPts[p][1] * t);
    }
  }

  const getIdx = (e, t) => e === 0 ? 0 : 1 + (e - 1) * NUM_PTS + (t % NUM_PTS);
  for (let e = 0; e < NUM_PTS; e++) {
    idx.push(0, getIdx(1, e), getIdx(1, e + 1));
  }
  for (let e = 1; e < NUM_RINGS; e++) {
    for (let t = 0; t < NUM_PTS; t++) {
      const i = getIdx(e, t), n = getIdx(e, t + 1), r = getIdx(e + 1, t), a = getIdx(e + 1, t + 1);
      idx.push(i, r, n, n, r, a);
    }
  }

  if (sign < 0) {
    for (let e = 0; e < idx.length; e += 3) {
      const tmp = idx[e + 1];
      idx[e + 1] = idx[e + 2];
      idx[e + 2] = tmp;
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geom.setAttribute('normal', new THREE.Float32BufferAttribute(norm, 3));
  geom.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  geom.setIndex(idx);
  return geom;
}

// ── Hooke's Law Damped Harmonic Oscillator ──
const spring = (pos, vel, target, k, d, dt) => {
  const acc = -k * (pos - target) - d * vel;
  vel += acc * dt;
  pos += vel * dt;
  return [pos, vel];
};

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

export default function ThreePlushEnvelope({ onClick }) {
  const onClickRef = useRef(onClick);
  useEffect(() => {
    onClickRef.current = onClick;
  });
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const slotRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const button = containerRef.current;
    const slot = slotRef.current;
    if (!canvas || !button) return;

    // 1. Setup Three.js WebGL Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Scene and Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 120 / 96, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // 3. Lighting (Molten Praetor Highlights & Warm Key)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff0ea, 2.2);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xff1e27, 2.4, 15);
    rimLight.position.set(-5, -4, 4);
    scene.add(rimLight);

    const goldAccent = new THREE.PointLight(0xffaa00, 1.8, 12);
    goldAccent.position.set(4, -3, 3);
    scene.add(goldAccent);

    // 4. Construct Superformula Plush Mesh Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const envelopeGroup = new THREE.Group();
    rootGroup.add(envelopeGroup);

    const envelopeMesh = new THREE.Group();

    // Material: Crimson Praetor Velvet / Molten Polymer
    const envelopeMat = new THREE.MeshPhysicalMaterial({
      color: 0xdd121a,
      roughness: 0.32,
      metalness: 0.08,
      clearcoat: 0.38,
      clearcoatRoughness: 0.22,
      sheen: 1.0,
      sheenRoughness: 0.45,
      sheenColor: 0xff3b44,
    });

    // Material: Pure White/Cream Wax Heart
    const sealMat = new THREE.MeshPhysicalMaterial({
      color: 0xfffcfd,
      roughness: 0.18,
      metalness: 0.04,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1,
    });

    const frontGeom = buildFace(aQ, 1, true);
    const backGeom = buildFace(a3, -1, false);

    const frontMesh = new THREE.Mesh(frontGeom, envelopeMat);
    const backMesh = new THREE.Mesh(backGeom, envelopeMat);
    frontMesh.castShadow = true;
    frontMesh.receiveShadow = true;
    backMesh.castShadow = true;
    backMesh.receiveShadow = true;

    envelopeMesh.add(frontMesh);
    envelopeMesh.add(backMesh);

    // Heart Badge Wax Seal
    const badgeShape = new THREE.Shape();
    badgeShape.moveTo(0, 0.08);
    badgeShape.bezierCurveTo(0, 0.18, 0.2, 0.28, 0.2, 0.08);
    badgeShape.bezierCurveTo(0.2, -0.08, 0.05, -0.16, 0, -0.24);
    badgeShape.bezierCurveTo(-0.05, -0.16, -0.2, -0.08, -0.2, 0.08);
    badgeShape.bezierCurveTo(-0.2, 0.28, 0, 0.18, 0, 0.08);

    const badgeGeom = new THREE.ExtrudeGeometry(badgeShape, {
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.13,
      bevelSize: 0.1,
      bevelSegments: 14,
      curveSegments: 36,
    });
    badgeGeom.translate(0, 0, -0.01);
    badgeGeom.computeVertexNormals();

    const badgeMesh = new THREE.Mesh(badgeGeom, sealMat);
    badgeMesh.position.set(0, a$, aQ(0, a$) + 0.06);
    badgeMesh.castShadow = true;
    badgeMesh.receiveShadow = true;
    envelopeMesh.add(badgeMesh);

    // Initial 3D isometric tilt
    envelopeMesh.rotation.set(0.12, -0.34, 0.03);
    envelopeGroup.add(envelopeMesh);

    // 5. Resize and Canvas Dimensions
    let scale = 56;
    let width = 96;
    let height = 76;

    const handleResize = () => {
      const isSmall = window.innerWidth <= 860;
      const vp = Math.min(1.15, Math.max(0.65, window.innerWidth / 1280));
      scale = (isSmall ? 40 : 64) * vp;
      width = scale / 0.61;
      height = 0.8 * width;

      button.style.width = `${width}px`;
      button.style.height = `${height}px`;
      if (slot) {
        slot.style.width = `${1.08 * scale}px`;
        slot.style.height = `${Math.max(5, 0.05 * scale)}px`;
      }

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 6. Authentic Physics Simulation State
    const TWO_PI = Math.PI * 2;
    const sim = {
      t: 0,
      last: performance.now(),
      scroll: window.scrollY,
      vel: 0,
      idleFor: 0,
      still: 0,
      lean: 0,
      leanV: 0,
      fx: 0,
      fy: 0,
      fxV: 0,
      fyV: 0,
      tiltX: 0,
      tiltY: 0,
      tiltXV: 0,
      tiltYV: 0,
      wigT: 9,
      cuteT: 9,
      nextCute: 3,
      ptr: null,
      postT: -1,
      postAt: [0, 0],
      mailed: false,
      hopT: -1,
      hopAcc: 0,
      hopDir: 1,
      lastX: window.innerWidth - 80,
      lastY: window.innerHeight - 80,
    };

    const onPointerMove = (e) => {
      sim.still = 0;
      sim.nextCute = sim.still + 3.5;
      sim.ptr = [e.clientX, e.clientY];
    };

    const onPointerLeave = () => {
      sim.ptr = null;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);

    const onScroll = () => {
      sim.still = 0;
      sim.nextCute = sim.still + 3.5;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // 7. Interactive Click Dispatch Animation into Slot
    const handleClick = (e) => {
      e.preventDefault();
      if (sim.postT >= 0) return;
      sim.postT = 0;
      sim.postAt = [sim.lastX, sim.lastY];
      sim.mailed = false;
      sim.wigT = 9;
      sim.cuteT = 9;
    };

    button.addEventListener('click', handleClick);

    // 8. Physics Animation Loop (60/120fps)
    let rafId;
    const animate = (now) => {
      rafId = requestAnimationFrame(animate);
      const dt = Math.min(0.05, (now - sim.last) / 1000);
      sim.last = now;
      sim.t += dt;

      // Scroll delta & velocity tracking
      const currentScroll = window.scrollY;
      const scrollDelta = currentScroll - sim.scroll;
      sim.scroll = currentScroll;
      sim.vel += ((dt ? scrollDelta / dt : 0) - sim.vel) * Math.min(1, 10 * dt);

      // Hop trigger: every ~55% of viewport height scrolled
      sim.hopAcc += scrollDelta;
      if (Math.abs(sim.hopAcc) > window.innerHeight * 0.55 && sim.hopT < 0 && sim.postT < 0) {
        sim.hopT = 0;
        sim.hopDir = Math.sign(sim.hopAcc);
        sim.hopAcc = 0;
      }

      if (Math.abs(scrollDelta) > 0.5) {
        sim.idleFor = 0;
        sim.still = 0;
      } else {
        sim.idleFor += dt;
        sim.still += dt;
      }

      // Base anchor strictly in the bottom-right corner
      const isMobile = window.innerWidth <= 860;
      const marginX = isMobile ? 14 : 26;
      const marginY = isMobile ? 16 : 24;
      const baseX = window.innerWidth - width / 2 - marginX;
      const baseY = window.innerHeight - height / 2 - marginY;

      // Entrance from below: hidden off-screen below viewport on hero (scrollY < 40).
      const scrollTrigger = Math.max(0, currentScroll - 40);
      const enterProgress = Math.min(1, scrollTrigger / 220);
      const easedEnter = 1 - Math.pow(1 - enterProgress, 3);
      const offscreenDist = window.innerHeight - baseY + height + 60;

      let posX = baseX;
      let posY = baseY + (1 - easedEnter) * offscreenDist;
      let rotX = 0;
      let rotY = 0;
      let rotZ = 0;
      let scaleY = 1;

      // Idle breathing float
      posY += 5 * Math.sin((sim.t * TWO_PI) / 3.4);

      // Scroll lean inertia
      [sim.lean, sim.leanV] = spring(sim.lean, sim.leanV, clamp(-(0.00025 * sim.vel), -0.4, 0.4), 65, 7.5, dt);
      rotZ = sim.lean + 0.05 * Math.sin((sim.t * TWO_PI) / 5.2);
      rotY = 0.12 * Math.sin((sim.t * TWO_PI) / 6.8);

      // Pointer attraction & 3D tilt
      let attractX = 0;
      let attractY = 0;
      if (sim.ptr && sim.postT < 0) {
        const dx = sim.ptr[0] - posX;
        const dy = sim.ptr[1] - posY;
        const radius = 220;
        attractX = dx / (Math.abs(dx) + radius);
        attractY = dy / (Math.abs(dy) + radius);
      }

      [sim.fx, sim.fxV] = spring(sim.fx, sim.fxV, attractX, 60, 11, dt);
      [sim.fy, sim.fyV] = spring(sim.fy, sim.fyV, attractY, 60, 11, dt);
      posX += 28 * sim.fx;
      posY += 20 * sim.fy;
      rotZ -= 0.08 * sim.fx;

      [sim.tiltX, sim.tiltXV] = spring(sim.tiltX, sim.tiltXV, 0.35 * attractY, 90, 12, dt);
      [sim.tiltY, sim.tiltYV] = spring(sim.tiltY, sim.tiltYV, -0.35 * attractX, 90, 12, dt);
      rotX += sim.tiltX;
      rotY += sim.tiltY;

      // Cute periodic wobble
      if (sim.postT < 0 && sim.still > sim.nextCute) {
        sim.cuteT = 0;
        sim.nextCute = sim.still + 4.5;
      }

      if (sim.cuteT < 1.3) {
        const r = sim.cuteT;
        rotZ += 0.16 * Math.exp(-3.6 * r) * Math.sin(5 * TWO_PI * r);
        scaleY = 1 - 0.1 * Math.exp(-10 * r);
        sim.cuteT += dt;
      }

      // Scroll hop: squash, leap, tumble, land
      if (sim.hopT >= 0) {
        const e = sim.hopT / 0.72;
        if (e < 0.14) {
          scaleY *= 1 - 0.16 * Math.sin((Math.PI * e) / 0.14);
        } else if (e < 0.86) {
          const t = (e - 0.14) / 0.72;
          posY -= 1.1 * height * Math.sin(Math.PI * t);
          scaleY *= 1 + 0.12 * Math.cos(Math.PI * t) * (t < 0.5 ? 1 : 0.4);
          rotZ += -0.3 * sim.hopDir * Math.sin(TWO_PI * t);
          rotX += 0.25 * sim.hopDir * Math.sin(Math.PI * t);
        }
        sim.hopT += dt;
        if (sim.hopT > 0.72) {
          sim.hopT = -1;
          sim.wigT = 9;
          sim.cuteT = 0;
        }
      }

      // Click Post into slot animation
      if (sim.postT >= 0) {
        const t = sim.postT;
        const [startX, startY] = sim.postAt;
        const slotY = startY + 0.62 * scale;
        let lift = 0;
        let pSquash = 1;
        let pTilt = -1.2;

        if (t < 0.12) {
          pSquash = 1 - 0.15 * Math.sin((Math.PI / 2 * t) / 0.12);
          pTilt = 0;
        } else if (t < 0.42) {
          const r = (t - 0.12) / 0.3;
          lift = -0.45 * scale * (1 - (1 - r) ** 2);
          pSquash = 0.85 + 0.25 * (1 - (1 - r) ** 2);
          pTilt = -1.2 * (r < 0.5 ? 4 * r * r * r : 1 - (-2 * r + 2) ** 3 / 2);
        } else if (t < 0.76) {
          const r = (t - 0.42) / 0.34;
          lift = -0.45 * scale + 1.75 * scale * r * r;
          pSquash = 1.1 - 0.1 * r;
        } else if (t < 1.46) {
          lift = 1.3 * scale;
        } else {
          sim.postT = -1;
          button.style.clipPath = '';
          if (slot) slot.style.opacity = '0';
        }

        if (sim.postT >= 0) {
          posX = startX;
          posY = startY + lift;
          rotX = pTilt;
          rotY = 0;
          rotZ = 0;
          scaleY = pSquash;

          const clipDist = posY + height / 2 - slotY;
          button.style.clipPath = clipDist > 0 ? `inset(0 0 ${clipDist}px 0)` : '';

          if (slot) {
            slot.style.transform = `translate3d(${startX - 0.54 * scale}px, ${slotY - slot.offsetHeight / 2}px, 0)`;
            slot.style.opacity = '1';
          }

          if (!sim.mailed && t >= 0.7) {
            sim.mailed = true;
            if (onClickRef.current) onClickRef.current();
          }

          sim.postT += dt;
        }
      }

      // Volume-preserving scale
      const scaleX = 1 / Math.sqrt(scaleY);

      sim.lastX = posX;
      sim.lastY = posY;

      // Check if Contact area (Act 4 or /contact page) is currently visible or if any modal is open
      let inContactArea = window.location.pathname === '/contact';
      const commElem = document.getElementById('comm');
      if (commElem) {
        const rect = commElem.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
          inContactArea = true;
        }
      }
      if (document.querySelector('.spec-modal-backdrop, .contact-modal-backdrop')) {
        inContactArea = true;
      }

      button.style.transform = `translate3d(${posX - width / 2}px, ${posY - height / 2}px, 0)`;
      const isVisible = !inContactArea && enterProgress > 0.02;
      button.style.opacity = isVisible ? '1' : '0';
      button.style.pointerEvents = (isVisible && enterProgress >= 0.7) ? 'auto' : 'none';

      rootGroup.rotation.set(rotX, rotY, rotZ);
      rootGroup.scale.set(scaleX, scaleY, scaleX);

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
      button.removeEventListener('click', handleClick);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <button
        ref={containerRef}
        type="button"
        className="pf-3d-button"
        aria-label="Send direct dispatch to Aneesh"
        title="Send a direct dispatch to Aneesh"
      >
        <canvas ref={canvasRef} aria-hidden="true" />
      </button>
      <span ref={slotRef} className="pf-slot" aria-hidden="true" />
    </>
  );
}
