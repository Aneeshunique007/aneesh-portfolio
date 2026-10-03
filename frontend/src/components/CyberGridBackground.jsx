import React, { useEffect, useRef } from 'react';

/**
 * CyberGridBackground:
 * Ultra-smooth interactive 3D Cyber Perspective Grid with horizon vanishing point,
 * forward grid line motion, energy light pulses, and interactive mouse parallax tilt.
 */
export default function CyberGridBackground({ theme = 'dark' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isDark = theme !== 'light';

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Perspective 3D grid configuration
    const fov = 420;
    const gridSpacing = 90;
    const numVerticalLines = 32;
    const gridDepth = 2400;
    const gridSpeed = 2.4;
    let offsetZ = 0;

    // Energy pulses traveling along the grid lines
    const pulses = Array.from({ length: 16 }, () => ({
      lineIndex: Math.floor(Math.random() * numVerticalLines) - numVerticalLines / 2,
      z: Math.random() * gridDepth,
      speed: 9 + Math.random() * 8,
      length: 140 + Math.random() * 90,
    }));

    // Palette configuration (Electric Cobalt & Cyber Cyan)
    const gridColor = isDark ? '59, 130, 246' : '37, 99, 235';
    const accentColor = isDark ? '6, 182, 212' : '59, 130, 246';
    const horizonGlowColor = isDark ? '59, 130, 246' : '37, 99, 235';

    const render = () => {
      offsetZ = (offsetZ + gridSpeed) % gridSpacing;

      ctx.clearRect(0, 0, width, height);

      // Stable fixed horizon position & vanishing point (no mouse tilt)
      const horizonY = height * 0.44;
      const vanishingX = width * 0.5;
      const groundPlaneY = 220;

      // -------------------------------------------------------------
      // 1. Horizon Neon Glow & Sky Fade (Seamless over full canvas)
      // -------------------------------------------------------------
      const glowRadius = Math.max(width * 0.75, 700);
      const horizonGrad = ctx.createRadialGradient(
        vanishingX,
        horizonY,
        10,
        vanishingX,
        horizonY,
        glowRadius
      );
      horizonGrad.addColorStop(0, `rgba(${horizonGlowColor}, ${isDark ? 0.22 : 0.05})`);
      horizonGrad.addColorStop(0.5, `rgba(${accentColor}, ${isDark ? 0.08 : 0.02})`);
      horizonGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, 0, width, height);



      // -------------------------------------------------------------
      // 2. 3D Perspective Grid: Longitudinal (Vertical) Lines
      // -------------------------------------------------------------
      for (let i = -numVerticalLines / 2; i <= numVerticalLines / 2; i++) {
        const worldX = i * gridSpacing;

        const nearZ = 120;
        const screenNearX = vanishingX + (worldX * fov) / nearZ;
        const screenNearY = horizonY + (groundPlaneY * fov) / nearZ;

        const farZ = gridDepth;
        const screenFarX = vanishingX + (worldX * fov) / farZ;
        const screenFarY = horizonY + (groundPlaneY * fov) / farZ;

        const distanceFromCenter = Math.abs(i) / (numVerticalLines / 2);
        const lineAlpha = (1 - distanceFromCenter * 0.6) * (isDark ? 0.32 : 0.2);

        ctx.beginPath();
        ctx.moveTo(screenFarX, screenFarY);
        ctx.lineTo(screenNearX, screenNearY);
        ctx.strokeStyle = `rgba(${gridColor}, ${Math.max(0.06, lineAlpha)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // 3. 3D Perspective Grid: Moving Transverse (Horizontal) Lines
      // -------------------------------------------------------------
      for (let z = 120; z < gridDepth; z += gridSpacing) {
        const actualZ = z - offsetZ;
        if (actualZ <= 80) continue;

        const screenY = horizonY + (groundPlaneY * fov) / actualZ;
        if (screenY > height + 60 || screenY < horizonY) continue;

        const halfWidthAtZ = ((numVerticalLines / 2) * gridSpacing * fov) / actualZ;
        const startX = vanishingX - halfWidthAtZ;
        const endX = vanishingX + halfWidthAtZ;

        const depthFactor = 1 - (actualZ / gridDepth);
        const horizAlpha = Math.pow(depthFactor, 1.4) * (isDark ? 0.36 : 0.22);

        ctx.beginPath();
        ctx.moveTo(startX, screenY);
        ctx.lineTo(endX, screenY);
        ctx.strokeStyle = `rgba(${gridColor}, ${horizAlpha})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // 4. Moving Energy Pulses on Grid
      // -------------------------------------------------------------
      pulses.forEach((pulse) => {
        pulse.z -= pulse.speed;
        if (pulse.z < 120) {
          pulse.z = gridDepth - Math.random() * 250;
          pulse.lineIndex = Math.floor(Math.random() * numVerticalLines) - numVerticalLines / 2;
        }

        const worldX = pulse.lineIndex * gridSpacing;
        const z1 = pulse.z;
        const z2 = Math.min(gridDepth, pulse.z + pulse.length);

        if (z1 >= 120 && z2 <= gridDepth) {
          const x1 = vanishingX + (worldX * fov) / z1;
          const y1 = horizonY + (groundPlaneY * fov) / z1;
          const x2 = vanishingX + (worldX * fov) / z2;
          const y2 = horizonY + (groundPlaneY * fov) / z2;

          const pulseDepth = 1 - (z1 / gridDepth);
          const pulseAlpha = Math.min(1, pulseDepth * 1.2) * (isDark ? 0.85 : 0.6);

          ctx.beginPath();
          ctx.moveTo(x2, y2);
          ctx.lineTo(x1, y1);
          ctx.strokeStyle = `rgba(${accentColor}, ${pulseAlpha})`;
          ctx.lineWidth = 2.4;
          ctx.shadowColor = `rgba(${accentColor}, 0.9)`;
          ctx.shadowBlur = 10;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <div className="cyber-grid-wrapper" aria-hidden="true">
      <div className="neural-ambient-glow orb-1"></div>
      <div className="neural-ambient-glow orb-2"></div>
      <canvas ref={canvasRef} className="cyber-grid-canvas" />
    </div>
  );
}
