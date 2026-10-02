import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#projects" },
    { label: "Timeline", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky-nav ${scrolled ? 'nav-visible' : ''}`}>
      <div className="sticky-nav-container glass-panel">
        <a 
          href="#hero" 
          className="nav-brand"
          onClick={(e) => handleScrollTo(e, '#hero')}
        >
          <span className="brand-dot"></span>
          ANEESH U S
        </a>

        {/* Desktop Links */}
        <nav className="desktop-nav-links">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="nav-item-link"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Quick Hire CTA & Theme Toggle */}
        <div className="nav-right-actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} className="sticky-theme-toggle" />

          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="nav-hire-btn"
          >
            LET'S TALK
            <ArrowUpRight size={14} />
          </a>

          <button 
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav-dropdown glass-panel">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="mobile-nav-item"
            >
              {item.label}
            </a>
          ))}
          <div className="mobile-menu-theme-row">
            <span>Appearance</span>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} className="mobile-theme-toggle" />
          </div>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="btn-primary mobile-menu-cta"
          >
            GET IN TOUCH
          </a>
        </div>
      )}
    </header>
  );
}
