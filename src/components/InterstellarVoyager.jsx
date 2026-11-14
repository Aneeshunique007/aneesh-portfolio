import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import RollingText from './RollingText';
import InteractiveEnvelope from './InteractiveEnvelope';
import { PROJECTS } from '../data/projectsData';
import {
  playQuantumTick,
  playAirlockPneumatic,
} from '../utils/audio';
import './InterstellarVoyager.css';

const STACK_DIMENSIONS = [
  {
    dim: '01',
    name: 'Foundation Models & LLMs',
    tag: 'REASONING & SCHEMAS',
    items: [
      { name: 'Google Gemini 2.5 (Pro/Flash)', proof: 'Structured JSON schemas, context caching & Imperial era mapping.' },
      { name: 'OpenAI GPT-4o / Claude 3.5 Sonnet', proof: 'Deterministic JSON grammars & few-shot reasoning gates.' },
      { name: 'Hugging Face Transformers & LoRA', proof: 'PEFT fine-tuning, custom loss functions & 4-bit quantized inference.' },
    ],
  },
  {
    dim: '02',
    name: 'Multimodal OCR & 3D Vision',
    tag: 'SPATIAL TOPOLOGY',
    items: [
      { name: 'Azure Document Intelligence', proof: 'High-speed document layout parsing & boundary OCR.' },
      { name: 'MediaPipe 478-Point Face Mesh', proof: 'Sub-30ms in-browser facial landmark & gaze tracking.' },
      { name: 'ReportLab Precision Vector PDF', proof: 'Sub-2s server-side vector synthesis with security QR codes.' },
    ],
  },
  {
    dim: '03',
    name: 'Vector Retrieval & RAG',
    tag: 'HIGH-DIMENSIONAL EMBEDDINGS',
    items: [
      { name: 'FAISS In-Memory Vector Search', proof: 'Sub-15ms nearest-neighbor vector retrieval on CPU.' },
      { name: 'MongoDB Atlas Vector Indexing', proof: 'Hybrid BM25 keyword filtering with cosine similarity.' },
      { name: 'Cross-Encoder Semantic Reranking', proof: 'Hierarchical chunking with audited context grounding.' },
    ],
  },
  {
    dim: '04',
    name: 'Quant DL & Time-Series',
    tag: 'RECURRENT FORECASTING',
    items: [
      { name: 'LSTM & GRU Neural Ensembles', proof: 'Multi-horizon neural forecasting for 100+ equities.' },
      { name: 'PyTorch & TensorFlow / Keras', proof: 'Custom loss functions & sliding-window batch training.' },
      { name: 'Real-Time Streaming WebSockets', proof: 'Sub-40ms real-time market telemetry streaming.' },
    ],
  },
  {
    dim: '05',
    name: 'Production Cloud & Stack',
    tag: 'CLOUD ORCHESTRATION',
    items: [
      { name: 'Python FastAPI & Asyncio', proof: 'Asynchronous event loops & Pydantic strict schemas.' },
      { name: 'React 19 & TypeScript', proof: 'Concurrent rendering & responsive high-density telemetry.' },
      { name: 'Azure Container Apps & Docker', proof: 'Zero-downtime rolling updates & container orchestration.' },
    ],
  },
];

const FLIGHT_RECORDER_LOGS = [
  {
    id: 1,
    tag: 'GPU CLUSTER',
    title: 'The Compute Rig',
    note: 'Dual RTX 4090s running PyTorch distributed training benchmarks at 2:45 AM.',
    metric: '48 GB VRAM // FP16',
  },
  {
    id: 2,
    tag: 'FOUNDATIONS',
    title: 'Vaswani et al.',
    note: "'Attention Is All You Need' — annotated, benchmarked, and production-tested.",
    metric: 'TRANSFORMER CORE',
  },
  {
    id: 3,
    tag: 'OCR FIELDWORK',
    title: 'Japanese MLIT Docs',
    note: 'Deconstructing vintage vehicle titles to engineer Masshou AutoDoc.',
    metric: '41+ KANJI FIELDS',
  },
  {
    id: 4,
    tag: 'FUEL & FOCUS',
    title: 'Chemex Pour-Over',
    note: 'Coffee-to-tokens conversion rate fueling high-velocity multimodal AI sprints.',
    metric: '88°C EXTRACTION',
  },
  {
    id: 5,
    tag: 'GLOBAL IMPACT',
    title: 'Distributed Enterprise',
    note: 'Cross-border AI pipelines, async sync, and real-time voice inference.',
    metric: 'ASYNC SYNC',
  },
  {
    id: 6,
    tag: 'SYSTEM TOPOLOGY',
    title: 'Whiteboard Schemas',
    note: 'Vector cosine similarity paired with deterministic schema gates.',
    metric: 'DETERMINISTIC GATES',
  },
];

