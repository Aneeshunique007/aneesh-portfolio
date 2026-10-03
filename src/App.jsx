import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import EditorialBreather from './components/EditorialBreather';
import Projects from './components/Projects';
import Experience from './components/Experience';
import EditorialCTA from './components/EditorialCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CyberGridBackground from './components/CyberGridBackground';
import { Check } from 'lucide-react';
import './App.css';
import './ModernEnhancements.css';

function App() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.setAttribute('data-theme', 'dark');

    // Initialize Lenis for luxurious, inertial smooth-flowing scrolling
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3200);
  };

  return (
    <div className="portfolio-app" data-theme="dark">
      {/* Interactive 3D Cyber Perspective Grid */}
      <CyberGridBackground theme="dark" />

      <main>
        {/* Hero Section */}
        <Hero showToast={showToast} />

        {/* 01 // Introduction */}
        <About showToast={showToast} />

        {/* Interstitial Breather 1: Giant Flowing Engineering Intelligence */}
        <EditorialBreather 
          statusBadge="CORE PHILOSOPHY"
          line1="ENGINEERING"
          line2="INTELLIGENCE."
          ctaText="Explore Technical Arsenal"
          targetId="#skills"
          size="giant"
          flowingTape={true}
        />

        {/* 02 // Technical Domain Matrix & Skills */}
        <Skills />

        {/* Interstitial Breather 2: Skills to Production Systems */}
        <EditorialBreather 
          statusBadge="VALIDATED ARCHITECTURES"
          line1="SHIPPED TO PRODUCTION."
          line2="BUILT FOR ENTERPRISE SCALE."
          ctaText="Explore Flagship Case Studies"
          targetId="#projects"
        />

        {/* 03 // Featured Work */}
        <Projects showToast={showToast} />

        {/* Interstitial Breather 3: Projects to Career Journey */}
        <EditorialBreather 
          statusBadge="CAREER VELOCITY"
          line1="CHRONICLE OF IMPACT."
          line2="CONSTANT ENGINEERING EVOLUTION."
          ctaText="Inspect Career Journey"
          targetId="#experience"
        />

        {/* 04 // Journey / Career Milestones */}
        <Experience />

        {/* Interstitial Breather 4: Giant Editorial CTA (HAVE AN IDEA? LET'S BUILD IT.) */}
        <EditorialCTA onOpenContact={() => document.querySelector("#contact")?.scrollIntoView({ behavior: 'smooth' })} />

        {/* 05 // Get in Touch / Contact */}
        <Contact showToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Toast Notification */}
      {toastVisible && (
        <div className="toast-notice" role="status" aria-live="polite">
          <Check size={16} color="#3B82F6" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
