import React, { useState } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Sparkles, Check } from 'lucide-react';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3200);
  };

  return (
    <div className="portfolio-app" data-theme={theme}>
      {/* Floating Sticky Nav that appears on scroll */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        {/* Hero Section matching the reference layout */}
        <Hero showToast={showToast} theme={theme} toggleTheme={toggleTheme} />

        {/* 01 // About Me */}
        <About showToast={showToast} />

        {/* 02 // Capabilities / Skills */}
        <Skills />

        {/* 03 // Featured Work / Projects */}
        <Projects showToast={showToast} />

        {/* 04 // Journey / Career Milestones */}
        <Experience />

        {/* 05 // Get in Touch / Contact */}
        <Contact showToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Toast Notification */}
      {toastVisible && (
        <div className="toast-notice" role="status" aria-live="polite">
          <Check size={16} color="#FF4A17" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
