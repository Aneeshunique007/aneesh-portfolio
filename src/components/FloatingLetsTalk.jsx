import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function FloatingLetsTalk() {
  const handleClick = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a 
      href="#contact" 
      onClick={handleClick}
      className="fixed-lets-talk-pill"
      aria-label="Let's Talk - scroll down to contact"
    >
      <span className="talk-pulse-dot" aria-hidden="true"></span>
      <span className="talk-label">Let's Talk</span>
      <ArrowUpRight size={17} className="talk-arrow" aria-hidden="true" />
    </a>
  );
}
