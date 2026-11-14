import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Cpu, ShieldCheck } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import RollingText from '../components/RollingText';
import { PROJECTS } from '../data/projectsData';
import { playMechanicalClick, playQuantumTick } from '../utils/audio';
import './WorkPage.css';

const CATEGORIES = [
  { id: 'all', label: 'ALL MISSIONS', count: 7 },
  { id: 'genai', label: 'GENERATIVE AI & OCR', count: 4 },
  { id: 'ml', label: 'QUANT & DEEP LEARNING', count: 1 },
  { id: 'fullstack', label: 'FULL-STACK PLATFORMS', count: 2 },
];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFilterClick = (catId) => {
    playMechanicalClick();
    setActiveFilter(catId);
  };

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => {
        if (activeFilter === 'genai') return p.category === 'genai' || p.category === 'voice' || p.category === 'vision';
        if (activeFilter === 'ml') return p.category === 'ml';
        if (activeFilter === 'fullstack') return p.category === 'fullstack';
        return true;
      });

  return (
    <main className="work-independent-page">
      {/* ==================================================================
          STAGE 1: TACTICAL FLEET COMMAND DOSSIER HEADER
          ================================================================== */}
      <section className="work-hero-dossier">
        <div className="work-dossier-wrap">
          <div className="work-status-pill">
            <span className="status-orb-argent" />
            <span>MISSION COMMAND // PRODUCTION FLEET CATALOGUE</span>
          </div>

          <h1 className="work-fleet-title">ENGINEERED FOR PRODUCTION</h1>
          <div className="work-fleet-subtitle">
            07 ACTIVE ENTERPRISE SYSTEMS // GLOBAL PRODUCTION FLEET
          </div>

          <p className="work-bio-lead">
            Enterprise-grade multimodal document intelligence, institutional quantitative forecasting,
            and distributed microservices built for brutal real-world production constraints. Zero demo toys.
          </p>

          {/* Real-time Engineering Telemetry Grid */}
          <div className="work-telemetry-grid">
            <div className="work-telemetry-card">
              <span className="telemetry-card-tag">SYSTEMS IN PROD</span>
              <span className="telemetry-card-val">07 ACTIVE</span>
              <span className="telemetry-card-sub">AUTONOMOUS END-TO-END PIPELINES</span>
            </div>

            <div className="work-telemetry-card">
              <span className="telemetry-card-tag">INFERENCE SPEED</span>
              <span className="telemetry-card-val">&lt; 15 SECONDS</span>
              <span className="telemetry-card-sub">DOWN FROM 40-MIN DESK LOGISTICS</span>
            </div>

            <div className="work-telemetry-card">
              <span className="telemetry-card-tag">EXTRACTION ACCURACY</span>
              <span className="telemetry-card-val">&gt; 99.2%</span>
              <span className="telemetry-card-sub">JAPANESE IMPERIAL ERA &amp; TABLE OCR</span>
            </div>

            <div className="work-telemetry-card">
              <span className="telemetry-card-tag">RELIABILITY SLA</span>
              <span className="telemetry-card-val">99.98% UPTIME</span>
              <span className="telemetry-card-sub">CONTAINERIZED AZURE CLUSTERS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          STAGE 2: FILTER DECK & MISSION CARDS SHOWCASE
          ================================================================== */}
      <section className="work-missions-section">
        <div className="work-container">
          {/* Tactical Category Filter Bar */}
          <div className="work-filter-bar" role="tablist" aria-label="Project Categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === cat.id}
                className={`work-filter-btn ${activeFilter === cat.id ? 'is-active' : ''}`}
                onClick={() => handleFilterClick(cat.id)}
              >
                <span className="filter-btn-label">{cat.label}</span>
                <span className="filter-btn-count">[{String(cat.count).padStart(2, '0')}]</span>
              </button>
            ))}
          </div>

          {/* Missions Grid */}
          <div className="work-grid">
            {filteredProjects.map((project, idx) => (
              <article key={project.slug} className="work-mission-card">
                {/* Cyberpunk Tactical Reticle Corners */}
                <span className="reticle top-left">┌</span>
                <span className="reticle top-right">┐</span>
                <span className="reticle bottom-left">└</span>
                <span className="reticle bottom-right">┘</span>

                {/* Card Header Telemetry */}
                <div className="mission-card-header">
                  <div className="mission-id-cluster">
                    <span className="mission-id-badge">MISSION // {String(idx + 1).padStart(2, '0')}</span>
                    <span className="mission-status-badge">
                      <span className="status-dot-pulse" />
                      {project.status || 'PRODUCTION SYSTEM'}
                    </span>
                  </div>
                  <span className="mission-client-tag">{project.clientOrg}</span>
                </div>

                {/* Project Visual Showcase */}
                <div className="mission-image-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="mission-image"
                    loading="lazy"
                  />
                  <div className="mission-image-overlay" />
                  <div className="mission-tech-role-pill">
                    <Cpu size={12} className="pill-icon" />
                    <span>{project.role}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="mission-card-body">
                  <h2 className="mission-title">{project.title}</h2>
                  <div className="mission-subtitle">{project.subtitle}</div>
                  <p className="mission-tagline">{project.tagline}</p>

                  {/* Highlight Metrics */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="mission-metrics-row">
                      {project.metrics.slice(0, 3).map((m, mi) => (
                        <div key={mi} className="metric-badge">
                          <span className="metric-val">{m.value}</span>
                          <span className="metric-lbl">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="mission-tags-wrap">
                    {project.tags.map((tag) => (
                      <span key={tag} className="mission-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="mission-card-footer">
                  <Link
                    to={`/work/${project.slug}`}
                    className="mission-primary-btn"
                    onClick={() => playQuantumTick()}
                  >
                    <span>ARCHITECTURAL DOSSIER</span>
                    <ArrowUpRight size={15} />
                  </Link>

                  <div className="mission-external-links">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mission-icon-link"
                        title="Open Live System"
                        onClick={() => playMechanicalClick()}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mission-icon-link"
                        title="Inspect Source Repository"
                        onClick={() => playMechanicalClick()}
                      >
                        <GithubIcon size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          STAGE 3: BOTTOM ARCHITECTURAL DISPATCH BANNER
          ================================================================== */}
      <section className="work-dispatch-banner">
        <div className="work-dispatch-card">
          <div className="dispatch-telemetry-badge">
            <ShieldCheck size={14} className="shield-icon" />
            <span>DIRECT ARCHITECTURAL DISPATCH // OPEN FOR PRODUCTION COLLABORATION</span>
          </div>
          <h2 className="dispatch-title">HAVE A BRUTAL PRODUCTION PROBLEM?</h2>
          <p className="dispatch-sub">
            Sub-15s multimodal inference, high-dimensional vector search, institutional time-series
            forecasting, or distributed Azure orchestration. Let&apos;s engineer reality.
          </p>
          <div className="dispatch-cta-row">
            <Link
              to="/contact"
              className="dispatch-cta-btn"
              onClick={() => {
                playQuantumTick();
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              }}
            >
              <RollingText text="TRANSMIT PRODUCTION BRIEF" brackets />
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
