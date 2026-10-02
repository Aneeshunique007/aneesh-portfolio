import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Copy, 
  Check, 
  Globe, 
  Mail,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon, FacebookIcon } from './Icons';

export default function Hero({ onNavigate, showToast }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = "aneeshusunique@gmail.com";
  const phone = "+91 86672 70586";
  const linkedinUrl = "https://www.linkedin.com/in/aneesh-u-s";

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    showToast("Email address copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About Me", href: "#about" },
    { label: "Skills & Tech", href: "#skills" },
    { label: "Featured Work", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (href) => {
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="hero" className="hero-section">
      {/* Background Cinematic Image with Overlays */}
      <div className="hero-bg-container">
        <img 
          src="/hero-bg.jpg" 
          alt="Aneesh - Full-stack Software Engineer" 
          className="hero-bg-image"
        />
        <div className="hero-vignette-overlay"></div>
        <div className="hero-gradient-overlay"></div>
      </div>

      {/* Top Left Reddish-Orange Dot Pattern Matrix */}
      <div className="hero-dots-matrix" aria-hidden="true">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <defs>
            <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF5722" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF4A17" stopOpacity="0.4" />
            </radialGradient>
          </defs>
          {Array.from({ length: 9 }).map((_, row) =>
            Array.from({ length: 9 }).map((_, col) => {
              // Diagonal clipped aesthetic similar to reference image
              if (row + col > 12) return null;
              return (
                <circle
                  key={`${row}-${col}`}
                  cx={12 + col * 14}
                  cy={12 + row * 14}
                  r="2.6"
                  fill="url(#dotGlow)"
                  opacity={0.4 + (col * 0.06)}
                />
              );
            })
          )}
        </svg>
      </div>

      {/* Top Right Minimalist Square Hamburger Button */}
      <nav className="hero-top-nav">
        <button 
          className={`hero-menu-btn ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X size={24} color="#ffffff" strokeWidth={2} />
          ) : (
            <div className="hamburger-bars">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </button>
      </nav>

      {/* Hero Center Typography */}
      <div className="hero-center-content">
        <div className="hero-kicker-badge">
          <span className="live-indicator"></span>
          <span>AI ENGINEER & DATA SCIENTIST • ADAM-I INNOVATIONS</span>
        </div>

        <h1 className="hero-main-title">
          Hi ! I'm <span className="hero-accent-name">Aneesh U S.</span>
        </h1>

        <p className="hero-subtext">
          AI Engineer & Data Scientist at Adam-i Innovations based in Trivandrum, India. Specializing in Generative AI, RAG Architectures & Full-Stack Systems.
        </p>

        <div className="hero-actions">
          <a 
            href="#projects" 
            onClick={(e) => { e.preventDefault(); handleLinkClick("#projects"); }}
            className="btn-primary hero-cta-btn"
          >
            EXPLORE AI PROJECTS
            <ArrowRight size={17} />
          </a>
          
          <a 
            href="#about" 
            onClick={(e) => { e.preventDefault(); handleLinkClick("#about"); }}
            className="btn-secondary hero-secondary-btn"
          >
            MORE ABOUT ME
          </a>
        </div>
      </div>

      {/* Bottom Bar: Left Contact & Right Socials */}
      <div className="hero-bottom-bar">
        {/* Bottom Left Contact Info */}
        <div className="hero-contact-callout">
          <span className="contact-heading">Let's work together</span>
          <a 
            href={`mailto:${email}`} 
            onClick={handleCopyEmail}
            className="contact-email"
            title="Click to copy email address"
          >
            {email}
            <span className="copy-badge">
              {copiedEmail ? <Check size={13} color="#FF4A17" /> : <Copy size={13} />}
            </span>
          </a>
          <a href={`tel:${phone.replace(/\s+/g, '')}`} className="contact-phone">
            {phone}
          </a>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="hero-scroll-prompt" 
          onClick={() => handleLinkClick("#about")}
          role="button"
          tabIndex={0}
          aria-label="Scroll down to About section"
        >
          <span>EXPLORE</span>
          <ChevronDown size={18} className="bounce-arrow" />
        </div>

        {/* Bottom Right Social Links (Matches reference image) */}
        <div className="hero-social-links" aria-label="Social Profiles">
          <a 
            href="https://www.facebook.com/aneesh.us.3" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-btn"
            aria-label="Facebook profile"
          >
            <FacebookIcon size={17} />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-btn"
            aria-label="Twitter / X profile"
          >
            <TwitterIcon size={17} />
          </a>
          <a 
            href={linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-btn"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon size={17} />
          </a>
          <a 
            href="https://aneesh.dev" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-btn"
            aria-label="Personal website"
          >
            <Globe size={17} />
          </a>
          <a 
            href="https://www.instagram.com/__b_a_d_b_o_y__007/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-btn"
            aria-label="Instagram profile"
          >
            <InstagramIcon size={17} />
          </a>
          <a 
            href="https://github.com/Aneeshunique007" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-btn"
            aria-label="GitHub profile"
          >
            <GithubIcon size={17} />
          </a>
        </div>
      </div>

      {/* Full-Screen Glassmorphic Navigation Drawer */}
      <div className={`nav-drawer-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="nav-drawer-backdrop" onClick={() => setMenuOpen(false)}></div>
        
        <div className="nav-drawer-card">
          <div className="drawer-header">
            <div className="brand-logo">
              <span className="brand-dot"></span>
              ANEESH U S<span>.AI</span>
            </div>
            <button 
              className="drawer-close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={26} />
            </button>
          </div>

          <div className="drawer-body">
            <ul className="drawer-links-list">
              {navLinks.map((item, idx) => (
                <li key={item.label} style={{ '--delay': `${idx * 0.08}s` }}>
                  <a 
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                  >
                    <span className="link-num">0{idx + 1}</span>
                    <span className="link-text">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="drawer-footer-info">
              <div className="status-pill">
                <span className="status-dot"></span>
                AI Engineer @ Adam-i Innovations
              </div>
              <div className="drawer-contact-row">
                <a href={`mailto:${email}`} className="drawer-email">{email}</a>
                <span className="drawer-phone">{phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
