import React, { useState, useEffect } from 'react';

const ROLES = [
  "Generative AI & LLM Systems Architect",
  "Enterprise RAG & Agentic Workflows",
  "TSE Quantitative ML & Deep Learning",
  "Multimodal AI & Full-Stack Engineer"
];

export default function TypewriterRoles() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];

    let timer;

    if (!isDeleting && displayedText.length < currentRole.length) {
      // Typing forward
      timer = setTimeout(() => {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        setTypingSpeed(70 + Math.random() * 40);
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      // Pause at full word
      timer = setTimeout(() => {
        setIsDeleting(true);
        setTypingSpeed(45);
      }, 2400);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timer = setTimeout(() => {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        setTypingSpeed(35);
      }, typingSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      // Switch to next word
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      setTypingSpeed(120);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, typingSpeed]);

  return (
    <div className="kinetic-role-container">
      <span className="kinetic-role-label">Specializing in</span>
      <div className="kinetic-typewriter-wrapper">
        <span className="kinetic-role-text">{displayedText}</span>
        <span className="kinetic-blinking-cursor" aria-hidden="true">|</span>
      </div>
    </div>
  );
}
