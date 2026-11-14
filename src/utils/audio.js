// ==========================================================================
// INTERSTELLAR NATIVE WEB AUDIO SYNTHESIZER
// 100% Procedural Web Audio API — Zero MP3 downloads, zero bandwidth overhead.
// TARS clicks, Murphy's watch quantum ticks, airlock hiss & deep gravity drone.
// ==========================================================================

let audioCtx = null;
let isMuted = false;

function getContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Tactical cyber-lock reticle snap (DOOM Praetor cybernetic telemetry impulse)
export const playQuantumTick = () => {
  if (isMuted) return;
  try {
    const ctx = getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.022);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.022);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.022);
  } catch {
    // Ignore audio errors gracefully
  }
};

// Pressurized industrial hydraulic airlock release (high-pressure pneumatic purge)
export const playAirlockPneumatic = () => {
  if (isMuted) return;
  try {
    const ctx = getContext();
    if (!ctx) return;
    const bufferSize = Math.floor(ctx.sampleRate * 0.14);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.32));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.14);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.14);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch {
    // Ignore audio errors
  }
};

// Molten Argent Plasma Sub-Bass Blast (immense low-frequency power drop)
export const playGravitationalPulse = () => {
  if (isMuted) return;
  try {
    const ctx = getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.48);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.48);

    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.48);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.48);
  } catch {
    // Ignore audio errors
  }
};

// Standard TARS terminal mechanical click
export const playMechanicalClick = () => {
  playQuantumTick();
};

export const playPaperSlide = () => {
  playAirlockPneumatic();
};

// ==========================================================================
// HANS ZIMMER INTERSTELLAR THEME SYNTHESIZER (100% PROCEDURAL WEB AUDIO API)
// Cathedral pipe organ ranks, arpeggiated clockwork piano, Murphy's 1.25s watch tick,
// and cavernous Temple Church reverb simulation. Zero MP3s, zero network latency.
// Supports official YouTube recording integration (kpz8lpoLvrA from 0:20).
// ==========================================================================

let externalPlayer = null;

export const registerExternalPlayer = (player) => {
  externalPlayer = player;
};

export const unregisterExternalPlayer = () => {
  externalPlayer = null;
};

let isThemeActive = false;
let themeMasterGain = null;
let schedulerTimer = null;
let watchTimer = null;

// Reverb network simulating the iconic Temple Church in London
function createCathedralReverb(ctx) {
  const input = ctx.createGain();
  const output = ctx.createGain();

  const delay1 = ctx.createDelay();
  delay1.delayTime.value = 0.36;
  const delay2 = ctx.createDelay();
  delay2.delayTime.value = 0.52;

  const feedback = ctx.createGain();
  feedback.gain.value = 0.44;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 2400;

  input.connect(delay1);
  delay1.connect(filter);
  filter.connect(delay2);
  delay2.connect(feedback);
  feedback.connect(input);

  input.connect(output);
  delay1.connect(output);
  delay2.connect(output);

  return { input, output };
}

// Single Cathedral Pipe Organ Rank Voice
function playOrganVoice(ctx, dest, freq, startTime, duration, vol = 0.08) {
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const osc3 = ctx.createOscillator();
  const gain = ctx.createGain();

  // Fundamental (Triangle for rich pipe harmonics)
  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(freq, startTime);

  // Octave Rank (Sine for air clarity)
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2, startTime);

  // 12th Rank (Subtle fifth overtone for grand cathedral registration)
  osc3.type = 'sine';
  osc3.frequency.setValueAtTime(freq * 3, startTime);

  // Pipe organ swelling attack and slow acoustic release
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(vol, startTime + 0.16);
  gain.gain.setValueAtTime(vol * 0.9, startTime + duration - 0.2);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.6);

  osc1.connect(gain);
  osc2.connect(gain);
  osc3.connect(gain);
  gain.connect(dest);

  osc1.start(startTime);
  osc2.start(startTime);
  osc3.start(startTime);
  osc1.stop(startTime + duration + 0.65);
  osc2.stop(startTime + duration + 0.65);
  osc3.stop(startTime + duration + 0.65);
}

