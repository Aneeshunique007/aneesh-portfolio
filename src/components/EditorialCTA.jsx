import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function EditorialCTA({ onOpenContact }) {
  const sectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const updateTransforms = () => {
      if (!sectionRef.current || !line1Ref.current || !line2Ref.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      
      const totalDist = vh + rect.height;
      const currentPos = vh - rect.top;
      const progress = Math.max(0, Math.min(1, currentPos / totalDist));

      // Continuous single-direction pass-through:
      // In dead center of viewport: progress = 0.5 -> normalized = 0.0 (exact center 0px)
      // Entering from bottom (progress 0): normalized = -1.0
      // Exiting through top (progress 1): normalized = +1.0
      const normalized = Math.max(-1, Math.min(1, (progress - 0.5) * 2));

      // Line 1: enters from left (-60px) -> passes through center (0) -> continues to right (+60px)
      // Line 2: enters from right (+60px) -> passes through center (0) -> continues to left (-60px)
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
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (onOpenContact) {
      onOpenContact();
    } else {
      const contactEl = document.querySelector("#contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section ref={sectionRef} className="editorial-cta-section">
      <div className="container editorial-cta-container">
        <h2 className="editorial-cta-headline">
          <span 
            ref={line1Ref}
            className="cta-line-dark cta-parallax-line"
          >
            READY TO SCALE?
          </span>
          <span 
            ref={line2Ref}
            className="cta-line-gold cta-parallax-line"
          >
            LET'S ARCHITECT.
          </span>
        </h2>

        <div className="editorial-cta-button-wrap">
          <a 
            href="#contact" 
            onClick={handleClick}
            className="editorial-convo-btn"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
