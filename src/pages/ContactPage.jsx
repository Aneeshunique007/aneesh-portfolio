import React, { useEffect } from 'react';
import { Mail, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from '../components/Icons';
import InteractiveEnvelope from '../components/InteractiveEnvelope';
import { playQuantumTick } from '../utils/audio';
import './ContactPage.css';

export default function ContactPage({ showToast }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="contact-praetor-page">
      {/* ── STAGE 1: Mission Command Uplink Header ── */}
      <section className="contact-hero-dossier">
        <div className="contact-dossier-wrap">
          <div className="contact-status-pill">
            <span className="status-orb-argent" />
            <span>STATUS: ARMED // DIRECT MISSION DISPATCH PROTOCOL</span>
          </div>

          <h1 className="contact-page-title">DIRECT MISSION DISPATCH</h1>
          <div className="contact-page-subtitle">
            ENTERPRISE BRIEFINGS // GLOBAL DIRECT UPLINK
          </div>

          <p className="contact-bio-lead">
            Have a mission-critical AI platform to architect, an enterprise multimodal document pipeline to deploy,
            or an engineering leadership mandate? Transmit your technical brief directly or unseal the Praetor wax seal below.
          </p>

          {/* Real-time Telemetry Grid */}
          <div className="contact-telemetry-grid">
            <div className="contact-telemetry-card">
              <div className="card-top-icon">
                <Clock size={15} />
                <span className="telemetry-card-tag">RESPONSE SLA</span>
              </div>
              <span className="telemetry-card-val">&lt; 24 HOURS</span>
              <span className="telemetry-card-sub">PRIORITY DISPATCH PROTOCOL</span>
            </div>

            <div className="contact-telemetry-card">
              <div className="card-top-icon">
                <Mail size={15} />
                <span className="telemetry-card-tag">DIRECT ENCRYPTED UPLINK</span>
              </div>
              <span className="telemetry-card-val email-val">aneeshusunique@gmail.com</span>
              <span className="telemetry-card-sub">DIRECT INBOX ACCESS</span>
            </div>

            <div className="contact-telemetry-card">
              <div className="card-top-icon">
                <ShieldCheck size={15} />
                <span className="telemetry-card-tag">MISSION AVAILABILITY</span>
              </div>
              <span className="telemetry-card-val">SELECT MANDATES</span>
              <span className="telemetry-card-sub">PRODUCTION ARCHITECTURES</span>
            </div>

            <div className="contact-telemetry-card">
              <div className="card-top-icon">
                <MapPin size={15} />
                <span className="telemetry-card-tag">BASE OF OPERATIONS</span>
              </div>
              <span className="telemetry-card-val">GLOBAL // DISTRIBUTED</span>
              <span className="telemetry-card-sub">ASYNCHRONOUS HIGH-VELOCITY DISPATCH</span>
            </div>
          </div>

          {/* Social Channels Relay Strip */}
          <div className="contact-channels-strip">
            <span className="channels-label">TACTICAL COMMS RELAY //</span>
            <div className="channels-pill-row">
              <a
                href="https://www.linkedin.com/in/aneesh-u-s/"
                target="_blank"
                rel="noopener noreferrer"
                className="chan-link-pill"
                onClick={playQuantumTick}
              >
                <LinkedinIcon size={14} />
                <span>LINKEDIN</span>
              </a>

              <a
                href="https://github.com/Aneeshunique007"
                target="_blank"
                rel="noopener noreferrer"
                className="chan-link-pill"
                onClick={playQuantumTick}
              >
                <GithubIcon size={14} />
                <span>GITHUB</span>
              </a>

              <a
                href="https://www.instagram.com/__b_a_d_b_o_y__007/"
                target="_blank"
                rel="noopener noreferrer"
                className="chan-link-pill"
                onClick={playQuantumTick}
              >
                <InstagramIcon size={14} />
                <span>INSTAGRAM</span>
              </a>

              <a
                href="mailto:aneeshusunique@gmail.com"
                className="chan-link-pill"
                onClick={playQuantumTick}
              >
                <Mail size={14} />
                <span>DIRECT EMAIL</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STAGE 2: Interactive Tactile DOOM Praetor Envelope ── */}
      <section className="contact-interactive-section">
        <div className="section-label-center">
          <span className="section-dot-red" />
          <span className="section-label-text">
            TACTILE MISSION BRIEF // UNSEAL WAX SEAL TO TRANSMIT DIRECT SPECIFICATION
          </span>
        </div>
        <InteractiveEnvelope showToast={showToast} compact={false} />
      </section>

      {/* ── Bottom Telemetry Footer Strip ── */}
      <footer className="contact-bottom-strip">
        <span>ENGINEERED FOR PRODUCTION // GLOBAL ENTERPRISE UPLINK</span>
        <span className="strip-dot">•</span>
        <span>ALL SYSTEMS OPERATIONAL // 2026</span>
      </footer>
    </main>
  );
}
