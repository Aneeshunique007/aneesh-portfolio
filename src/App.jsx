import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Preloader from './components/Preloader';
import MissionHUD from './components/MissionHUD';
import InterstellarAudioPlayer from './components/InterstellarAudioPlayer';
import CosmicStarfield from './components/CosmicStarfield';
import HomePage from './pages/HomePage';
import { playAirlockPneumatic } from './utils/audio';
import { Check } from 'lucide-react';
import './App.css';

// Code-split heavy 3D WebGL components & auxiliary pages for instant First Contentful Paint
const ThreePlushEnvelope = React.lazy(() => import('./components/ThreePlushEnvelope'));
const ContactModal = React.lazy(() => import('./components/ContactModal'));
const WorkPage = React.lazy(() => import('./pages/WorkPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const FaqPage = React.lazy(() => import('./pages/FaqPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const CaseStudyPage = React.lazy(() => import('./pages/CaseStudyPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

function AppContent() {
  const location = useLocation();
  const lenisRef = useRef(null);

  // Play the "NEED GPUS FOR WORLD DOMINATION" opening montage on every page load
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.setAttribute('data-theme', 'dark');

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Initialize Lenis for luxurious, inertial smooth-flowing scrolling
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.72,
      touchMultiplier: 0.9,
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Force scroll to top on every route change (resets both browser and Lenis internal state)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3200);
  };

  return (
    <div className="portfolio-app" data-theme="dark">
      {/* Global Unified Cosmic Starfield Canvas across all pages */}
      <CosmicStarfield />

      {/* Authentic Sruthi Opening Sequence: "NEED GPUS FOR WORLD DOMINATION" */}
      {loading && <Preloader onComplete={handleIntroComplete} />}

      {/* Global Mission HUD: Persistent Telemetry, Orbit Coordinates, Audio & Navigation */}
      <MissionHUD
        onReplayIntro={() => setLoading(true)}
      />

      {/* Official Hans Zimmer Interstellar Main Theme Player (from 0:20 on) */}
      <InterstellarAudioPlayer />

      {/* Multi-Page Routes */}
      <React.Suspense fallback={<div className="page-route-fallback" />}>
        <Routes>
          <Route path="/" element={<HomePage showToast={showToast} />} />
          <Route path="/work" element={<WorkPage showToast={showToast} />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/about" element={<AboutPage showToast={showToast} />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage showToast={showToast} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </React.Suspense>

      {/* 3D Running/Hopping Plush Envelope in DOOM Praetor Argent Theme */}
      <React.Suspense fallback={null}>
        <ThreePlushEnvelope
          onClick={() => {
            playAirlockPneumatic();
            setContactModalOpen(true);
          }}
        />
      </React.Suspense>

      {/* Global Interactive Dispatch Modal Popup */}
      {contactModalOpen && (
        <React.Suspense fallback={null}>
          <ContactModal
            isOpen={contactModalOpen}
            onClose={() => setContactModalOpen(false)}
            showToast={showToast}
          />
        </React.Suspense>
      )}

      {/* Floating Toast Notification */}
      {toastVisible && (
        <div className="toast-notice" role="status" aria-live="polite">
          <Check size={16} color="#ffaa00" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
