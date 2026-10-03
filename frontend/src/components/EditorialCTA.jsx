import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function EditorialCTA({ onOpenContact }) {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const vh = window.innerHeight;
            // Calculate progress from 0 (entering from bottom) to 1 (leaving top)
            const progress = (vh - rect.top) / (vh + rect.height);
            // Center around 0 (-1 to 1)
            const centered = (progress - 0.5) * 2;
            setOffset(centered);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Line 1 moves left, Line 2 moves right with safe bounds
  const line1X = Math.round(offset * -24);
  const line2X = Math.round(offset * 24);

  return (
    <section ref={sectionRef} className="editorial-cta-section">
      <div className="container editorial-cta-container">
        <h2 className="editorial-cta-headline">
          <span 
            className="cta-line-dark cta-parallax-line"
            style={{ transform: `translate3d(${line1X}px, 0, 0)` }}
          >
            READY TO SCALE?
          </span>
          <span 
            className="cta-line-gold cta-parallax-line"
            style={{ transform: `translate3d(${line2X}px, 0, 0)` }}
          >
            LET'S ARCHITECT THE FUTURE.
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
