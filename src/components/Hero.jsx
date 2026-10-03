import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Copy, 
  Check, 
  Mail,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from './Icons';

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
      {/* Top Right Actions: Minimalist Square Hamburger Button */}
      <nav className="hero-top-nav">
        <div className="hero-top-actions">
          <button 
            className={`hero-menu-btn ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            <div className="hamburger-bars">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Hero Center Typography */}
      <div className="hero-center-content">
        <div className="hero-kicker-badge">
          <span className="live-indicator"></span>
          <span>LEAD AI ENGINEER</span>
        </div>

        <h1 className="hero-main-title">
          Hi ! I'm{' '}<br />
          <span className="hero-accent-name">Aneesh U S.</span>
        </h1>

        <p className="hero-subtext">
          Architecting production-grade Generative AI systems, multimodal RAG pipelines, and institutional quantitative forecasting models.
        </p>

        <div className="hero-actions">
          <a 
            href="#projects" 
            onClick={(e) => { e.preventDefault(); handleLinkClick("#projects"); }}
            className="btn-primary hero-cta-btn"
          >
            EXPLORE PROJECTS
            <ArrowRight size={17} />
          </a>
        </div>
      </div>

      {/* Bottom Bar: Left Contact & Right Socials */}
      <div className="hero-bottom-bar">
        {/* Contact Info Callout */}
        <div className="hero-contact-callout">
          <span className="contact-heading">Let's work together</span>

          {/* Email ID & Social Links on the EXACT SAME LINE */}
          <div className="hero-email-socials-row">
            <a 
              href={`mailto:${email}`} 
              onClick={handleCopyEmail}
              className="contact-email"
              title="Click to copy email address"
            >
              {email}
              <span className="copy-badge">
                {copiedEmail ? <Check size={13} color="#06B6D4" /> : <Copy size={13} />}
              </span>
            </a>

            {/* Social Links on the same line as the email id */}
            <div className="hero-social-links" aria-label="Social Profiles">
              <a 
                href="https://www.facebook.com/aneesh.us.3" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn"
                aria-label="Facebook profile"
              >
                <FacebookIcon size={16} />
              </a>
              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon size={16} />
              </a>
              <a 
                href="https://www.instagram.com/__b_a_d_b_o_y__007/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn"
                aria-label="Instagram profile"
              >
                <InstagramIcon size={16} />
              </a>
              <a 
                href="https://github.com/Aneeshunique007" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn"
                aria-label="GitHub profile"
              >
                <GithubIcon size={16} />
              </a>
            </div>
          </div>

          {/* Phone Number */}
          <div className="hero-phone-row">
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="contact-phone">
              {phone}
            </a>
          </div>
        </div>

        {/* Scroll Indicator: Guaranteed True Horizontal Center */}
        <div 
          className="hero-scroll-prompt" 
          onClick={() => handleLinkClick("#about")}
          role="button"
          tabIndex={0}
          aria-label="Scroll down to About section"
        >
          <span>EXPLORE</span>
          <ChevronDown size={17} className="bounce-arrow" />
        </div>
      </div>

      {/* Full-Screen Glassmorphic Navigation Drawer */}
      <div className={`nav-drawer-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="nav-drawer-backdrop" onClick={() => setMenuOpen(false)}></div>
        
        <div className="nav-drawer-card">
          <div className="drawer-header">
            <div className="brand-logo">
              <span className="brand-dot"></span>
              ANEESH U S
            </div>
            <div className="drawer-header-actions">
              <button 
                className="drawer-close-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={26} />
              </button>
            </div>
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
                AI Engineer & Data Scientist • Tokyo / Trivandrum
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
