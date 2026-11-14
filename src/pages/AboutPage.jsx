import React, { useEffect } from 'react';
import { Mail } from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from '../components/Icons';
import MosaicMap from '../components/MosaicMap';
import RollingText from '../components/RollingText';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import { playQuantumTick, playMechanicalClick } from '../utils/audio';
import './AboutPage.css';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="about-mosaic-page">
      {/* Biographical Hero Dossier Header */}
      <section className="about-hero-dossier">
        <div className="about-dossier-grid">
          {/* Left Column: Mission Profile & Telemetry Narrative */}
          <div className="about-profile-col">
            <div className="about-status-pill">
              <span className="status-orb-argent" />
              <span>PILOT DOSSIER // BIOGRAPHICAL RECONNAISSANCE</span>
            </div>

            <h1 className="about-pilot-name">ANEESH U S</h1>
            <div className="about-role-title">MACHINE LEARNING ARCHITECT // GLOBAL ENGINEERING TRAJECTORY</div>

            <p className="about-bio-lead">
              AI Architect specializing in multimodal OCR, high-dimensional vector search,
              and distributed GPU pipelines. Built for brutal enterprise production constraints — zero demo toys.
            </p>

            {/* Global Telemetry Stats */}
            <div className="about-corridor-grid">
              <div className="corridor-card">
                <span className="corridor-card-tag">MISSION CORRIDOR</span>
                <span className="corridor-card-val">GLOBAL DISTRIBUTED</span>
                <span className="corridor-card-sub">HIGH-VELOCITY ASYNC DISPATCH</span>
              </div>

              <div className="corridor-card">
                <span className="corridor-card-tag">COMPUTE RIG</span>
                <span className="corridor-card-val">DUAL RTX 4090s</span>
                <span className="corridor-card-sub">48GB FP16 // DISTRIBUTED PYTORCH</span>
              </div>

              <div className="corridor-card">
                <span className="corridor-card-tag">LATENCY CRUSH</span>
                <span className="corridor-card-val">40M → &lt;15 SEC</span>
                <span className="corridor-card-sub">MULTIMODAL MLIT VECTOR SYNTHESIS</span>
              </div>

              <div className="corridor-card">
                <span className="corridor-card-tag">RELIABILITY</span>
                <span className="corridor-card-val">99.98% UPTIME</span>
                <span className="corridor-card-sub">CONTAINERIZED AZURE CLUSTERS</span>
              </div>
            </div>

            {/* Tactical Social Uplink Deck */}
            <div className="about-social-deck">
              <span className="about-social-label">UPLINK CHANNELS //</span>
              <div className="about-social-links">
                <a
                  href="https://www.linkedin.com/in/aneesh-u-s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-social-btn"
                  title="Connect on LinkedIn"
                  onClick={() => playMechanicalClick()}
                >
                  <LinkedinIcon size={13} />
                  <span>LINKEDIN</span>
                </a>
                <a
                  href="https://github.com/Aneeshunique007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-social-btn"
                  title="Inspect GitHub"
                  onClick={() => playMechanicalClick()}
                >
                  <GithubIcon size={13} />
                  <span>GITHUB</span>
                </a>
                <a
                  href="https://www.instagram.com/__b_a_d_b_o_y__007/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-social-btn"
                  title="Follow on Instagram"
                  onClick={() => playMechanicalClick()}
                >
                  <InstagramIcon size={13} />
                  <span>INSTAGRAM</span>
                </a>
                <a
                  href="mailto:aneeshusunique@gmail.com"
                  className="about-social-btn"
                  title="Direct Dispatch"
                  onClick={() => playMechanicalClick()}
                >
                  <Mail size={13} />
                  <span>MAIL</span>
                </a>
              </div>
            </div>

            {/* Scroll Lead-in to Cartographic Mosaic */}
            <div className="about-scroll-cta-wrap">
              <button
                type="button"
                className="about-scroll-cta-btn"
                onClick={() => {
                  playQuantumTick();
                  const target = document.querySelector('.mosaic-frame-scrubber-track');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="cta-arrow">&darr;</span>
                <RollingText text="COMMENCE CARTOGRAPHIC MOSAIC MAP" brackets />
              </button>
            </div>
          </div>

          {/* Right Column: Tactical Cyberpunk Cutout Portrait Card */}
          <div className="about-portrait-col">
            <div className="about-portrait-frame">
              {/* Tactical Reticle Corners */}
              <span className="reticle top-left">┌</span>
              <span className="reticle top-right">┐</span>
              <span className="reticle bottom-left">└</span>
              <span className="reticle bottom-right">┘</span>

              {/* Ambient Red/Gold Backlight Spotlight */}
              <div className="about-portrait-glow" />

              {/* Cutout Portrait Image */}
              <img
                src="/aneesh-portrait.png"
                alt="Aneesh U S — Machine Learning Architect"
                className="about-portrait-img"
              />

              {/* Bottom Holographic Telemetry Tag */}
              <div className="about-portrait-badge">
                <span className="badge-pulse-dot" />
                <span>ARCHITECT IDENT // BIOMETRIC VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAGE 1: Pinned Cartographic Mosaic Sequence */}
      <MosaicMap />

      {/* STAGE 2: Technical Arsenal & Career Orbit Trajectory */}
      <section className="about-extended-content">
        <Skills />
        <Experience />
      </section>
    </main>
  );
}