// Bright Glass Piano Arpeggio Pluck (Cornfield Chase / First Step)
function playArpPluck(ctx, dest, freq, startTime, vol = 0.065) {
  const osc = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, startTime);

  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(vol, startTime + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.48);

  osc.connect(gain);
  osc2.connect(gain);
  gain.connect(dest);

  osc.start(startTime);
  osc2.start(startTime);
  osc.stop(startTime + 0.5);
  osc2.stop(startTime + 0.5);
}

// Murphy's Watch Quantum Clock Tick (every 1.25s on Miller's planet)
function playWatchTick(ctx, dest, time) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(3400, time);
  osc.frequency.exponentialRampToValueAtTime(450, time + 0.018);

  gain.gain.setValueAtTime(0.035, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.018);

  osc.connect(gain);
  gain.connect(dest);

  osc.start(time);
  osc.stop(time + 0.02);
}

// The Hans Zimmer Interstellar Harmonic Cycle
// Am -> F -> C -> G/Em (A minor progression)
const CHORD_PROGRESSION = [
  {
    // A minor (First Step / Cornfield Chase)
    organChords: [110.0, 220.0, 261.63, 329.63], // A2, A3, C4, E4
    arpNotes: [220.0, 261.63, 329.63, 440.0, 523.25, 659.25, 523.25, 440.0],
    melody: { note: 659.25, duration: 1.25, tailNote: 587.33, tailDur: 0.45 }, // E5 -> D5
  },
  {
    // F major
    organChords: [87.31, 174.61, 261.63, 349.23], // F2, F3, C4, F4
    arpNotes: [174.61, 220.0, 261.63, 349.23, 440.0, 523.25, 440.0, 349.23],
    melody: { note: 523.25, duration: 1.25, tailNote: 493.88, tailDur: 0.45 }, // C5 -> B4
  },
  {
    // C major
    organChords: [65.41, 130.81, 196.0, 261.63, 329.63], // C2, C3, G3, C4, E4
    arpNotes: [130.81, 196.0, 261.63, 329.63, 392.0, 523.25, 392.0, 329.63],
    melody: { note: 392.0, duration: 1.25, tailNote: 440.0, tailDur: 0.45 }, // G4 -> A4
  },
  {
    // G / E minor
    organChords: [82.41, 164.81, 246.94, 293.66, 392.0], // E2, E3, B3, D4, G4
    arpNotes: [164.81, 246.94, 329.63, 392.0, 493.88, 659.25, 493.88, 392.0],
    melody: { note: 493.88, duration: 1.0, tailNote: 587.33, tailDur: 0.65 }, // B4 -> D5
  },
];

export const toggleGravityDrone = () => {
  return toggleInterstellarTheme();
};

export const isDroneRunning = () => {
  if (externalPlayer && typeof externalPlayer.isPlaying === 'function') {
    return externalPlayer.isPlaying();
  }
  return isThemeActive;
};

export const toggleInterstellarTheme = () => {
  if (externalPlayer) {
    return externalPlayer.toggle();
  }
  try {
    const ctx = getContext();
    if (!ctx) return false;

    if (isThemeActive) {
      stopInterstellarTheme();
      return false;
    }

    if (isMuted) return false;
    startInterstellarTheme();
    return true;
  } catch {
    return false;
  }
};

