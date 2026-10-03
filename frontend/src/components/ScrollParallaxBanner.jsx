import React, { useEffect, useRef, useState } from 'react';

export default function ScrollParallaxBanner({ 
  word1 = "ENGINEERING", 
  word2 = "INTELLIGENCE."
}) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0.5);

  const marqueeItems = [
    "PRODUCTION GENERATIVE AI PLATFORMS",
    "ENTERPRISE MULTIMODAL RAG ARCHITECTURES",
    "AUTONOMOUS AGENT WORKFLOWS",
    "COMPUTER VISION & DOCUMENT INTELLIGENCE",
    "DEEP LEARNING PREDICTIVE MODELING",
    "SCALABLE AZURE CLOUD MLOPS",
    "HIGH-THROUGHPUT FULL-STACK ARCHITECTURES"
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // Progress as the banner travels through the viewport
            const totalDist = windowHeight + rect.height;
            const currentPos = windowHeight - rect.top;
            const progress = Math.max(0, Math.min(1, currentPos / totalDist));
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Controlled gliding offsets (±40px) so words stay fully visible within the viewport
  const offset1 = (scrollProgress - 0.5) * -50;
  const offset2 = (scrollProgress - 0.5) * 50;

  const capabilities = [
    { num: "01", title: "Enterprise RAG & Agentic Systems", focus: "Hybrid Search & Reasoning" },
    { num: "02", title: "Deep Learning & Predictive ML", focus: "Multi-Horizon Time-Series" },
    { num: "03", title: "Full-Stack Cloud Microservices", focus: "High-Throughput APIs" },
    { num: "04", title: "Multimodal Document Intelligence", focus: "Vision & Vector PDF" },
    { num: "05", title: "Scalable Azure Cloud MLOps", focus: "Automated Deployments" }
  ];

  return (
    <section ref={containerRef} className="editorial-parallax-section">
      {/* Dedicated Viewport Stage for Kinetic Typography */}
      <div className="giant-words-hero-stage">
        <div className="giant-words-wrapper" aria-hidden="true">
          <div 
            className="giant-word-line line-1"
            style={{ transform: `translate3d(${offset1}px, 0, 0)` }}
          >
            <span className="word-dark">{word1}</span>
          </div>
          <div 
            className="giant-word-line line-2"
            style={{ transform: `translate3d(${offset2}px, 0, 0)` }}
          >
            <span className="word-accent">{word2}</span>
          </div>
        </div>

        {/* Continuously Rotating Infinite Marquee Ribbon */}
        <div className="kinetic-marquee-tape" aria-hidden="true">
          <div className="kinetic-marquee-track">
            <div className="kinetic-marquee-group">
              {marqueeItems.map((item, idx) => (
                <span key={`m1-${idx}`}>• {item}</span>
              ))}
            </div>
            <div className="kinetic-marquee-group" aria-hidden="true">
              {marqueeItems.map((item, idx) => (
                <span key={`m2-${idx}`}>• {item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Minimalist Architectural Index (Zero Word Clutter) */}
      <div className="container editorial-index-container">
        <div className="editorial-index-header">
          <span className="editorial-eyebrow">// CORE ARCHITECTURAL PILLARS</span>
          <p className="editorial-index-tagline">
            Production systems engineered for deterministic reliability, low latency, and scalable cloud infrastructure.
          </p>
        </div>

        <div className="editorial-index-list">
          {capabilities.map((item) => (
            <div key={item.num} className="editorial-index-row">
              <div className="index-left">
                <span className="index-num">{item.num}</span>
                <h3 className="index-title">{item.title}</h3>
              </div>
              <div className="index-line" aria-hidden="true" />
              <div className="index-right">
                <span className="index-focus">{item.focus}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="editorial-index-cta">
          <a 
            href="#projects" 
            className="editorial-action-btn"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Flagship Systems →
          </a>
        </div>
      </div>
    </section>
  );
}