const FAQS = [
  {
    q: 'Are you open to remote work, global time zones, or relocation?',
    a: 'Fully operational across global time zones with proven overlap routines for North American, European, and Japanese teams. Open to high-impact on-site relocation or remote-first engineering leadership.',
  },
  {
    q: 'Do you build complete full-stack platforms or focus strictly on ML models?',
    a: 'I build complete production systems end-to-end: PyTorch model fine-tuning, async FastAPI microservices, React 19 / TypeScript frontends, and containerized Azure / Docker cloud infrastructure.',
  },
  {
    q: 'What is your typical turnaround speed from problem statement to deployed pilot?',
    a: 'Validated proofs-of-concept deploy in 48 to 72 hours. Hardened production platforms with automated confidence gates, multi-tenant auth, and vector pipelines deploy in 2 to 4 weeks.',
  },
  {
    q: 'How do you prevent hallucinations in mission-critical enterprise AI?',
    a: 'Zero unconstrained prompts. I enforce deterministic JSON schemas, cosine similarity threshold gates, cross-encoder reranking, and automated human-in-the-loop triggers whenever confidence dips below 97%.',
  },
];

export default function InterstellarVoyager({ showToast }) {
  const trackRef = useRef(null);
  const scrollRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [userSelectedProject, setUserSelectedProject] = useState(null);
  const [activeStackDim, setActiveStackDim] = useState('01');
  const [activeFaq, setActiveFaq] = useState(0);
  const [selectedSpecModal, setSelectedSpecModal] = useState(null);
  const [hoveredTensorIdx, setHoveredTensorIdx] = useState(null);
  const [activeRecorderIdx, setActiveRecorderIdx] = useState(0);
  const [activeStackTab, setActiveStackTab] = useState('stack');
  const [activeCommTab, setActiveCommTab] = useState('contact');

  // Close modal on Escape key and lock background scroll
  useEffect(() => {
    if (!selectedSpecModal) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedSpecModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedSpecModal]);



  // Smooth cinematic lerped scroll progress tracking inside the 1100vh track
  useEffect(() => {
    let rafId = null;
    let target = 0;
    let current = 0;

    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;
      const raw = -rect.top / totalScrollable;
      target = Math.max(0, Math.min(1, raw));
    };

    const tick = () => {
      current += (target - current) * 0.085;
      scrollRef.current = current;
      if (Math.abs(current - target) > 0.0002) {
        setScrollProgress(current);
      } else if (current !== target) {
        setScrollProgress(target);
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // --------------------------------------------------------------------------
  // In-Screen 3D Zoom Engine: Slow, relaxed, paced flight
  // --------------------------------------------------------------------------
  const p = scrollProgress;

  // Act 0: Overview & Event Horizon (p: 0.00 – 0.10)
  const stage0 = useMemo(() => {
    if (p > 0.10) {
      return { active: false, opacity: 0, transform: 'translate3d(0, 0, 550px) scale(1.8)', filter: 'blur(10px)', pointerEvents: 'none' };
    }
    if (p <= 0.04) {
      return { active: true, opacity: 1, transform: 'translate3d(0, 0, 0px) scale(1)', filter: 'none', pointerEvents: 'auto' };
    }
    const t = (p - 0.04) / 0.06;
    const ease = t * t;
    const tz = 550 * ease;
    const scale = 1.0 + 0.8 * ease;
    const opacity = Math.max(0, 1 - ease * 1.5);
    const blur = 10 * ease;
    return {
      active: opacity > 0.01,
      opacity,
      transform: `translate3d(0, 0, ${tz.toFixed(1)}px) scale(${scale.toFixed(3)})`,
      filter: blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : 'none',
      pointerEvents: opacity > 0.4 ? 'auto' : 'none',
    };
  }, [p]);

  // Act 1: Engineering Directive (p: 0.10 – 0.22)
  const stage1 = useMemo(() => {
    if (p < 0.10 || p > 0.22) {
      return { active: false, opacity: 0, transform: 'translate3d(0, 0, -850px) scale(0.2)', filter: 'blur(12px)', pointerEvents: 'none' };
    }
    if (p < 0.14) {
      const t = (p - 0.10) / 0.04;
      const ease = 1 - Math.pow(1 - t, 2.2);
      const tz = -850 * (1 - ease);
      const scale = 0.2 + 0.8 * ease;
      const opacity = Math.min(1, ease * 1.3);
      const blur = 10 * (1 - ease);
      return {
        active: true,
        opacity,
        transform: `translate3d(0, 0, ${tz.toFixed(1)}px) scale(${scale.toFixed(3)})`,
        filter: blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : 'none',
        pointerEvents: opacity > 0.6 ? 'auto' : 'none',
      };
    }
    if (p <= 0.18) {
      return { active: true, opacity: 1, transform: 'translate3d(0, 0, 0px) scale(1)', filter: 'none', pointerEvents: 'auto' };
    }
    const tExit = (p - 0.18) / 0.04;
    const easeExit = Math.pow(tExit, 2.2);
    const tz = 550 * easeExit;
    const scale = 1.0 + 0.85 * easeExit;
    const opacity = Math.max(0, 1 - easeExit * 1.5);
    const blur = 8 * easeExit;
    return {
      active: opacity > 0.01,
      opacity,
      transform: `translate3d(0, 0, ${tz.toFixed(1)}px) scale(${scale.toFixed(3)})`,
      filter: blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : 'none',
      pointerEvents: opacity > 0.4 ? 'auto' : 'none',
    };
  }, [p]);

  // Act 2: Featured Projects & Architectural Dossiers (p: 0.23 – 0.72)
  // Generous 0.39 focal cruise (0.28 – 0.67) allows reading one project at a time without rushing!
  const stage2 = useMemo(() => {
    if (p < 0.23 || p > 0.72) {
      return { active: false, opacity: 0, transform: 'translate3d(0, 0, -850px) scale(0.2)', filter: 'blur(12px)', pointerEvents: 'none' };
    }
    if (p < 0.28) {
      const t = (p - 0.23) / 0.05;
      const ease = 1 - Math.pow(1 - t, 2.2);
      const tz = -850 * (1 - ease);
      const scale = 0.2 + 0.8 * ease;
      const opacity = Math.min(1, ease * 1.3);
      const blur = 10 * (1 - ease);
      return {
        active: true,
        opacity,
        transform: `translate3d(0, 0, ${tz.toFixed(1)}px) scale(${scale.toFixed(3)})`,
        filter: blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : 'none',
        pointerEvents: opacity > 0.6 ? 'auto' : 'none',
      };
    }
    if (p <= 0.67) {
      return { active: true, opacity: 1, transform: 'translate3d(0, 0, 0px) scale(1)', filter: 'none', pointerEvents: 'auto' };
    }
    const tExit = (p - 0.67) / 0.05;
    const easeExit = Math.pow(tExit, 2.2);
    const tz = 550 * easeExit;
    const scale = 1.0 + 0.85 * easeExit;
    const opacity = Math.max(0, 1 - easeExit * 1.5);
    const blur = 8 * easeExit;
    return {
      active: opacity > 0.01,
      opacity,
      transform: `translate3d(0, 0, ${tz.toFixed(1)}px) scale(${scale.toFixed(3)})`,
      filter: blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : 'none',
      pointerEvents: opacity > 0.4 ? 'auto' : 'none',
    };
  }, [p]);

  // Auto-cycle active project with relaxed, wide dwell times (0.28 – 0.67)
  const autoProjectIdx = useMemo(() => {
    if (p >= 0.28 && p <= 0.67) {
      const segT = (p - 0.28) / 0.39;
      return Math.min(PROJECTS.length - 1, Math.floor(segT * PROJECTS.length));
    }
    if (p > 0.67) {
      return PROJECTS.length - 1;
    }
    return 0;
  }, [p]);

  const activeProjectIdx = userSelectedProject !== null ? userSelectedProject : autoProjectIdx;

  // Navigate directly to project one at a time
  const goToProject = useCallback((idx) => {
    playAirlockPneumatic();
    setUserSelectedProject(idx);
    if (!trackRef.current) return;
    const totalScrollable = trackRef.current.scrollHeight - window.innerHeight;
    if (totalScrollable <= 0) return;
    const segSpan = 0.39 / PROJECTS.length;
    const targetP = 0.28 + (idx + 0.5) * segSpan;
    const targetY = trackRef.current.offsetTop + targetP * totalScrollable;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }, []);

  // Keyboard navigation when Act 2 is in focus (ArrowLeft / ArrowRight to step one at a time)
  useEffect(() => {
    if (!stage2.active) return;
    const onKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goToProject((activeProjectIdx + 1) % PROJECTS.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goToProject((activeProjectIdx - 1 + PROJECTS.length) % PROJECTS.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [stage2.active, activeProjectIdx, goToProject]);

  // Mobile Touch Swipe Gesture handlers for Act 2 Project Feature Card
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleCardTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleCardTouchEnd = useCallback((e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe if deltaX is > 48px and clearly horizontal
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35) {
      if (deltaX < 0) {
        goToProject((activeProjectIdx + 1) % PROJECTS.length);
      } else {
        goToProject((activeProjectIdx - 1 + PROJECTS.length) % PROJECTS.length);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }, [activeProjectIdx, goToProject]);

  // Act 3: 5D Computational Stack & Engineering Flight Recorder (p: 0.73 – 0.88)
  const stage3 = useMemo(() => {
    if (p < 0.73 || p > 0.88) {
      return { active: false, opacity: 0, transform: 'translate3d(0, 0, -850px) scale(0.2)', filter: 'blur(12px)', pointerEvents: 'none' };
    }
    if (p < 0.77) {
      const t = (p - 0.73) / 0.04;
      const ease = 1 - Math.pow(1 - t, 2.2);
      const tz = -850 * (1 - ease);
      const scale = 0.2 + 0.8 * ease;
      const opacity = Math.min(1, ease * 1.3);
      const blur = 10 * (1 - ease);
      return {
        active: true,
        opacity,
        transform: `translate3d(0, 0, ${tz.toFixed(1)}px) scale(${scale.toFixed(3)})`,
        filter: blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : 'none',
        pointerEvents: opacity > 0.6 ? 'auto' : 'none',
      };
    }
    if (p <= 0.84) {
      return { active: true, opacity: 1, transform: 'translate3d(0, 0, 0px) scale(1)', filter: 'none', pointerEvents: 'auto' };
    }
    const tExit = (p - 0.84) / 0.04;
    const easeExit = Math.pow(tExit, 2.2);
    const tz = 550 * easeExit;
    const scale = 1.0 + 0.85 * easeExit;
    const opacity = Math.max(0, 1 - easeExit * 1.5);
    const blur = 8 * easeExit;
    return {
      active: opacity > 0.01,
      opacity,
      transform: `translate3d(0, 0, ${tz.toFixed(1)}px) scale(${scale.toFixed(3)})`,
      filter: blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : 'none',
      pointerEvents: opacity > 0.4 ? 'auto' : 'none',
    };
  }, [p]);

  // Act 4: Tactical Debrief & Direct Dispatch Envelope (p: 0.89 – 1.00)
  const stage4 = useMemo(() => {
    if (p < 0.89) {
      return { active: false, opacity: 0, transform: 'translate3d(0, 0, -850px) scale(0.2)', filter: 'blur(12px)', pointerEvents: 'none' };
    }
    if (p >= 0.94) {
      return { active: true, opacity: 1, transform: 'translate3d(0, 0, 0px) scale(1)', filter: 'none', pointerEvents: 'auto' };
    }
    const t = (p - 0.89) / 0.05;
    const ease = 1 - Math.pow(1 - t, 2.2);
    const tz = -850 * (1 - ease);
    const scale = 0.2 + 0.8 * ease;
    const opacity = Math.min(1, ease * 1.3);
    const blur = 10 * (1 - ease);
    return {
      active: true,
      opacity,
      transform: `translate3d(0, 0, ${tz.toFixed(1)}px) scale(${scale.toFixed(3)})`,
      filter: blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : 'none',
      pointerEvents: opacity > 0.5 ? 'auto' : 'none',
    };
  }, [p]);

  const currentProject = PROJECTS[activeProjectIdx] || PROJECTS[0];
  const activeStack = STACK_DIMENSIONS.find((d) => d.dim === activeStackDim) || STACK_DIMENSIONS[0];

  return (
    <div ref={trackRef} className="interstellar-voyage-track">
      {/* 100vh Pinned Immersive Stage */}
      <div className="interstellar-voyage-stage">

        {/* ==================================================================
            ACT 0: OVERVIEW & EVENT HORIZON (0.00 – 0.16)
            ================================================================== */}
        {stage0.active && (
          <div
            id="hero"
            className="voyage-act-overlay act-hero"
            style={{
              opacity: stage0.opacity,
              transform: stage0.transform,
              filter: stage0.filter,
              pointerEvents: stage0.pointerEvents,
            }}
          >
            <div className="act-hero-content">
              <div className="hero-status-pill">
                <span className="status-orb-argent" />
                <span>PRAETOR ARCHITECTURE // COMBAT-READY NEURAL ENVIRONMENT</span>
              </div>

              <h1 className="hero-pilot-name">ANEESH U S</h1>
              <div className="hero-role-title">MACHINE LEARNING ARCHITECT // GENERATIVE AI &amp; QUANT DL</div>

              <p className="hero-mission-statement">
                Annihilating enterprise latency across high-compute clusters.
              </p>

              <div className="hero-scroll-prompt">
                <span className="scroll-arrow">&darr;</span>
                <span className="scroll-text">
                  <RollingText text="PLUNGE INTO THE ARCHITECTURE" brackets />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            ACT 1: ENGINEERING DIRECTIVE (0.07 – 0.38)
            ================================================================== */}
        {stage1.active && (
          <div
            className="voyage-act-overlay act-directive"
            style={{
              opacity: stage1.opacity,
              transform: stage1.transform,
              filter: stage1.filter,
              pointerEvents: stage1.pointerEvents,
            }}
          >
            <div className="directive-panel">
              <div className="directive-tag-pill">
                <span className="directive-pulse" />
                <span>ENGINEERING DIRECTIVE // ZERO COMPROMISE</span>
              </div>

              <h2 className="directive-quote-title">
                &ldquo;We don&apos;t build fragile demo toys.
                <br />
                We engineer brutal, fault-tolerant AI architectures that annihilate real-world bottlenecks.&rdquo;
              </h2>

              <div className="directive-protocols-grid">
                <div className="directive-proto-box">
                  <span className="proto-id">PROTOCOL 01</span>
                  <h4 className="proto-title">ZERO KANJI LEAKAGE // DETERMINISTIC SCHEMA LOCK</h4>
                  <p className="proto-desc">
                    Constrained JSON grammars and automated confidence scoring gates preventing hallucinations on regulatory Japanese documents.
                  </p>
                </div>

                <div className="directive-proto-box">
                  <span className="proto-id">PROTOCOL 02</span>
                  <h4 className="proto-title">LATENCY ANNIHILATION</h4>
                  <p className="proto-desc">
                    Crushing 40-minute manual translation desks into sub-15-second multimodal OCR and vector PDF synthesis.
                  </p>
                </div>

                <div className="directive-proto-box">
                  <span className="proto-id">PROTOCOL 03</span>
                  <h4 className="proto-title">FAULT-TOLERANT CLUSTER ORCHESTRATION</h4>
                  <p className="proto-desc">
                    Containerized microservices operating autonomously across distributed enterprise infrastructure and global Azure cloud clusters with 99.98% uptime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            ACT 2: PRODUCTION WORK // ORBITAL DOSSIERS (0.27 – 0.69)
            ================================================================== */}
        {stage2.active && (
          <div
            id="missions"
            className="voyage-act-overlay act-projects"
            style={{
              opacity: stage2.opacity,
              transform: stage2.transform,
              filter: stage2.filter,
              pointerEvents: stage2.pointerEvents,
            }}
          >
            <div className="projects-dossier-stage">
              <div className="projects-top-nav">
                <div className="projects-badge-cluster">
                  <span className="proj-blip" />
                  <span className="proj-badge">PRODUCTION ARSENAL // ARMED &amp; OPERATIONAL: 0{activeProjectIdx + 1} OF 0{PROJECTS.length}</span>
                </div>

                {/* Quick selector tabs with Prev / Next step buttons */}
                <div className="projects-dock-tabs">
                  <button
                    type="button"
                    className="dock-step-arrow prev"
                    onClick={() => goToProject((activeProjectIdx - 1 + PROJECTS.length) % PROJECTS.length)}
                    title="Previous Mission (Step One at a Time)"
                    aria-label="Previous Mission"
                  >
                    <span>‹ PREV</span>
                  </button>

                  {PROJECTS.map((pj, i) => (
                    <button
                      key={pj.slug}
                      type="button"
                      className={`dock-tab-btn ${activeProjectIdx === i ? 'is-active' : ''}`}
                      onClick={() => goToProject(i)}
                      title={`Mission 0${i + 1}: ${pj.title}`}
                    >
                      <span>0{i + 1}</span>
                    </button>
                  ))}

                  <button
                    type="button"
                    className="dock-step-arrow next"
                    onClick={() => goToProject((activeProjectIdx + 1) % PROJECTS.length)}
                    title="Next Mission (Step One at a Time)"
                    aria-label="Next Mission"
                  >
                    <span>NEXT ›</span>
                  </button>
                </div>
              </div>

              {/* Main Project Dossier Display with Mobile Touch Swipe Navigation */}
              <div
                className="project-feature-card"
                onTouchStart={handleCardTouchStart}
                onTouchEnd={handleCardTouchEnd}
              >
                <div className="card-media-col">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="feature-img"
                  />
                  <div className="card-media-overlay" />
                </div>

                <div className="card-info-col">
                  <span className="feature-category-pill">{currentProject.category.toUpperCase()} // IN PRODUCTION</span>
                  <h3 className="feature-title">{currentProject.title}</h3>
                  <p className="feature-subtitle">{currentProject.subtitle}</p>
                  <p className="feature-tagline">{currentProject.tagline}</p>

                  {/* Metrics */}
                  {currentProject.metrics && (
                    <div className="feature-metrics-grid">
                      {currentProject.metrics.slice(0, 3).map((m, i) => (
                        <div key={i} className="metric-cell">
                          <span className="m-val">{m.value}</span>
                          <span className="m-lbl">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="feature-tags-wrap">
                    {currentProject.tags.slice(0, 4).map((tg, i) => (
                      <span key={i} className="feature-tag-chip">{tg}</span>
                    ))}
                  </div>

                  {/* Action Buttons Cluster */}
                  <div className="feature-actions-cluster">
                    <button
                      type="button"
                      className="feature-action-btn secondary step-prev-btn"
                      onClick={() => goToProject((activeProjectIdx - 1 + PROJECTS.length) % PROJECTS.length)}
                      title="Previous Mission (One at a Time)"
                      aria-label="Previous Mission"
                    >
                      <RollingText text="‹ PREV" />
                    </button>

                    {currentProject.demo && (
                      <a
                        href={currentProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="feature-action-btn primary"
                        onClick={playQuantumTick}
                      >
                        <RollingText text="LAUNCH LIVE PLATFORM ↗" brackets />
                      </a>
                    )}

                    <button
                      type="button"
                      className="feature-action-btn secondary spec-open-btn"
                      onClick={() => {
                        playAirlockPneumatic();
                        setSelectedSpecModal(currentProject);
                      }}
                    >
                      <span className="spec-btn-full"><RollingText text="EXPAND ARCHITECTURAL SPECIFICATION +" brackets /></span>
                      <span className="spec-btn-short"><RollingText text="EXPAND SPECIFICATION +" brackets /></span>
                    </button>

                    <button
                      type="button"
                      className="feature-action-btn secondary step-next-btn"
                      onClick={() => goToProject((activeProjectIdx + 1) % PROJECTS.length)}
                      title="Next Mission (One at a Time)"
                      aria-label="Next Mission"
                    >
                      <RollingText text="NEXT ›" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            ACT 3: TECHNICAL ARSENAL & FLIGHT RECORDER (0.58 – 0.88)
            ================================================================== */}
        {stage3.active && (
          <div
            id="tesseract"
            className="voyage-act-overlay act-stack"
            style={{
              opacity: stage3.opacity,
              transform: stage3.transform,
              filter: stage3.filter,
              pointerEvents: stage3.pointerEvents,
            }}
          >
            <div className="stack-stage-box">
              {/* Mobile Sub-Tabs: 01 Computational Stack / 02 Flight Recorder & Stats */}
              <div className="cockpit-mobile-tabs stack-mobile-tabs" role="tablist" aria-label="Technical Arsenal Selector">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeStackTab === 'stack'}
                  className={`cockpit-tab-pill ${activeStackTab === 'stack' ? 'is-active' : ''}`}
                  onClick={() => {
                    playQuantumTick();
                    setActiveStackTab('stack');
                  }}
                >
                  <span className="tab-dot blip-stack" />
                  <span>01 // COMPUTATIONAL STACK</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeStackTab === 'recorder'}
                  className={`cockpit-tab-pill ${activeStackTab === 'recorder' ? 'is-active' : ''}`}
                  onClick={() => {
                    playQuantumTick();
                    setActiveStackTab('recorder');
                  }}
                >
                  <span className="tab-dot blip-recorder" />
                  <span>02 // FLIGHT RECORDER & STATS</span>
                </button>
              </div>

              {/* 01: Computational Stack Section */}
              <div className={`stack-panel-section ${activeStackTab === 'stack' ? 'is-tab-active' : 'is-tab-hidden'}`}>
                <div className="stack-top-header">
                  <div className="stack-badge-group">
                    <span className="stack-blip" />
                    <span className="stack-title-badge">TECHNICAL ARSENAL // 5D COMPUTATIONAL STACK</span>
                  </div>

                  {/* Dimension Selectors */}
                  <div className="stack-dim-pills">
                    {STACK_DIMENSIONS.map((dim) => (
                      <button
                        key={dim.dim}
                        type="button"
                        className={`dim-pill-btn ${activeStackDim === dim.dim ? 'is-active' : ''}`}
                        onClick={() => {
                          playAirlockPneumatic();
                          setActiveStackDim(dim.dim);
                        }}
                      >
                        <span>{dim.dim} {dim.name.split('&')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Dimension Skills */}
                <div className="stack-active-container">
                  <div className="active-dim-header">
                    <span className="dim-code">DIMENSION {activeStack.dim} // {activeStack.tag}</span>
                    <h3 className="dim-heading">{activeStack.name}</h3>
                  </div>

                  <div className="skills-node-grid">
                    {activeStack.items.map((item, i) => {
                      const isHovered = hoveredTensorIdx === i;
                      const isDefoc = hoveredTensorIdx !== null && !isHovered;
                      return (
                        <div
                          key={i}
                          className={`skill-tensor-card ${isHovered ? 'is-focused' : ''} ${isDefoc ? 'is-defocused' : ''}`}
                          onMouseEnter={() => {
                            playQuantumTick();
                            setHoveredTensorIdx(i);
                          }}
                          onMouseLeave={() => setHoveredTensorIdx(null)}
                        >
                          <span className="tensor-index">TENSOR 0{i + 1}</span>
                          <h4 className="tensor-skill-name">{item.name}</h4>
                          <p className="tensor-proof-text">{item.proof}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 02: Flight Recorder Logs & Experience Milestones Section */}
              <div className={`recorder-panel-section ${activeStackTab === 'recorder' ? 'is-tab-active' : 'is-tab-hidden'}`}>
                {/* Flight Recorder Logs (Sruthi-Inspired Lab Fieldwork Artifacts) */}
                <div className="stack-recorder-deck">
                  <div className="recorder-top-bar">
                    <div className="rec-badge-group">
                      <span className="rec-blip-gold" />
                      <span className="rec-title">FLIGHT RECORDER // ENGINEERING LAB LOGS (FIELDWORK ARTIFACTS)</span>
                    </div>
                    <span className="rec-hint">INTERACTIVE LAB LOGS // CLICK OR HOVER</span>
                  </div>
                  <div className="recorder-cards-scroll">
                    {FLIGHT_RECORDER_LOGS.map((log, idx) => (
                      <div
                        key={log.id}
                        className={`recorder-log-item ${activeRecorderIdx === idx ? 'is-active-log' : ''}`}
                        onClick={() => {
                          playQuantumTick();
                          setActiveRecorderIdx(idx);
                        }}
                      >
                        <div className="rec-item-meta">
                          <span className="rec-tag">{log.tag}</span>
                          <span className="rec-metric">{log.metric}</span>
                        </div>
                        <h4 className="rec-heading">{log.title}</h4>
                        <p className="rec-note">&ldquo;{log.note}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Milestone Ribbon */}
                <div className="stack-experience-ribbon">
                  <div className="ribbon-cell">
                    <span className="r-num">4+ YEARS</span>
                    <span className="r-lbl">PROFESSIONAL EXPERIENCE</span>
                  </div>
                  <div className="ribbon-cell">
                    <span className="r-num">250K+ LOC</span>
                    <span className="r-lbl">PRODUCTION CODE SHIPPED</span>
                  </div>
                  <div className="ribbon-cell">
                    <span className="r-num">99.98%</span>
                    <span className="r-lbl">SYSTEM UPTIME RELIABILITY</span>
                  </div>
                  <div className="ribbon-cell">
                    <span className="r-num">GLOBAL ENTERPRISE</span>
                    <span className="r-lbl">ACTIVE MISSION CORRIDOR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            ACT 4: TACTICAL Q&A & DIRECT CONTACT (0.80 – 1.00)
            ================================================================== */}
        {stage4.active && (
          <div
            id="comm"
            className="voyage-act-overlay act-final"
            style={{
              opacity: stage4.opacity,
              transform: stage4.transform,
              filter: stage4.filter,
              pointerEvents: stage4.pointerEvents,
            }}
          >
            <div className="final-cockpit-grid">
              {/* Mobile Cockpit Selector Tabs */}
              <div className="cockpit-mobile-tabs" role="tablist" aria-label="Tactical Cockpit Selector">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCommTab === 'contact'}
                  className={`cockpit-tab-pill ${activeCommTab === 'contact' ? 'is-active' : ''}`}
                  onClick={() => {
                    playQuantumTick();
                    setActiveCommTab('contact');
                  }}
                >
                  <span className="tab-dot blip-contact" />
                  <span>01 // PRAETOR ENVELOPE</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCommTab === 'faq'}
                  className={`cockpit-tab-pill ${activeCommTab === 'faq' ? 'is-active' : ''}`}
                  onClick={() => {
                    playQuantumTick();
                    setActiveCommTab('faq');
                  }}
                >
                  <span className="tab-dot blip-faq" />
                  <span>02 // FAQ DEBRIEF</span>
                </button>
              </div>

              {/* Left Column: Tactical Q&A */}
              <div id="tars" className={`cockpit-faq-col ${activeCommTab === 'faq' ? 'tab-active' : ''}`}>
                <div className="col-top-strip">
                  <span className="faq-blip" />
                  <span className="col-badge">TACTICAL DEBRIEF // FREQUENTLY ASKED QUESTIONS</span>
                </div>

                <div className="faq-accordion-wrap">
                  {FAQS.map((faq, idx) => (
                    <div
                      key={idx}
                      className={`voyage-faq-item ${activeFaq === idx ? 'is-open' : ''}`}
                      onClick={() => {
                        playQuantumTick();
                        setActiveFaq(activeFaq === idx ? -1 : idx);
                      }}
                    >
                      <div className="faq-q-row">
                        <span className="faq-num">Q0{idx + 1}</span>
                        <span className="faq-q-text">{faq.q}</span>
                        <span className="faq-toggle">{activeFaq === idx ? '−' : '+'}</span>
                      </div>
                      {activeFaq === idx && (
                        <p className="faq-a-text">{faq.a}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Direct Message Uplink Origami Envelope & Direct Links */}
              <div className={`cockpit-contact-col ${activeCommTab === 'contact' ? 'tab-active' : ''}`}>
                <div className="col-top-strip">
                  <span className="contact-blip" />
                  <span className="col-badge">DIRECT UPLINK // PRAETOR DISPATCH ENVELOPE</span>
                </div>

                <InteractiveEnvelope showToast={showToast} compact />

                {/* Direct Link Badges */}
                <div className="contact-channels-strip">
                  <a href="mailto:aneeshusunique@gmail.com" className="chan-btn">✉ aneeshusunique@gmail.com</a>
                  <a href="https://github.com/Aneeshunique007" target="_blank" rel="noopener noreferrer" className="chan-btn">⚡ GitHub</a>
                  <a href="https://www.linkedin.com/in/aneesh-u-s/" target="_blank" rel="noopener noreferrer" className="chan-btn">◈ LinkedIn</a>
                  <a href="https://www.instagram.com/__b_a_d_b_o_y__007/" target="_blank" rel="noopener noreferrer" className="chan-btn">✦ Instagram</a>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ==================================================================
            DEEP-DIVE ARCHITECTURAL SPECIFICATION MODAL (Sruthi-Inspired Dossier)
            ================================================================== */}
        {selectedSpecModal && createPortal(
          <div
            className="spec-modal-backdrop"
            onClick={() => setSelectedSpecModal(null)}
            role="dialog"
            aria-modal="true"
            data-lenis-prevent
          >
            <div className="spec-modal-panel" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
              <div className="spec-modal-header">
                <div className="spec-modal-title-cluster">
                  <span className="spec-modal-blip" />
                  <span className="spec-modal-badge">
                    <span className="spec-badge-full">DEEP SYSTEM SPECIFICATION // {selectedSpecModal.slug.toUpperCase()}</span>
                    <span className="spec-badge-short">SPEC // {selectedSpecModal.slug.toUpperCase()}</span>
                  </span>
                </div>
                <button
                  type="button"
                  className="spec-modal-close"
                  onClick={() => {
                    playQuantumTick();
                    setSelectedSpecModal(null);
                  }}
                  aria-label="Close Specification Modal"
                  title="Close Specification (ESC)"
                >
                  <span className="close-text-full"><RollingText text="[ ESC / CLOSE ✕ ]" /></span>
                  <span className="close-text-short"><RollingText text="[ ✕ CLOSE ]" /></span>
                </button>
              </div>

              <div className="spec-modal-body" data-lenis-prevent>
                <div className="spec-top-meta">
                  <h2 className="spec-title">{selectedSpecModal.title}</h2>
                  <p className="spec-subtitle">{selectedSpecModal.subtitle}</p>
                  <div className="spec-meta-strip">
                    <span className="spec-org">{selectedSpecModal.clientOrg}</span>
                    <span className="spec-dot">•</span>
                    <span className="spec-timeline">{selectedSpecModal.timeline}</span>
                    <span className="spec-dot">•</span>
                    <span className="spec-status">{selectedSpecModal.status}</span>
                  </div>
                </div>

                {/* Audited Metrics Grid */}
                {selectedSpecModal.metrics && (
                  <div className="spec-metrics-grid">
                    {selectedSpecModal.metrics.map((m, i) => (
                      <div key={i} className="spec-metric-card">
                        <span className="spec-m-val">{m.value}</span>
                        <span className="spec-m-lbl">{m.label}</span>
                        <span className="spec-m-det">{m.detail}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Architectural Narrative (Human Problem vs Architectural Bet) */}
                <div className="spec-narrative-sections">
                  <div className="spec-section-box">
                    <span className="spec-sec-tag">01 // THE BOTTLENECK</span>
                    <p className="spec-sec-text">{selectedSpecModal.theHumanProblem}</p>
                  </div>

                  <div className="spec-section-box">
                    <span className="spec-sec-tag">02 // THE ARCHITECTURAL BET</span>
                    <p className="spec-sec-text">{selectedSpecModal.theArchitecturalBet}</p>
                  </div>

                  {selectedSpecModal.theFailureCaughtBeforeLaunch && (
                    <div className="spec-section-box highlight-failure">
                      <span className="spec-sec-tag">03 // PRODUCTION SAFEGUARD</span>
                      <p className="spec-sec-text">{selectedSpecModal.theFailureCaughtBeforeLaunch}</p>
                    </div>
                  )}
                </div>

                {/* Architecture Highlights */}
                {selectedSpecModal.architectureHighlights && (
                  <div className="spec-highlights-block">
                    <span className="spec-sec-tag">04 // KEY SYSTEM MODULES</span>
                    <div className="spec-highlights-grid">
                      {selectedSpecModal.architectureHighlights.map((hl, i) => (
                        <div key={i} className="spec-hl-card">
                          <h4 className="hl-title">{hl.title}</h4>
                          <p className="hl-desc">{hl.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Action Buttons */}
                <div className="spec-modal-actions">
                  {selectedSpecModal.demo && (
                    <a
                      href={selectedSpecModal.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="spec-action-btn primary"
                      onClick={playQuantumTick}
                    >
                      <RollingText text="LAUNCH LIVE PLATFORM ↗" brackets />
                    </a>
                  )}
                  {selectedSpecModal.github && (
                    <a
                      href={selectedSpecModal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="spec-action-btn secondary"
                      onClick={playQuantumTick}
                    >
                      <RollingText text="VIEW SOURCE REPOSITORY ⚡" brackets />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}