export const startInterstellarTheme = () => {
  if (externalPlayer) {
    return externalPlayer.play(20);
  }
  try {
    const ctx = getContext();
    if (!ctx || isThemeActive) return;

    // Master bus with smooth fade-in
    themeMasterGain = ctx.createGain();
    themeMasterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    themeMasterGain.gain.linearRampToValueAtTime(0.85, ctx.currentTime + 1.8);

    const cathedral = createCathedralReverb(ctx);
    cathedral.output.connect(themeMasterGain);
    themeMasterGain.connect(ctx.destination);

    isThemeActive = true;

    // Timing parameters: 132 BPM (0.227s per eighth note)
    const stepDuration = 0.225;
    const barDuration = stepDuration * 8; // 1.8s per measure
    let currentBarIndex = 0;
    let loopCycle = 0;
    let nextBarTime = ctx.currentTime + 0.1;

    // Schedule 1 bar ahead in a robust interval loop
    const scheduleAhead = () => {
      if (!isThemeActive || !ctx) return;

      while (nextBarTime < ctx.currentTime + 1.5) {
        const chordIdx = currentBarIndex % CHORD_PROGRESSION.length;
        const chordData = CHORD_PROGRESSION[chordIdx];
        const barStart = nextBarTime;

        // 1. Swelling Cathedral Pipe Organ Chords
        chordData.organChords.forEach((freq) => {
          const organVol = loopCycle >= 1 ? 0.075 : 0.045;
          playOrganVoice(ctx, cathedral.input, freq, barStart, barDuration * 0.98, organVol);
        });

        // 2. Ascending Piano Clockwork Arpeggio (8 eighth notes)
        chordData.arpNotes.forEach((freq, stepIdx) => {
          const noteTime = barStart + stepIdx * stepDuration;
          const arpVol = loopCycle >= 1 ? 0.06 : 0.04;
          playArpPluck(ctx, cathedral.input, freq, noteTime, arpVol);
        });

        // 3. High Soaring Zimmer Melody (joins in from cycle 1 onwards)
        if (loopCycle >= 1 && chordData.melody) {
          const m = chordData.melody;
          playOrganVoice(ctx, cathedral.input, m.note, barStart + 0.05, m.duration, 0.095);
          if (m.tailNote) {
            playOrganVoice(ctx, cathedral.input, m.tailNote, barStart + m.duration + 0.05, m.tailDur, 0.085);
          }
        }

        // Advance to next bar
        nextBarTime += barDuration;
        currentBarIndex++;
        if (currentBarIndex % CHORD_PROGRESSION.length === 0) {
          loopCycle++;
        }
      }
    };

    schedulerTimer = setInterval(scheduleAhead, 250);
    scheduleAhead();

    // 4. Murphy's Watch 1.25s Tick (synced clockwork heartbeat)
    let nextWatchTime = ctx.currentTime + 0.2;
    const scheduleWatch = () => {
      if (!isThemeActive || !ctx) return;
      while (nextWatchTime < ctx.currentTime + 1.5) {
        playWatchTick(ctx, themeMasterGain, nextWatchTime);
        nextWatchTime += 1.25; // 1.25 seconds per tick
      }
    };

    watchTimer = setInterval(scheduleWatch, 300);
    scheduleWatch();

    return true;
  } catch {
    isThemeActive = false;
    return false;
  }
};

export const stopInterstellarTheme = () => {
  if (externalPlayer) {
    externalPlayer.pause();
  }
  try {
    const ctx = getContext();
    if (themeMasterGain && ctx) {
      themeMasterGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.85);
      setTimeout(() => {
        try {
          if (schedulerTimer) clearInterval(schedulerTimer);
          if (watchTimer) clearInterval(watchTimer);
          schedulerTimer = null;
          watchTimer = null;
          themeMasterGain = null;
        } catch {
          // ignore
        }
      }, 900);
    } else {
      if (schedulerTimer) clearInterval(schedulerTimer);
      if (watchTimer) clearInterval(watchTimer);
      schedulerTimer = null;
      watchTimer = null;
    }
  } catch {
    // ignore
  }
  isThemeActive = false;
};

export const toggleAudioMute = () => {
  isMuted = !isMuted;
  if (isMuted && isThemeActive) {
    stopInterstellarTheme();
  }
  return isMuted;
};

export const getAudioMuted = () => isMuted;
