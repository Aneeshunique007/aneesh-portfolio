import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { PROJECTS } from '../data/projectsData';
import { playMechanicalClick, playPaperSlide } from '../utils/audio';
import './CaseStudyPage.css';

const pad = (n) => String(n).padStart(2, '0');

export default function CaseStudyPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
    playPaperSlide();
  }, [slug]);

  if (!project) {
    return (
      <div className="cs-page cs-missing">
        <h1 className="cs-title">NOT FOUND<i>.</i></h1>
        <Link to="/work" className="cs-btn cs-btn-solid">back to work</Link>
      </div>
    );
  }

  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  const handleBack = (e) => {
    e.preventDefault();
    playMechanicalClick();
    navigate('/work');
  };

  const story = [
    { label: 'the problem', text: project.theHumanProblem },
    { label: 'the bet', text: project.theArchitecturalBet },
    { label: 'what broke before launch', text: project.theFailureCaughtBeforeLaunch, accent: true },
  ];

  return (
    <article className="cs-page">
      {/* Back + status */}
      <div className="cs-topline">
        <a href="/work" onClick={handleBack} className="cs-back">
          <ArrowLeft size={15} />
          <span>all work</span>
        </a>
        <span className="cs-status">
          <i /> {project.status}
        </span>
      </div>

      {/* Hero */}
      <header className="cs-hero">
        <p className="cs-kicker">
          {pad(projectIndex + 1)} / {pad(PROJECTS.length)} — case study
        </p>
        <h1 className="cs-title">
          {project.title.toUpperCase()}
          <i>.</i>
        </h1>
        <p className="cs-tagline">{project.tagline}</p>

        <dl className="cs-meta">
          <div>
            <dt>role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>timeline</dt>
            <dd>{project.timeline}</dd>
          </div>
          <div>
            <dt>organization</dt>
            <dd>{project.clientOrg}</dd>
          </div>
          <div>
            <dt>links</dt>
            <dd className="cs-links">
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={playMechanicalClick}>
                  live <ArrowUpRight size={13} />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={playMechanicalClick}>
                  <GithubIcon size={13} /> code
                </a>
              )}
            </dd>
          </div>
        </dl>
      </header>

      {project.image && (
        <figure className="cs-shot">
          <img src={project.image} alt={project.title} />
        </figure>
      )}

      {/* Metrics */}
      <section className="cs-metrics" aria-label="results">
        {project.metrics.map((m, i) => (
          <div key={i} className="cs-metric">
            <span className="cs-metric-num">{m.value}</span>
            <span className="cs-metric-label">{m.label}</span>
            <p>{m.detail}</p>
          </div>
        ))}
      </section>

      {/* Story */}
      <section className="cs-story">
        {story.map((s, i) => (
          <div key={s.label} className={`cs-story-row${s.accent ? ' is-accent' : ''}`}>
            <p className="cs-story-label">
              {pad(i + 1)} — {s.label}
            </p>
            <p className="cs-story-text">{s.text}</p>
          </div>
        ))}
      </section>

      {/* Subsystems */}
      <section className="cs-subsystems">
        <h2 className="cs-h2">
          UNDER THE HOOD<i>.</i>
        </h2>
        <ol className="cs-sub-list">
          {project.architectureHighlights.map((sub, i) => (
            <li key={i} className="cs-sub-row">
              <span className="cs-sub-num">{pad(i + 1)}</span>
              <h3>{sub.title}</h3>
              <p>{sub.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Stack */}
      <section className="cs-stack">
        <p className="cs-story-label">built with</p>
        <div className="cs-chips">
          {project.tags.map((t, i) => (
            <span key={i} className="cs-chip">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Next */}
      <Link to={`/work/${nextProject.slug}`} className="cs-next" onClick={playMechanicalClick}>
        <span className="cs-next-label">next project</span>
        <span className="cs-next-title">
          {nextProject.title.toUpperCase()}
          <ArrowUpRight className="cs-next-arrow" />
        </span>
        <span className="cs-next-sub">{nextProject.subtitle}</span>
      </Link>

      <div className="cs-actions">
        <button onClick={handleBack} className="cs-btn">
          ← back to work
        </button>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="cs-btn cs-btn-solid" onClick={playMechanicalClick}>
            open live platform <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </article>
  );
}
