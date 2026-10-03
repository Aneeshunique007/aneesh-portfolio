import React, { useEffect, useRef } from 'react';
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
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const updateTransforms = () => {
      if (!containerRef.current || !line1Ref.current || !line2Ref.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      
      // Total travel distance from entering bottom to leaving top
      const totalDist = vh + rect.height;
      const currentPos = vh - rect.top;
      const progress = Math.max(0, Math.min(1, currentPos / totalDist));

      // Continuous single-direction pass-through:
      // In dead center of viewport: progress = 0.5 -> normalized = 0.0 (exact center 0px)
      // Entering from bottom (progress 0): normalized = -1.0
      // Exiting through top (progress 1): normalized = +1.0
      const normalized = Math.max(-1, Math.min(1, (progress - 0.5) * 2));

      // Line 1: enters from left (-X) -> passes through center (0) -> continues to right (+X)
      // Line 2: enters from right (+X) -> passes through center (0) -> continues to left (-X)
      const maxDistance = 60;
      const offset1 = normalized * maxDistance;
      const offset2 = normalized * -maxDistance;

      line1Ref.current.style.transform = `translate3d(${offset1.toFixed(1)}px, 0, 0)`;
      line2Ref.current.style.transform = `translate3d(${offset2.toFixed(1)}px, 0, 0)`;
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateTransforms();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [size]);

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
            ref={line1Ref}
            className="breather-line-white breather-parallax-line"
          >
            {line1}
          </span>
          <span 
            ref={line2Ref}
            className="breather-line-cyan breather-parallax-line"
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
