import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';

export default function EditorialBreather({
  tag = "TRANSITION",
  line1,
  line2,
  statusBadge = "LIVE IN PRODUCTION",
  ctaText = "Explore Case Studies",
  targetId = "#projects",
  id,
  size = "default",
  flowingTape = false,
  flowingItems = [
    "PRODUCTION GENERATIVE AI PLATFORMS",
    "ENTERPRISE MULTIMODAL RAG ARCHITECTURES",
    "AUTONOMOUS AGENT WORKFLOWS",
    "COMPUTER VISION & DOCUMENT INTELLIGENCE",
    "DEEP LEARNING PREDICTIVE MODELING",
    "SCALABLE AZURE CLOUD MLOPS",
    "HIGH-THROUGHPUT FULL-STACK ARCHITECTURES"
  ]
}) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0.5);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // Progress as the section travels through the viewport
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

  // Controlled gliding offsets: slightly wider glide for giant mode
  const glideRange = size === 'giant' ? 36 : 24;
  const offset1 = Math.round((scrollProgress - 0.5) * -glideRange);
  const offset2 = Math.round((scrollProgress - 0.5) * glideRange);

  const handleScrollClick = (e) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} id={id} className={`editorial-breather-section ${size === 'giant' ? 'giant-breather-section' : ''}`}>
      <div className="container editorial-breather-container">
        {/* Subtle Ambient Cyber Glow */}
        <div className="breather-ambient-glow" aria-hidden="true"></div>

        {/* Status Tag */}
        <div className="breather-meta-row">
          <span className="breather-tag-pill">
            <span className="breather-status-dot"></span>
            {statusBadge}
          </span>
        </div>

        {/* Big Editorial Headline with Opposing Scroll Parallax */}
        <h2 className={`editorial-breather-headline ${size === 'giant' ? 'giant-breather-headline' : ''}`}>
          <span 
            className="breather-line-white breather-parallax-line"
            style={{ transform: `translate3d(${offset1}px, 0, 0)` }}
          >
            {line1}
          </span>
          <span 
            className="breather-line-cyan breather-parallax-line"
            style={{ transform: `translate3d(${offset2}px, 0, 0)` }}
          >
            {line2}
          </span>
        </h2>

        {/* Smooth-Flowing Continuous Infinite Cyber Marquee Tape */}
        {flowingTape && (
          <div className="kinetic-marquee-tape breather-flowing-tape" aria-hidden="true">
            <div className="kinetic-marquee-track">
              <div className="kinetic-marquee-group">
                {flowingItems.map((item, idx) => (
                  <span key={`f1-${idx}`}>• {item}</span>
                ))}
              </div>
              <div className="kinetic-marquee-group" aria-hidden="true">
                {flowingItems.map((item, idx) => (
                  <span key={`f2-${idx}`}>• {item}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Action */}
        {ctaText && targetId && (
          <div className="breather-action-wrap">
            <a 
              href={targetId} 
              onClick={handleScrollClick}
              className="breather-nav-btn"
            >
              <span>{ctaText}</span>
              <ArrowDownRight size={16} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
