import React, { useEffect, useRef } from 'react';

/**
 * NeuralTransmission — Immersive close-up synaptic background.
 *
 * Designed to look like you're INSIDE brain tissue, not looking at it from far away.
 * Reference: biological microscopy neural close-up with:
 *   - Giant soma cell bodies dominating the screen (60–150px radius)
 *   - Thick organic axon tubes (6–18px) with gradient cylinder rendering
 *   - Dense web of fine dendritic hairlines filling background
 *   - Bright explosive synaptic action potential pulses
 *   - Slow camera drift + subtle zoom
 */
export default function NeuralTransmission() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let W, H;

    const setSize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Seeded RNG
    let s = 9001;
    const rng = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };

    // ── cubic bezier helpers ──────────────────────────────────────────────
    const cbx = (p0, p1, p2, p3, t) => {
      const u = 1 - t;
      return u*u*u*p0 + 3*u*u*t*p1 + 3*u*t*t*p2 + t*t*t*p3;
    };

    // ── Build neurons ─────────────────────────────────────────────────────
    // Only 6–8 neurons, but HUGE — filling the viewport like a close-up shot
    const N = 7;
    const neurons = [];

    const buildAxon = (ox, oy, angle, len, wobble) => {
      const cp1x = ox + Math.cos(angle + rng() * wobble - wobble/2) * len * 0.35;
      const cp1y = oy + Math.sin(angle + rng() * wobble - wobble/2) * len * 0.35;
      const cp2x = ox + Math.cos(angle + rng() * wobble - wobble/2) * len * 0.7;
      const cp2y = oy + Math.sin(angle + rng() * wobble - wobble/2) * len * 0.7;
      const ex = ox + Math.cos(angle) * len + (rng()-0.5)*len*0.4;
      const ey = oy + Math.sin(angle) * len + (rng()-0.5)*len*0.4;
      return { ox, oy, cp1x, cp1y, cp2x, cp2y, ex, ey };
    };

    for (let i = 0; i < N; i++) {
      // Spread neurons across a large virtual space (bigger than viewport for off-screen branches)
      const x = W * 0.1 + rng() * W * 0.85;
      const y = H * 0.1 + rng() * H * 0.85;
      const z = 0.4 + rng() * 0.6;            // depth: 1=close, 0=far
      const soma = (65 + rng() * 85) * z;      // BIG soma radius
      const arms = 5 + Math.floor(rng() * 4);  // 5–8 arms

      const axons = [];
      for (let a = 0; a < arms; a++) {
        const angle = (a / arms) * Math.PI * 2 + rng() * 0.5;
        const len = (W * 0.18 + rng() * W * 0.28) * z;
        const thickness = (6 + rng() * 12) * z;
        const ax = buildAxon(x, y, angle, len, 1.4);

        // 2–4 secondary branches off this axon
        const secondaries = [];
        const ns = 2 + Math.floor(rng() * 3);
        for (let b = 0; b < ns; b++) {
          const t = 0.25 + rng() * 0.55;
          const bx = cbx(ax.ox, ax.cp1x, ax.cp2x, ax.ex, t);
          const by = cbx(ax.oy, ax.cp1y, ax.cp2y, ax.ey, t);
          const bAngle = angle + (rng()-0.5) * Math.PI * 0.9;
          const bLen = len * (0.3 + rng() * 0.5);
          secondaries.push({
            ax: buildAxon(bx, by, bAngle, bLen, 1.6),
            t, thickness: (2 + rng() * 5) * z,
          });
        }

        axons.push({
          ax, thickness, secondaries,
          pulse: { t: rng(), speed: 0.0025 + rng() * 0.004, active: rng() > 0.35 },
        });
      }

      // Fine hairline threads (100–200 of them per neuron for the "biological web" look)
      const hairs = [];
      const nhairs = 80 + Math.floor(rng() * 120);
      for (let h = 0; h < nhairs; h++) {
        const angle = rng() * Math.PI * 2;
        const len = (W * 0.04 + rng() * W * 0.18) * z;
        const bend = (rng() - 0.5) * 2.5;
        hairs.push({ angle, len, bend, alpha: 0.05 + rng() * 0.12, w: (0.4 + rng() * 0.8) * z });
      }

      neurons.push({ x, y, z, soma, axons, hairs, fire: 0, fireMax: 1, vx: (rng()-0.5)*0.08, vy: (rng()-0.5)*0.06 });
    }

    // ── Draw thick axon tube (gradient edge to simulate cylinder) ─────────
    const drawTube = (ax, thickness, baseAlpha, fired) => {
      const steps = 8;
      for (let s = 0; s < steps; s++) {
        const frac = s / (steps - 1);  // 0 = edge, 1 = center
        const w = thickness * (1 - frac * 0.7);
        const a = baseAlpha * (0.1 + frac * 0.9) * (1 + fired * 0.5);
        const r = fired > 0.3 ? `rgba(200,240,255,${a})` : `rgba(6,182,212,${a})`;

        ctx.beginPath();
        ctx.moveTo(ax.ox, ax.oy);
        ctx.bezierCurveTo(ax.cp1x, ax.cp1y, ax.cp2x, ax.cp2y, ax.ex, ax.ey);
        ctx.strokeStyle = r;
        ctx.lineWidth = w;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }
    };

    // ── Draw action potential spark ────────────────────────────────────────
    const drawSpark = (ax, t, size) => {
      const px = cbx(ax.ox, ax.cp1x, ax.cp2x, ax.ex, t);
      const py = cbx(ax.oy, ax.cp1y, ax.cp2y, ax.ey, t);

      // Large outer glow
      const g = ctx.createRadialGradient(px, py, 0, px, py, size * 10);
      g.addColorStop(0,   'rgba(255,255,255,1)');
      g.addColorStop(0.08,'rgba(200,240,255,0.9)');
      g.addColorStop(0.25,'rgba(6,182,212,0.5)');
      g.addColorStop(0.5, 'rgba(59,130,246,0.15)');
      g.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(px, py, size * 10, 0, Math.PI * 2);
      ctx.fill();

      // Bright core
      ctx.fillStyle = 'rgba(255,255,255,1)';
      ctx.beginPath();
      ctx.arc(px, py, size * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Trailing streak toward direction of travel
      const prevT = Math.max(0, t - 0.07);
      const ppx = cbx(ax.ox, ax.cp1x, ax.cp2x, ax.ex, prevT);
      const ppy = cbx(ax.oy, ax.cp1y, ax.cp2y, ax.ey, prevT);
      const gStreak = ctx.createLinearGradient(ppx, ppy, px, py);
      gStreak.addColorStop(0, 'rgba(255,255,255,0)');
      gStreak.addColorStop(1, 'rgba(255,255,255,0.7)');
      ctx.beginPath();
      ctx.moveTo(ppx, ppy);
      ctx.lineTo(px, py);
      ctx.strokeStyle = gStreak;
      ctx.lineWidth = size * 2;
      ctx.lineCap = 'round';
      ctx.stroke();
    };

    // ── Draw soma cell body ───────────────────────────────────────────────
    const drawSoma = (x, y, r, z, fired) => {
      const fi = Math.max(0, fired);

      // Big bloom when firing
      if (fi > 0.05) {
        const bloom = ctx.createRadialGradient(x, y, 0, x, y, r * (3 + fi * 6));
        bloom.addColorStop(0,   `rgba(255,255,255,${fi * 0.95})`);
        bloom.addColorStop(0.15,`rgba(6,182,212,${fi * 0.7})`);
        bloom.addColorStop(0.4, `rgba(59,130,246,${fi * 0.3})`);
        bloom.addColorStop(0.75,`rgba(30,60,120,${fi * 0.08})`);
        bloom.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = bloom;
        ctx.beginPath();
        ctx.arc(x, y, r * (3 + fi * 6), 0, Math.PI * 2);
        ctx.fill();
      }

      // Soma star shape (spiky cell body)
      const spikes = 7 + Math.floor(z * 4);
      const outerR = r;
      const innerR = r * 0.5;
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const ang = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
        const rad = (i % 2 === 0) ? outerR : innerR;
        const px = x + Math.cos(ang) * rad;
        const py = y + Math.sin(ang) * rad;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();

      const alpha = 0.35 + z * 0.55;
      const cellGrd = ctx.createRadialGradient(x - r*0.25, y - r*0.25, 0, x, y, outerR);
      if (fi > 0.4) {
        cellGrd.addColorStop(0, `rgba(255,255,255,${alpha})`);
        cellGrd.addColorStop(0.35, `rgba(120,220,255,${alpha * 0.9})`);
        cellGrd.addColorStop(0.7, `rgba(6,182,212,${alpha * 0.7})`);
        cellGrd.addColorStop(1, `rgba(10,30,60,${alpha * 0.5})`);
      } else {
        cellGrd.addColorStop(0, `rgba(50,160,220,${alpha * 0.9})`);
        cellGrd.addColorStop(0.45, `rgba(20,80,140,${alpha * 0.8})`);
        cellGrd.addColorStop(0.8, `rgba(8,25,55,${alpha * 0.7})`);
        cellGrd.addColorStop(1, `rgba(4,12,30,${alpha * 0.6})`);
      }
      ctx.fillStyle = cellGrd;
      ctx.fill();

      // Soma border highlight
      ctx.strokeStyle = `rgba(6,182,212,${(0.3 + z*0.5) * (1 + fi)})`;
      ctx.lineWidth = (1.5 + z * 2) * (1 + fi * 0.5);
      ctx.stroke();
    };

    // ── Render loop ───────────────────────────────────────────────────────
    let frame = 0;

    const render = () => {
      frame++;

      // Dark background — very dark navy, NOT pitch black
      ctx.fillStyle = 'rgba(3, 8, 20, 0.88)';
      ctx.fillRect(0, 0, W, H);

      // Warm deep ambient (subtle)
      const amb = ctx.createRadialGradient(W*0.5, H*0.5, 0, W*0.5, H*0.5, W * 0.75);
      amb.addColorStop(0, 'rgba(5,25,55,0.18)');
      amb.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = amb;
      ctx.fillRect(0, 0, W, H);

      // Sort back-to-front
      const sorted = [...neurons].sort((a, b) => a.z - b.z);

      for (const n of sorted) {
        // Slow organic drift
        n.x += n.vx;
        n.y += n.vy;
        // Bounce within extended bounds
        if (n.x < -W * 0.3 || n.x > W * 1.3) n.vx *= -1;
        if (n.y < -H * 0.3 || n.y > H * 1.3) n.vy *= -1;

        const { x, y, z, soma } = n;
        const fired = n.fire / Math.max(1, n.fireMax);
        const da = 0.2 + z * 0.7; // depth alpha

        // 1. Hairlines first (background texture)
        for (const h of n.hairs) {
          const ex = x + Math.cos(h.angle) * h.len;
          const ey = y + Math.sin(h.angle) * h.len;
          const cpx = x + Math.cos(h.angle + h.bend * 0.3) * h.len * 0.5;
          const cpy = y + Math.sin(h.angle + h.bend * 0.3) * h.len * 0.5;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.quadraticCurveTo(cpx, cpy, ex, ey);
          ctx.strokeStyle = `rgba(6,182,212,${h.alpha * da * (1 + fired * 0.7)})`;
          ctx.lineWidth = h.w;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // 2. Secondary branches
        for (const axData of n.axons) {
          for (const sec of axData.secondaries) {
            // Recompute secondary start from parent bezier
            const bx = cbx(axData.ax.ox, axData.ax.cp1x, axData.ax.cp2x, axData.ax.ex, sec.t);
            const by = cbx(axData.ax.oy, axData.ax.cp1y, axData.ax.cp2y, axData.ax.ey, sec.t);
            const sax = { ...sec.ax, ox: bx, oy: by };
            drawTube(sax, sec.thickness, da * 0.45, fired * 0.3);
          }
        }

        // 3. Primary axons + pulses
        for (const axData of n.axons) {
          drawTube(axData.ax, axData.thickness, da * 0.65, fired * 0.4);

          const p = axData.pulse;
          if (p.active) {
            p.t += p.speed;
            if (p.t >= 1) {
              p.t = 0;
              p.active = Math.random() > 0.25;
              // Chain fire: trigger another neuron
              if (Math.random() > 0.45) {
                const others = neurons.filter(o => o !== n);
                const pick = others[Math.floor(Math.random() * others.length)];
                if (pick && pick.fire <= 0) {
                  pick.fire = 50 + Math.floor(Math.random() * 25);
                  pick.fireMax = pick.fire;
                }
              }
            }
            if (p.active) drawSpark(axData.ax, p.t, (3 + axData.thickness * 0.4) * z);
          } else if (Math.random() > 0.998) {
            p.active = true; p.t = 0;
          }
        }

        // 4. Soma
        drawSoma(x, y, soma, z, fired);

        // 5. Fire tick
        if (n.fire > 0) {
          n.fire--;
          if (n.fire === n.fireMax - 3) {
            for (const ax of n.axons) { ax.pulse.active = true; ax.pulse.t = 0; }
          }
        } else if (Math.random() > 0.9988) {
          n.fire = 40 + Math.floor(Math.random() * 35);
          n.fireMax = n.fire;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setSize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position:'fixed', inset:0, width:'100%', height:'100%', zIndex:0, pointerEvents:'none', display:'block' }}
      aria-hidden="true"
    />
  );
}
