import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, toggleTheme, className = '' }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <span className="theme-toggle-icon-wrap">
        {isDark ? (
          <Sun size={19} className="theme-icon sun-icon" />
        ) : (
          <Moon size={19} className="theme-icon moon-icon" />
        )}
      </span>
      <span className="theme-toggle-sr">Toggle theme</span>
    </button>
  );
}
