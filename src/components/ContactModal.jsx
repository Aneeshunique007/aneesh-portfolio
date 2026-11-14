import React, { useEffect } from 'react';
import InteractiveEnvelope from './InteractiveEnvelope';
import RollingText from './RollingText';
import { playQuantumTick, playAirlockPneumatic } from '../utils/audio';
import './ContactModal.css';

export default function ContactModal({ isOpen, onClose, showToast }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scroll behind modal
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        playAirlockPneumatic();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="contact-modal-backdrop"
      onClick={() => {
        playAirlockPneumatic();
        onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      data-lenis-prevent
    >
      <div
        className="contact-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        {/* Modal Top Bar */}
        <div className="contact-modal-header">
          <div className="contact-modal-badge">
            <span className="contact-modal-orb" />
            <span id="contact-modal-title" className="contact-modal-title">
              DIRECT UPLINK // PRAETOR DISPATCH MODAL
            </span>
          </div>

          <button
            type="button"
            className="contact-modal-close-btn"
            onClick={() => {
              playQuantumTick();
              onClose();
            }}
            aria-label="Close Contact Modal"
          >
            <RollingText text="[ ESC / CLOSE ✕ ]" />
          </button>
        </div>

        {/* Modal Body: Tactile Origami Envelope Unsealed */}
        <div className="contact-modal-body" data-lenis-prevent>
          <InteractiveEnvelope
            showToast={showToast}
            initialOpen={true}
            isModal={true}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}
