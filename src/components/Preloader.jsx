import React, { useState, useEffect } from 'react';
import { playMechanicalClick, playAirlockPneumatic } from '../utils/audio';
import './Preloader.css';

// 5 distinct photorealistic montage photographs for the opening strobe
const INTRO_IMAGES = [
  '/real-gpu-blade.jpg',
  '/montage-gpu-cluster.jpg',
  '/montage-tech-atelier.jpg',
  '/montage-world-domination.jpg',
  '/real-mission-control.jpg',
];

// Frame-by-frame opening strobe sequence:
// NEED → GPUS → FOR → WORLD → DOMINATION
// Streamlined punchy 2.4s sequence: every word paired with a bespoke crimson hardware frame,
// culminating in the DOMINATION shutter-slit reveal.
const STROBE_SEQUENCE = [
  { type: 'word', text: 'NEED', duration: 210 },
  { type: 'image', src: '/real-gpu-blade.jpg', label: 'COMPUTE_RIG // H100 SXM5 80GB TENSOR ARCHITECTURE', duration: 180 },
  { type: 'word', text: 'GPUS', duration: 200 },
  { type: 'image', src: '/montage-gpu-cluster.jpg', label: 'SUPERCLUSTER // 16,384 HGX NODES // 400Gb/s INFINIBAND', duration: 180 },
  { type: 'word', text: 'FOR', duration: 200 },
  { type: 'image', src: '/montage-tech-atelier.jpg', label: 'AI_ATELIER // PYTORCH ATTENTION MAPS & DETERMINISTIC GATES', duration: 180 },
  { type: 'word', text: 'WORLD', duration: 210 },
  { type: 'image', src: '/montage-world-domination.jpg', label: 'TELEMETRY // GLOBAL INFERENCE & DISTRIBUTED ROUTING', duration: 180 },
  { type: 'image', src: '/real-mission-control.jpg', label: 'MISSION_CONTROL // AUTONOMOUS MULTI-CLUSTER SUPERVISION', duration: 180 },
  { type: 'slit-close', text: 'DOMINATION', duration: 260 },
  { type: 'slit-open', duration: 420 },
];

export default function Preloader({ onComplete }) {
  const [stepIdx, setStepIdx] = useState(0);

  // Preload all 5 montage images immediately so 190ms strobe flashes never flicker or miss a frame
  useEffect(() => {
    INTRO_IMAGES.forEach((src) => {
      const img = new Image();
      img.decoding = 'sync';
      img.src = src;
    });
  }, []);

  const skipIntro = () => {
    if (onComplete) onComplete();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
        if (onComplete) onComplete();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onComplete]);

  // Hard safety timeout: Ensure preloader ALWAYS dismisses even if timers throttle (never get stuck)
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3800);
    return () => clearTimeout(safetyTimer);
  }, [onComplete]);

  useEffect(() => {
    if (stepIdx >= STROBE_SEQUENCE.length) {
      if (onComplete) onComplete();
      return;
    }

    const currentStep = STROBE_SEQUENCE[stepIdx];
    if (currentStep.type === 'slit-open') {
      playAirlockPneumatic();
    } else {
      playMechanicalClick();
    }

    const timer = setTimeout(() => {
      setStepIdx((prev) => prev + 1);
    }, currentStep.duration);

    return () => clearTimeout(timer);
  }, [stepIdx, onComplete]);

  const current = STROBE_SEQUENCE[stepIdx] || STROBE_SEQUENCE[STROBE_SEQUENCE.length - 1];
  const isSlitOpen = current.type === 'slit-open';

  const getWordSizeClass = (text = '') => {
    if (text.length >= 9) return 'word-long';
    if (text.length >= 5) return 'word-medium';
    return 'word-short';
  };

  return (
    <aside
      aria-label="Opening Sequence"
      className={`domination-preloader ${isSlitOpen ? 'is-slit-opening' : ''}`}
      onClick={skipIntro}
    >
      {/* Hidden pre-rendered image cache so every strobe frame is already decoded in the DOM */}
      <div className="strobe-preload-cache" aria-hidden="true">
        {INTRO_IMAGES.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>

      {/* Top & Bottom Horizontal Shutter Bars for the Slit-Open Reveal */}
      {isSlitOpen ? (
        <>
          <div className="shutter-bar shutter-top"></div>
          <div className="shutter-bar shutter-bottom"></div>
        </>
      ) : (
        <div
          className={`strobe-canvas ${
            current.type === 'word-invert' ? 'strobe-invert' : ''
          } ${current.type === 'slit-close' ? 'strobe-slit-closing' : ''}`}
        >
          {(current.type === 'word' ||
            current.type === 'word-invert' ||
            current.type === 'slit-close') && (
            <h1 className={`strobe-giant-word ${getWordSizeClass(current.text)}`}>
              {current.text}
            </h1>
          )}

          {current.type === 'image' && (
            <div className="strobe-fullbleed-img-wrap">
              <img src={current.src} alt="" className="strobe-fullbleed-img" />
            </div>
          )}

          <button className="domination-skip-btn" onClick={skipIntro}>
            skip intro ↵
          </button>
        </div>
      )}
    </aside>
  );
}
