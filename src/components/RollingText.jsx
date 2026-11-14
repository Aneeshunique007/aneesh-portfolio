import React from 'react';
import './RollingText.css';

export default function RollingText({ text, brackets = false, className = '' }) {
  const chars = Array.from(text);

  return (
    <span className={`roll-text-wrap ${className}`}>
      {brackets && <span className="roll-bracket">[</span>}
      <span className="roll-text-mask" aria-label={text}>
        <span className="roll-line roll-line-top" aria-hidden="true">
          {chars.map((ch, i) => (
            <span
              key={`t-${i}`}
              className="roll-char"
              style={{ '--i': i }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </span>
        <span className="roll-line roll-line-bottom" aria-hidden="true">
          {chars.map((ch, i) => (
            <span
              key={`b-${i}`}
              className="roll-char"
              style={{ '--i': i }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </span>
      </span>
      {brackets && <span className="roll-bracket">]</span>}
    </span>
  );
}

