import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { playMechanicalClick } from '../utils/audio';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleReturn = (e) => {
    e.preventDefault();
    playMechanicalClick();
    navigate('/');
  };

  return (
    <div className="notfound-screen">
      <div className="notfound-container">
        <div className="notfound-tag">
          <AlertCircle size={14} color="#08090c" />
          <span>EXCEPTION: GRADIENT_EXPLOSION_AT_LATENT_SPACE</span>
        </div>

        <h1 className="notfound-title">
          404 <span className="notfound-italic">// Diverged to NaN</span>
        </h1>

        <p className="notfound-desc">
          You navigated outside the manifold. The requested route does not exist in this model weights checkpoint.
        </p>

        {/* Witty AI Diagnostics Terminal */}
        <div className="notfound-terminal">
          <div className="terminal-header">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
            <span className="terminal-file">diagnostics.py --eval-route</span>
          </div>
          <div className="terminal-body">
            <p className="log-line"><code>[SYS_WARN]</code> Model perplexity: ∞</p>
            <p className="log-line"><code>[SYS_WARN]</code> Cosine similarity to valid URL: 0.000</p>
            <p className="log-line"><code>[RECOVERY]</code> Re-initializing learning rate to 0.0001...</p>
            <p className="log-line"><code>[RECOMMEND]</code> Return to global minima immediately.</p>
          </div>
        </div>

        <div className="notfound-actions">
          <button onClick={handleReturn} className="btn-primary">
            <RotateCcw size={16} />
            Re-Converge Back to Atelier
          </button>
        </div>
      </div>
    </div>
  );
}
