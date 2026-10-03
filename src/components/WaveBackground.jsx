import React, { useEffect, useRef } from 'react';

/**
 * CyberFlowBackground:
 * Ultra-smooth flowing mathematical energy waves (sine/cosine harmonics)
 * with dynamic cursor repulsion/attraction and shimmering neon gradients.
 * Replaces traditional connected dots with modern fluid cyber ribbons.
 */
export default function WaveBackground({ theme = 'dark' }) {
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

    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
      active: false,
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = width * 0.5;
      mouse.targetY = height * 0.5;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Wave parameters
    let step = 0;
    const waveCount = 5;

    // Palette configuration
    const colorsDark = [
      { r: 255, g: 74, b: 23, a: 0.35 },   // Electric orange
      { r: 245, g: 158, b: 11, a: 0.28 },  // Warm amber
      { r: 255, g: 107, b: 61, a: 0.22 },  // Soft coral
      { r: 56, g: 189, b: 248, a: 0.18 },  // Electric cyan
      { r: 255, g: 42, b: 0, a: 0.30 },    // Deep fiery neon
    ];

    const colorsLight = [
      { r: 230, g: 60, b: 15, a: 0.22 },
      { r: 217, g: 119, b: 6, a: 0.18 },
      { r: 249, g: 115, b: 22, a: 0.16 },
      { r: 2, g: 132, b: 199, a: 0.14 },
      { r: 220, g: 38, b: 38, a: 0.18 },
    ];

    const colors = isDark ? colorsDark : colorsLight;

    const render = () => {
      step += 0.012;

      // Soft damping towards mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Render each harmonic wave ribbon
      for (let i = 0; i < waveCount; i++) {
        const color = colors[i % colors.length];
        const baseHeight = height * (0.42 + i * 0.12);
        const waveSpeed = 0.8 + i * 0.35;
        const amplitude = 38 + i * 18;
        const frequency = 0.0018 + i * 0.0006;

        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 12) {
          // Complex multi-frequency wave calculation
          const distToMouse = Math.abs(x - mouse.x);
          const mouseInfluence = Math.max(0, 1 - distToMouse / 420);
          const mouseDisplacement = Math.sin((mouse.y / height) * Math.PI) * mouseInfluence * 45;

          const y =
            baseHeight +
            Math.sin(x * frequency + step * waveSpeed + i * 1.5) * amplitude +
            Math.cos(x * (frequency * 1.4) - step * (waveSpeed * 0.7)) * (amplitude * 0.45) +
            mouseDisplacement;

          if (x === 0) {
            ctx.lineTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Glowing gradient fill
        const gradient = ctx.createLinearGradient(0, baseHeight - amplitude * 2, 0, height);
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.4})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fill();

        // Stroke line on the ridge for sleek luminous definition
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.min(1, color.a * 2.2)})`;
        ctx.stroke();
      }

      // Draw subtle luminous energy floating particles along the waves
      const particleTime = step * 2;
      for (let p = 0; p < 24; p++) {
        const px = ((p * 79 + particleTime * 45) % (width + 60)) - 30;
        const py = (height * 0.4) + Math.sin(px * 0.003 + p) * 120 + ((p * 37) % (height * 0.45));
        const pSize = 1.2 + (p % 3) * 0.8;
        const pAlpha = 0.2 + Math.sin(step * 3 + p) * 0.2;

        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 120, 60, ${Math.max(0.08, pAlpha)})`;
        ctx.shadowColor = '#FF4A17';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <div className="wave-bg-wrapper" aria-hidden="true">
      <div className="neural-ambient-glow orb-1"></div>
      <div className="neural-ambient-glow orb-2"></div>
      <canvas ref={canvasRef} className="wave-canvas" />
    </div>
  );
}
