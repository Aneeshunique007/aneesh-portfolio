import React, { useState } from 'react';
import { ExternalLink, Layers, ArrowUpRight, X, CheckCircle, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Projects({ showToast }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'genai', label: 'GenAI & OCR' },
    { id: 'ml', label: 'Quantitative & ML' },
    { id: 'fullstack', label: 'Full-Stack Web' },
  ];

  const projects = [
    {
      id: 1,
      title: "Masshou AutoDoc",
      subtitle: "AI-Powered Japanese Automotive Document Intelligence Platform",
      category: "genai",
      image: "/project-masshou.jpg",
      tags: ["React 18", "TypeScript", "FastAPI", "Node.js", "Azure Document Intelligence", "Gemini 2.5", "ReportLab", "Docker"],
      summary: "An enterprise document intelligence SaaS that automates the extraction, translation, validation, and generation of official English certificates from Japanese vehicle export documents (Massho 輸出抹消仮登録証明書 & Shaken 自動車検査証).",
      metrics: "Automates 41+ fields with >99% accuracy; slashed translation time by 96% (40 mins down to <15s)",
      features: [
        "Hybrid AI Pipeline: Combines Azure Document Intelligence OCR with Google Gemini 2.5 for context-aware Japanese imperial era conversion and automotive taxonomy mapping",
        "Official Vector PDF Engine: Built with Python ReportLab and Japanese Gothic typography fallbacks to replicate Ministry of Land (MLIT) certificate standards",
        "Interactive Dual-Pane Split Viewer: Side-by-side verification of original scanned document and editable extracted fields with on-the-fly regeneration",
        "Enterprise Governance: Multi-tenant organization hierarchies, trial watermarking, Stripe billing, and Japanese bank transfer invoicing workflows",
        "Automated Confidence Scoring: Custom auditing algorithm assessing field certainty, untranslated kanji leakage, and redactions"
      ],
      demo: "https://masshouautodoc.jp/",
      github: "https://github.com/Aneeshunique007",
    },
    {
      id: 2,
      title: "iMarketPredict",
      subtitle: "Enterprise Tokyo Stock Exchange (TSE) Quantitative Analytics Platform",
      category: "ml",
      image: "/project-imarket.png",
      tags: ["React 18", "TypeScript", "GraphQL", "FastAPI", "TensorFlow", "Keras", "LSTM / GRU", "Stripe", "Azure"],
      summary: "An institutional-grade quantitative investment and stock prediction platform for the Tokyo Stock Exchange. Built with a decoupled microservice architecture combining deep learning ensemble models for multi-horizon price forecasting with a real-time data streaming engine.",
      metrics: "Deep learning forecasting (1D to 12M) across 100+ TSE equities in 5 key economic sectors",
      features: [
        "Multi-Horizon Deep Learning: Sector-calibrated LSTM and GRU neural networks forecasting 1D, 5D, 20D, 3M, 6M, and 12M price windows",
        "Institutional Portfolio Analytics: Real-time risk calculations including Sharpe Ratio, Alpha, Beta vs TOPIX/Nikkei, Maximum Drawdown, and Unrealized P&L",
        "Zero-Database Streaming Engine: High-throughput FastAPI proxy streaming real-time and historical OHLCV data from Yahoo Finance with zero persistent storage overhead",
        "Bilingual Localization (i18n): Native Japanese and English interface optimized for Tokyo financial market terminology",
        "Type-Safe GraphQL Gateway: Node.js/Express Apollo Server managing portfolios, user sessions with GeoIP auditing, and Stripe subscription monetization"
      ],
      demo: "https://www.imarketpredict.com/",
      github: "https://github.com/Aneeshunique007",
    },
    {
      id: 3,
      title: "Adam-i Talent Hub",
      subtitle: "Enterprise AI Talent Acquisition & Intelligent Matching System",
      category: "genai",
      image: "/project-talenthub.jpg",
      tags: ["React 19", "TypeScript", "Node.js", "MongoDB Vector", "Gemini 2.5 Pro", "Azure Doc Intel", "MediaPipe Vision", "Azure Speech", "Three.js"],
      summary: "An enterprise-grade, multi-tenant talent acquisition platform automating cross-border hiring between Japan and international markets. Integrates vector search, Gemini 2.5 Pro reasoning, automated IMAP email JD ingestion, agency conflict resolution, and an in-browser 3D AI Mock Interview Studio with computer vision gaze and posture tracking.",
      metrics: "Parses resumes in <3s (97% faster); 0% agency conflicts via Levenshtein matching; 85% match time saved; 50% higher interview pass rate",
      features: [
        "Dual-Engine Semantic Matching: Combines MongoDB Vector cosine similarity with Google Gemini 2.5 Pro for 4-dimensional scoring (Skills, JLPT Level, Work Style, Domain Experience) with mathematical consistency checks",
        "Ethical AI & Defensible Bias Gates: Programmatically scrubs non-defensible attributes (race, religion, disability) at the service layer, evaluating sensitive criteria only with legally confirmed business justifications",
        "Multimodal AI Mock Interview Studio: Integrates Three.js 3D avatar with Google MediaPipe Tasks-Vision (iris gaze calculation, facial emotion blendshapes, posture tracking) and Azure Speech SDK for real-time bilingual voice interactions",
        "Automated IMAP Email Ingestion: Background daemon polling incoming emails every 5 minutes, processing attachments with Azure Document Intelligence OCR into structured job postings",
        "Candidate Deduplication & Agency Lock: Normalized phone/email checks and Levenshtein string matching to resolve multi-agency submission conflicts and protect placement commissions",
        "Interactive ATS Resume Suite: 5 customizable layout templates with live editing, client-side PDF export, and an AI Resume Doctor scoring keyword density and quantifiable impact"
      ],
      demo: "https://talenthub.ne.jp/",
      github: "https://github.com/Aneeshunique007",
    },
    {
      id: 4,
      title: "InterviewMate",
      subtitle: "AI-Driven Mock Interview & Career Assessment System",
      category: "genai",
      image: "/project-interviewmate.png",
      tags: ["React 18", "TypeScript", "Python", "FastAPI", "LLMs", "MediaPipe Vision", "Azure Speech"],
      summary: "An AI-powered interview preparation platform that conducts interactive technical and behavioral mock interview sessions with real-time feedback.",
      metrics: "Live production deployment on interviewmate.jp providing automated candidate response analysis",
      features: [
        "Conversational AI Interviewer: Simulates real-time technical and behavioral interview scenarios based on target job roles",
        "Comprehensive Feedback Engine: Evaluates candidate answers on clarity, technical accuracy, and domain depth",
        "Interactive Session Dashboard: Tracks interview progress, strengths, and areas for preparation improvement",
        "Production Cloud Architecture: Deployed on high-performance cloud containers with domain routing at interviewmate.jp"
      ],
      demo: "http://interviewmate.jp/",
      github: "https://github.com/Aneeshunique007",
    },
    {
      id: 5,
      title: "AniLearn 日本語",
      subtitle: "Full-Stack Gamified Japanese Mastery & Media Immersion Platform",
      category: "fullstack",
      image: "/project-anilearn.jpg",
      tags: ["React 18", "TypeScript", "Node.js", "Express", "MongoDB", "Web Speech API", "Tailwind CSS"],
      summary: "A comprehensive, gamified Japanese language learning web platform taking learners from zero knowledge to JLPT N5/N4 proficiency. Integrates authentic anime dialogues and daily journal entries with structured linguistic pedagogy.",
      metrics: "3,000+ interactive exercises, 1,488+ JLPT words with audio, 318 Kanji, and 100% TypeScript type safety",
      features: [
        "Adaptive Daily Study Plan Engine: Dynamically partitions 1,488+ vocabulary words, 318 Kanji, and 100+ lessons across customizable timelines with cloud synchronization",
        "Native Speech Synthesis: Zero-latency pronunciation engine powered by Web Speech API with custom regex phonetic filtering to prevent parenthetical romanization glitches",
        "Anime Dialogue & Nikki Immersion: Real-world dialogue analysis from iconic series (One Piece, Jujutsu Kaisen, Demon Slayer) and authentic episodic journal entries",
        "Multi-Tier Linguistic Vault: Interactive Gojūon Kana syllabary, Kanji stroke order breakdowns with Onyomi/Kunyomi, and 215 JLPT grammar formula guides",
        "Omni-Channel Instant Search: Debounced search supporting simultaneous lookup across Kanji, Kana, Romaji, and English meanings"
      ],
      demo: "https://github.com/Aneeshunique007",
      github: "https://github.com/Aneeshunique007",
    },
    {
      id: 6,
      title: "Clinova Health Care (CMS)",
      subtitle: "Enterprise Hospital & Clinical Workflow Management Platform",
      category: "fullstack",
      image: "/project-cms.png",
      tags: ["Django 5", "React 19", "MySQL", "Django REST", "SimpleJWT", "ReportLab 4.4", "Hugging Face AI", "jsPDF", "Docker"],
      summary: "An enterprise, multi-role hospital and outpatient department (OPD) platform unifying front-desk patient intake, intelligent 10-minute collision-proof slot scheduling, electronic health records (EHR), multi-dosage prescriptions, pathology automation with vector ReportLab PDF generation, pharmacy inventory/POS cashiering, and clinical AI chat.",
      metrics: "31,061 LOC across 136 files, 124 RESTful endpoints, 20 relational models, and 5-tier RBAC security",
      features: [
        "5-Tier Role-Based Access Control (RBAC): Strict zero-trust group permissions across Administrators, Doctors, Receptionists, Pharmacists, and Lab Technicians with SimpleJWT auth",
        "Collision-Proof Smart Scheduling: Automated 10-minute discrete slot allocator with dynamic clock rounding, Sunday exclusion, 30-patient doctor caps, and emergency 'E'-token prioritization",
        "Clinical EHR & Multi-Frequency Rx: Longitudinal consultation history, immutable audit trails, and structured multi-dosage prescription builder (1-0-0, 0-1-0, 1-1-1, stat) linked directly to pharmacy inventory",
        "Server-Side Pathology PDF Engine: ReportLab 4.4 pipeline compiling diagnostic findings into vector-quality medical reports with dynamic color-coded indicators (Normal vs Abnormal)",
        "Dual-Track Inventory & 3-Channel POS: Batch-level pharmaceutical expiry tracking with low-stock alerts (<10 units), reagent tracking, and synchronized OPD/lab/pharmacy revenue cashiering",
        "Generative AI Clinical Assistant: Secure reverse proxy bridge connecting staff and patients to a specialized medical LLM hosted on Hugging Face Spaces"
      ],
      demo: "https://github.com/Aneeshunique007",
      github: "https://github.com/Aneeshunique007",
    },
    {
      id: 7,
      title: "FaithAI",
      subtitle: "Autonomous Web-Scraping & RAG Conversational Intelligence Platform",
      category: "genai",
      image: "/project-faithai.png",
      tags: ["Hugging Face", "TinyLlama-1.1B", "Meta FAISS", "Scrapy Spider", "Django 5 REST", "React 19", "bge-small-en", "PyTorch"],
      summary: "An end-to-end autonomous Retrieval-Augmented Generation (RAG) platform pairing an automated Scrapy web-crawler with an in-memory FAISS vector database and local CPU-optimized LLM inference (TinyLlama-1.1B with FLAN-T5 fallback). Enables instant zero-cost conversational Q&A over live academic curricula with a one-click autonomous self-healing re-crawl trigger.",
      metrics: "<1.8s CPU inference latency, <15ms FAISS vector search, 100% ground-truth alignment, $0.00/mo operating cost",
      features: [
        "Autonomous Scrapy Crawler Pipeline: CrawlSpider indexing 15+ complex course curricula with canonical URL deduplication, noise elimination, and thread-safe Django ORM ingestion",
        "Dense Vector Retrieval Engine: BAAI/bge-small-en embeddings (384-dimensional) indexed via Meta FAISS IndexFlatL2 for sub-15ms semantic nearest-neighbor matching",
        "Low-Latency CPU Inference: PyTorch-optimized TinyLlama-1.1B-Chat with 4-thread tuning, low_cpu_mem_usage, and Google FLAN-T5 fallback delivering sub-1.8s generation without GPU overhead",
        "One-Click Autonomous Self-Healing Sync: Interactive frontend trigger initiating asynchronous scraper re-crawling via Python subprocess with zero server downtime",
        "Glassmorphic React 19 Interface: Floating interactive conversational widget with real-time typing indicators, source citations, and responsive modal layout",
        "Zero API Operating Cost: 100% self-hosted open-source pipeline eliminating recurring third-party cloud LLM API fees and data privacy risks"
      ],
      demo: "https://github.com/Aneeshunique007",
      github: "https://github.com/Aneeshunique007",
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const handleOpenDemo = (project, e) => {
    e.stopPropagation();
    if (project.demo && project.demo.startsWith('http')) {
      window.open(project.demo, '_blank', 'noopener,noreferrer');
    } else {
      showToast(`Launching preview for "${project.title}"`);
    }
  };

  const handleOpenGithub = (project, e) => {
    e.stopPropagation();
    const url = project.github || "https://github.com/Aneeshunique007";
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className="section-padding projects-section">
      <div className="container">
        {/* Header */}
        <div className="projects-header">
          <div>
            <span className="section-tag">03 // FEATURED WORK</span>
            <h2 className="section-title">Production AI & Full-Stack Systems.</h2>
          </div>
          <p className="section-subtitle">
            Flagship enterprise platforms, quantitative deep learning engines, and document intelligence systems built at Adam-i Innovations and live on production domains.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="projects-filter-bar">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              className={`project-filter-btn ${activeFilter === tab.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="project-card glass-panel"
              onClick={() => setSelectedProject(project)}
            >
              {/* Thumbnail Container */}
              <div className="project-image-wrap">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-img" 
                  loading="lazy" 
                />
              </div>

              {/* Card Content */}
              <div className="project-card-body">
                <div className="project-meta-row">
                  <span className="project-category-tag">{project.subtitle}</span>
                </div>

                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-summary">{project.summary}</p>

                {/* Tech Badges */}
                <div className="project-tech-tags">
                  {project.tags.slice(0, 5).map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                  {project.tags.length > 5 && (
                    <span className="tech-tag">+{project.tags.length - 5} more</span>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="project-card-actions">
                  <div className="project-card-actions-left">
                    <button 
                      className="project-link-btn"
                      onClick={(e) => handleOpenDemo(project, e)}
                      title={project.demo.includes('github') ? "View on GitHub" : "Open Live Platform"}
                    >
                      <span>{project.demo.includes('github') ? "View Source" : "Live Platform"}</span>
                      <ArrowUpRight size={16} />
                    </button>
                    <button 
                      className="project-case-study-btn"
                      onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                      title="View Full Case Study"
                    >
                      <span>Case Study</span>
                    </button>
                  </div>
                  <button 
                    className="project-icon-link"
                    onClick={(e) => handleOpenGithub(project, e)}
                    title="View GitHub Repository"
                  >
                    <GithubIcon size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
            <div className="modal-dialog glass-panel" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="modal-tag">{selectedProject.subtitle}</span>
                  <h3 className="modal-title">{selectedProject.title}</h3>
                </div>
                <button 
                  className="modal-close-btn"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close dialog"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-img-container">
                  <img src={selectedProject.image} alt={selectedProject.title} />
                </div>

                <div className="modal-metrics-highlight">
                  <Sparkles size={18} color="#FF4A17" />
                  <span><strong>Impact & Scope:</strong> {selectedProject.metrics}</span>
                </div>

                <div className="modal-section">
                  <h4>Architectural Overview</h4>
                  <p>{selectedProject.summary}</p>
                </div>

                <div className="modal-section">
                  <h4>Key Features & Engineering Highlights</h4>
                  <ul className="modal-features-list">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx}>
                        <CheckCircle size={16} color="#FF4A17" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <h4>Stack & Dependencies</h4>
                  <div className="project-tech-tags">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="tech-tag modal-tag-item">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-actions-row">
                  {selectedProject.demo && (
                    <button 
                      className="btn-primary"
                      onClick={(e) => handleOpenDemo(selectedProject, e)}
                    >
                      <ExternalLink size={16} /> 
                      {selectedProject.demo.includes('github') ? "View Repository" : `Visit ${new URL(selectedProject.demo).hostname}`}
                    </button>
                  )}
                  <button 
                    className="btn-secondary"
                    onClick={(e) => handleOpenGithub(selectedProject, e)}
                  >
                    <GithubIcon size={16} /> GitHub (Aneeshunique007)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
