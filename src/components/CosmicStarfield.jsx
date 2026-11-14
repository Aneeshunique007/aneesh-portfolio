import React, { useEffect, useRef } from 'react';
import './CosmicStarfield.css';

export default function CosmicStarfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // 420 stars with organic balanced drift across 360° space
    const stars = Array.from({ length: 420 }, () => ({
      x: (Math.random() - 0.5) * w * 2.2,
      y: (Math.random() - 0.5) * h * 2.2,
      z: Math.random() * 0.95 + 0.05,
      size: Math.random() * 1.6 + 0.3,
      baseBrightness: Math.random() * 0.7 + 0.3,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: Math.random() * 0.03 + 0.015,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      hue: Math.random() < 0.22 ? 'red' : Math.random() < 0.14 ? 'cyan' : 'white',
    }));

    // 130 argent embers & cosmic dust
    const particles = Array.from({ length: 130 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -(Math.random() * 0.5 + 0.15),
      size: Math.random() * 2.5 + 0.8,
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      isEmber: Math.random() < 0.55,
    }));

    let scrollTarget = 0;
    let scrollCurrent = 0;

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0) {
        scrollTarget = Math.max(0, Math.min(1, window.scrollY / scrollable));
      } else {
        scrollTarget = 0;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Smooth scroll lerp
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.12;
      const p = scrollCurrent;
      const cx = w / 2;
      const cy = h / 2;

      // 1. Cosmic Galaxy Nebula Atmosphere (DOOM Argent Galaxy Rift)
      const coreGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * 0.75);
      coreGrad.addColorStop(0, 'rgba(255, 30, 39, 0.14)');
      coreGrad.addColorStop(0.25, 'rgba(180, 20, 45, 0.09)');
      coreGrad.addColorStop(0.55, 'rgba(60, 10, 40, 0.05)');
      coreGrad.addColorStop(0.85, 'rgba(20, 5, 25, 0.01)');
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Starfield: Ambient Fluid Drift + Warp Streaks on Scroll
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.phase += s.phaseSpeed;

        const boundX = w * 1.2;
        const boundY = h * 1.2;
        if (s.x < -boundX) s.x = boundX;
        if (s.x > boundX) s.x = -boundX;
        if (s.y < -boundY) s.y = boundY;
        if (s.y > boundY) s.y = -boundY;

        const warpStretch = 1 + p * 6.0 * s.z;
        const zoom = 1 + p * 2.2;
        const dx = s.x * zoom;
        const dy = s.y * zoom;
        const drawX = cx + dx;
        const drawY = cy + dy;

        if (drawX < -50 || drawX > w + 50 || drawY < -50 || drawY > h + 50) return;

        const currentBrightness = s.baseBrightness * (0.8 + 0.2 * Math.sin(s.phase));
        ctx.beginPath();
        const angle = Math.atan2(dy, dx);
        ctx.ellipse(drawX, drawY, s.size * warpStretch, s.size, angle, 0, Math.PI * 2);
        const color = s.hue === 'red'
          ? `rgba(255, 60, 60, ${currentBrightness})`
          : s.hue === 'cyan'
          ? `rgba(0, 240, 255, ${currentBrightness})`
          : `rgba(244, 245, 248, ${currentBrightness * (1 - p * 0.2)})`;
        ctx.fillStyle = color;
        ctx.fill();
      });

      // 3. Floating Argent Plasma Embers & Fiery Cosmic Dust
      particles.forEach((pt) => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.pulse += pt.pulseSpeed;

        if (pt.y < -20) {
          pt.y = h + 20;
          pt.x = Math.random() * w;
        }
        if (pt.y > h + 20) {
          pt.y = -20;
          pt.x = Math.random() * w;
        }
        if (pt.x < -20) pt.x = w + 20;
        if (pt.x > w + 20) pt.x = -20;

        const px = pt.x + (pt.x - cx) * p * 0.5;
        const py = pt.y + (pt.y - cy) * p * 0.5;

        const currentAlpha = Math.max(0.12, pt.alpha * (0.7 + 0.3 * Math.sin(pt.pulse)));
        ctx.beginPath();
        ctx.arc(px, py, pt.size * (1 + p * 0.4), 0, Math.PI * 2);
        const pColor = pt.isEmber
          ? `rgba(255, 50, 40, ${currentAlpha})`
          : `rgba(255, 175, 40, ${currentAlpha})`;
        ctx.fillStyle = pColor;
        ctx.shadowColor = pt.isEmber ? '#ff1e27' : '#ffaa00';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="global-cosmic-starfield-canvas" />;
}
