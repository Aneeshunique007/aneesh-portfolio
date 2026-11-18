import React, { useEffect, useRef, useCallback } from 'react';
import { registerExternalPlayer, unregisterExternalPlayer } from '../utils/audio';

/**
 * InterstellarAudioPlayer
 * Plays the downloaded official Hans Zimmer Interstellar Main Theme locally
 * from /audio/interstellar-theme.mp3 (pre-trimmed from 0:20 onwards) with zero latency.
 */
export default function InterstellarAudioPlayer({ onTrackChange }) {
  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.volume = 0.85;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isPlayingRef.current = true;
            try {
              localStorage.setItem('portfolio_audio_enabled', 'true');
            } catch {
              // ignore
            }
            if (onTrackChange) onTrackChange(true);
          })
          .catch(() => {
            isPlayingRef.current = false;
            if (onTrackChange) onTrackChange(false);
          });
      }
      return true;
    } catch {
      return false;
    }
  }, [onTrackChange]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      audio.pause();
      isPlayingRef.current = false;
      try {
        localStorage.setItem('portfolio_audio_enabled', 'false');
      } catch {
        // ignore
      }
      if (onTrackChange) onTrackChange(false);
      return true;
    } catch {
      return false;
    }
  }, [onTrackChange]);

  const toggle = useCallback(() => {
    if (isPlayingRef.current) {
      pause();
      return false;
    } else {
      play();
      return true;
    }
  }, [play, pause]);

  const isCurrentlyPlaying = useCallback(() => isPlayingRef.current, []);

  // Register with global audio manager so MissionHUD toggles this player seamlessly
  useEffect(() => {
    registerExternalPlayer({
      play,
      pause,
      toggle,
      isPlaying: isCurrentlyPlaying,
    });

    // Auto-resume audio on first user gesture if previously enabled by the user
    let userGestureHandler = null;
    try {
      if (localStorage.getItem('portfolio_audio_enabled') === 'true') {
        userGestureHandler = () => {
          if (!isPlayingRef.current) {
            play();
          }
          cleanupGestureListeners();
        };

        const cleanupGestureListeners = () => {
          window.removeEventListener('pointerdown', userGestureHandler);
          window.removeEventListener('keydown', userGestureHandler);
          window.removeEventListener('touchstart', userGestureHandler);
        };

        window.addEventListener('pointerdown', userGestureHandler, { once: true, passive: true });
        window.addEventListener('keydown', userGestureHandler, { once: true, passive: true });
        window.addEventListener('touchstart', userGestureHandler, { once: true, passive: true });
      }
    } catch {
      // ignore
    }

    return () => {
      unregisterExternalPlayer();
      if (userGestureHandler) {
        window.removeEventListener('pointerdown', userGestureHandler);
        window.removeEventListener('keydown', userGestureHandler);
        window.removeEventListener('touchstart', userGestureHandler);
      }
    };
  }, [play, pause, toggle, isCurrentlyPlaying]);

  return (
    <audio
      ref={audioRef}
      src="/audio/interstellar-theme.mp3"
      preload="none"
      loop
      onPlay={() => {
        isPlayingRef.current = true;
        if (onTrackChange) onTrackChange(true);
      }}
      onPause={() => {
        isPlayingRef.current = false;
        if (onTrackChange) onTrackChange(false);
      }}
      onEnded={() => {
        isPlayingRef.current = false;
        if (onTrackChange) onTrackChange(false);
      }}
      style={{ display: 'none' }}
    />
  );
}

