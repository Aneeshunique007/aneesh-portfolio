import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top-row">
          <div className="footer-brand">
            <span className="brand-dot"></span>
            <span className="brand-text">ANEESH U S</span>
            <p className="footer-tagline">
              AI Engineer & Data Scientist at Adam-i Innovations • Engineering production Generative AI, computer vision, and scalable full-stack architectures.
            </p>
          </div>

          <div className="footer-nav-col">
            <h4>Quick Navigation</h4>
            <div className="footer-links">
              <a href="#hero">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Capabilities</a>
              <a href="#projects">Work</a>
              <a href="#experience">Timeline</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div className="footer-social-col">
            <h4>Connect</h4>
            <div className="footer-social-icons">
              <a href="https://github.com/Aneeshunique007" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
              <a href="https://www.linkedin.com/in/aneesh-u-s" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
              <a href="https://www.facebook.com/aneesh.us.3" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon size={18} />
              </a>
              <a href="https://www.instagram.com/__b_a_d_b_o_y__007/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon size={18} />
              </a>
              <a href="mailto:aneeshusunique@gmail.com" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
            <span className="footer-avail">Open for enterprise AI innovations & collaborations</span>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-copy">
            © {new Date().getFullYear()} Aneesh U S. All rights reserved. Built with React & Vite.
          </p>

          <button 
            className="back-to-top-btn" 
            onClick={scrollToTop}
            aria-label="Back to top of page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
