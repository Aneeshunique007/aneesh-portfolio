import React, { useState } from 'react';
import { Mail, Copy, Check, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import {
  playQuantumTick,
  playAirlockPneumatic,
  playGravitationalPulse,
} from '../utils/audio';
import RollingText from './RollingText';
import './InteractiveEnvelope.css';

export default function InteractiveEnvelope({
  showToast,
  compact = false,
  initialOpen = false,
  onClose,
  isModal = false,
}) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const myEmail = 'aneeshusunique@gmail.com';

  const toggleEnvelope = (newState) => {
    playAirlockPneumatic();
    setIsOpen(newState);
    if (!newState && onClose) {
      onClose();
    }
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    playQuantumTick();
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    if (showToast) showToast('COPIED aneeshusunique@gmail.com TO CLIPBOARD');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    playGravitationalPulse();

    const subject = encodeURIComponent(`Praetor Mission Brief from ${formData.name || 'Enterprise Partner'}`);
    const body = encodeURIComponent(
      `Hi Aneesh,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    );
    window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;

    setFormSent(true);
    if (showToast) showToast('MISSION TRANSMITTED // LAUNCHING DISPATCH CLIENT');
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className={`praetor-envelope-section ${compact ? 'is-compact' : ''} ${isModal ? 'is-modal-envelope' : ''}`}>
      {/* Quick Action Bar (Only shown on standalone page and compact section, NOT in modal) */}
      {!isModal && (
        <div className="praetor-quick-cta-row">
          <button
            type="button"
            className="praetor-unseal-btn"
            onClick={() => toggleEnvelope(!isOpen)}
          >
            <RollingText
              text={isOpen ? '[ ✕ TUCK MISSION BRIEF ]' : '[ ◈ UNSEAL PRAETOR ENVELOPE ]'}
              brackets
            />
          </button>

          <button type="button" className="praetor-copy-pill" onClick={handleCopy}>
            <Mail size={13} />
            <span>{myEmail}</span>
            <span className="praetor-copy-tag">{copied ? 'COPIED ◈' : 'COPY'}</span>
          </button>
        </div>
      )}

      {/* ── STAGE 7 PART B: Interactive Tactile DOOM Praetor Envelope ── */}
      <div className="envelope-stage-container">
        <div
          className={`origami-envelope ${isOpen ? 'envelope-is-open' : ''}`}
          onClick={() => !isOpen && toggleEnvelope(true)}
        >
          {/* Top Flap with Molten Argent Gradient (Hidden in modal mode) */}
          {!isModal && (
            <div className="envelope-flap">
              <div
                className="envelope-wax-seal"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEnvelope(!isOpen);
                }}
                title={isOpen ? 'Reseal envelope' : 'Break Praetor seal'}
              >
                <div className="wax-inner">
                  <span className="wax-initials">AU</span>
                  <span className="wax-label">{isOpen ? 'RESEAL' : 'UNSEAL'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Mission Dispatch Letter Inside */}
          <div className="envelope-letter" onClick={(e) => e.stopPropagation()}>
            <div className="letter-header">
              <div className="letter-postage-stamp">
                <span>PRAETOR</span>
                <small>61,320&times; RATIO</small>
              </div>
              <div className="letter-greeting">
                <span className="letter-to">TO: ANEESH U S</span>
                <span className="letter-role">AI Systems Architect &bull; Global Distributed</span>
              </div>
              {!isModal && (
                <button
                  type="button"
                  className="letter-close-btn"
                  onClick={() => toggleEnvelope(false)}
                  title="Tuck letter back"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="letter-body">
              <p className="letter-intro">
                &ldquo;Detail the enterprise latency bottleneck, multimodal OCR challenge, or custom ML architecture. We engineer combat-ready systems that annihilate manual friction.&rdquo;
              </p>

              {/* Direct Fast Copy Chip */}
              <div className="letter-email-chip">
                <Mail size={15} />
                <span className="chip-address">{myEmail}</span>
                <button
                  type="button"
                  className="chip-copy-btn"
                  onClick={handleCopy}
                  title="Copy email address"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>

              {/* Interactive Mission Dispatch Form */}
              <form onSubmit={handleFormSubmit} className="letter-quick-form">
                <div className="form-row-duo">
                  <input
                    type="text"
                    placeholder="Your Name / Organization"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Work Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <textarea
                  rows={compact ? 2 : 3}
                  placeholder="Describe the engineering challenge, contract scope, or model deployment..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />

                <div className="letter-form-footer">
                  <button type="submit" className="letter-send-btn">
                    <span>{formSent ? 'TRANSMITTING...' : 'TRANSMIT MISSION BRIEF'}</span>
                    <Send size={14} />
                  </button>

                  {!compact && (
                    <div className="letter-social-row">
                      <a
                        href="https://www.linkedin.com/in/aneesh-u-s/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="letter-social-icon"
                        title="LinkedIn Profile"
                        onClick={playQuantumTick}
                      >
                        <LinkedinIcon size={15} />
                      </a>
                      <a
                        href="https://github.com/Aneeshunique007"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="letter-social-icon"
                        title="GitHub Profile"
                        onClick={playQuantumTick}
                      >
                        <GithubIcon size={15} />
                      </a>
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="letter-postscript">
              <span className="ps-handwritten">PRAETOR TELEMETRY // CONFIDENTIAL DIRECT DISPATCH</span>
            </div>
          </div>

          {/* Envelope Front Pocket with Praetor Armor Styling (Hidden in modal mode) */}
          {!isModal && (
            <div className="envelope-pocket">
              <div className="envelope-pocket-label">
                <span>// PRAETOR MISSION DISPATCH &bull; ANEESH U S</span>
                {!isOpen && (
                  <div className="envelope-prompt-tap">
                    <span>[ TAP WAX SEAL TO UNSEAL ]</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
