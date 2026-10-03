import React, { useState, useEffect, useRef } from 'react';
import { Download } from 'lucide-react';

function AnimatedCounter({ target, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);
  const elRef = useRef(null);
  const countRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateOnScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (elRef.current) {
            const hostEl = elRef.current.closest('.editorial-stats-row') || elRef.current;
            const rect = hostEl.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;

            // Start entering at bottom (90% vh) and reach 100% when at 45% vh
            const startY = vh * 0.90;
            const endY = vh * 0.45;
            const range = startY - endY;
            const scrolled = startY - rect.top;

            const progress = Math.max(0, Math.min(1, scrolled / range));
            const calculated = Math.round(progress * target);

            if (calculated !== countRef.current) {
              countRef.current = calculated;
              setCount(calculated);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', updateOnScroll, { passive: true });
    window.addEventListener('resize', updateOnScroll, { passive: true });
    updateOnScroll();

    return () => {
      window.removeEventListener('scroll', updateOnScroll);
      window.removeEventListener('resize', updateOnScroll);
    };
  }, [target]);

  return (
    <span ref={elRef}>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function About({ showToast }) {
  const handleResumeDownload = (e) => {
    e.preventDefault();
    if (showToast) {
      showToast("CV download initiated!");
    }
  };

  const pillTags = [
    "GENERATIVE AI",
    "MULTIMODAL RAG",
    "QUANT PREDICTIVE ML",
    "FULL-STACK ARCHITECTURE",
    "AZURE CLOUD"
  ];

  const stats = [
    { target: 4, suffix: "+", label: "Platforms Live" },
    { target: 99, prefix: ">", suffix: "%", label: "Model Accuracy" },
    { target: 15, prefix: "<", suffix: "s", label: "Inference Speed" },
    { target: 3, suffix: "+", label: "Years Impact" }
  ];

  return (
    <section id="about" className="editorial-intro-section">
      <div className="container editorial-intro-container">
        {/* Monospace section tag */}
        <span className="editorial-tag">01 // INTRODUCTION</span>

        <div className="editorial-intro-grid">
          {/* Left Column: Big Display Title & Minimalist Counter Stats */}
          <div className="editorial-intro-left">
            <h2 className="editorial-intro-heading">
              <span className="heading-navy">AI ENGINEER</span>
              <span className="heading-gold">&amp; DATA SCIENTIST.</span>
            </h2>

            <div className="editorial-stats-row">
              {stats.map((s, idx) => (
                <div key={idx} className="editorial-stat-item">
                  <span className="editorial-stat-num">
                    <AnimatedCounter 
                      target={s.target} 
                      prefix={s.prefix || ""} 
                      suffix={s.suffix || ""} 
                    />
                  </span>
                  <span className="editorial-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Bio Narrative & Technical Pills */}
          <div className="editorial-intro-right">
            <div className="editorial-bio-block">
              <p className="editorial-bio-lead">
                Engineering production AI platforms that bridge cutting-edge machine learning with mission-critical cloud infrastructure.
              </p>
              <p className="editorial-bio-sub">
                Proven in high-stakes environments—from Tokyo Stock Exchange quantitative forecasting to multimodal document intelligence.
              </p>
            </div>

            <div className="editorial-pill-row">
              {pillTags.map((tag) => (
                <span key={tag} className="editorial-pill">{tag}</span>
              ))}
            </div>

            <div className="editorial-btn-wrap">
              <button 
                onClick={handleResumeDownload} 
                className="editorial-action-btn"
              >
                <Download size={16} />
                Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
