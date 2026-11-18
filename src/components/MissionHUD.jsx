import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';
import RollingText from './RollingText';
import {
  playQuantumTick,
  playAirlockPneumatic,
  toggleGravityDrone,
  isDroneRunning,
  toggleAudioMute,
  getAudioMuted,
} from '../utils/audio';
import './MissionHUD.css';

const NAV_ITEMS = [
  { id: 'hero', label: '01 OVERVIEW', progress: 0.0, path: '/', sub: 'Identity & Neural Environment' },
  { id: 'missions', label: '02 WORK', progress: null, path: '/work', sub: 'Production Deep Learning & Multimodal Systems' },
  { id: 'about', label: '03 ABOUT', progress: null, path: '/about', sub: 'Interactive Cartographic Mosaic Map & Dossier' },
  { id: 'tesseract', label: '04 ARSENAL', progress: 0.80, path: '/', sub: '5D Stack & Engineering Flight Recorder' },
  { id: 'comm', label: '05 UPLINK', progress: 0.96, path: '/', sub: 'Tactical Q&A & Dispatch Envelope' },
];

export default function MissionHUD({ onReplayIntro }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [droneActive, setDroneActive] = useState(() => isDroneRunning());
  const [activeSection, setActiveSection] = useState('hero');

  const currentActiveNav = location.pathname === '/about' 
    ? 'about' 
    : location.pathname.startsWith('/work') 
      ? 'missions' 
      : activeSection;

  // Sync HUD audio pill state with real-time player status
  useEffect(() => {
    const timer = setInterval(() => {
      setDroneActive(isDroneRunning());
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const track = document.querySelector('.interstellar-voyage-track');
      if (track) {
        const rect = track.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        if (scrollable > 0) {
          const p = Math.max(0, Math.min(1, -rect.top / scrollable));
          if (p < 0.38) setActiveSection('hero');
          else if (p < 0.68) setActiveSection('missions');
          else if (p < 0.88) setActiveSection('tesseract');
          else setActiveSection('comm');
          return;
        }
      }

      const sections = ['hero', 'missions', 'tesseract', 'comm'];
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (sectionId) => {
    playQuantumTick();
    setMenuOpen(false);

    const item = NAV_ITEMS.find((n) => n.id === sectionId);
    if (!item) return;

    if (item.id === 'about') {
      navigate('/about');
      return;
    }

    if (item.id === 'missions') {
      navigate('/work');
      return;
    }

    if (item.id === 'hero') {
      if (location.pathname !== '/' || location.search) {
        navigate('/');
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    if (location.pathname !== '/') {
      navigate(`/?section=${item.id}`);
      return;
    }

    const track = document.querySelector('.interstellar-voyage-track');
    if (track && item.progress !== null) {
      const scrollable = track.scrollHeight - window.innerHeight;
      if (scrollable > 0) {
        window.scrollTo({
          top: item.progress * scrollable,
          behavior: 'smooth',
        });
        return;
      }
    }
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSoundToggle = () => {
    playAirlockPneumatic();
    if (getAudioMuted()) {
      toggleAudioMute();
    }
    const running = toggleGravityDrone();
    setDroneActive(running);
  };

  return (
    <header className="mission-hud-persistent" role="banner">
      <div className="mission-hud-container">
        {/* Left: Brand Identity & Coordinates */}
        <div className="hud-brand-cluster">
          <button
            type="button"
            className="hud-callsign-btn"
            onClick={() => handleNavClick('hero')}
            aria-label="Return to Hero"
          >
            <span className="hud-blip-gold" />
            <span className="hud-callsign">ANEESH U S</span>
          </button>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hud-nav-dock" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`hud-nav-item ${currentActiveNav === item.id ? 'is-active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <RollingText text={item.label} brackets />
            </button>
          ))}
        </nav>

        {/* Right: Audio Controls & Replay */}
        <div className="hud-controls-cluster">
          {/* Standard Speaker Audio Toggle */}
          <button
            type="button"
            className={`hud-audio-btn ${droneActive ? 'is-active' : ''}`}
            onClick={handleSoundToggle}
            title={droneActive ? 'Mute Sound / Stop Soundtrack' : 'Unmute Sound / Play Interstellar Theme'}
            aria-label={droneActive ? 'Mute sound' : 'Unmute sound'}
          >
            {droneActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Replay Intro */}
          {onReplayIntro && (
            <button
              type="button"
              className="hud-action-pill launch-replay"
              onClick={() => {
                playAirlockPneumatic();
                onReplayIntro();
              }}
              title="Replay Opening Sequence"
            >
              <span>REPLAY INTRO</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className={`hud-mobile-toggle ${menuOpen ? 'is-open' : ''}`}
            onClick={() => {
              playQuantumTick();
              setMenuOpen((prev) => !prev);
            }}
            aria-label="Toggle Navigation Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="hud-mobile-drawer" role="dialog" aria-modal="true">
          <div className="mobile-drawer-header">
            <span className="drawer-title">NAVIGATION MENU</span>
          </div>

          <div className="mobile-drawer-links">
            {NAV_ITEMS.map((link) => (
              <button
                key={link.id}
                type="button"
                className="mobile-link-item"
                onClick={() => handleNavClick(link.id)}
              >
                <span className="mobile-link-label">{link.label}</span>
                <span className="mobile-link-sub">{link.sub}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
