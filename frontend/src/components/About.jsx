import React from 'react';
import { BrainCircuit, Cpu, Sparkles, CheckCircle2, Download, ArrowUpRight, Network } from 'lucide-react';

export default function About({ showToast }) {
  const stats = [
    { value: "4+", label: "Enterprise AI Platforms", detail: "Shipped & live on Azure" },
    { value: ">99%", label: "Model & OCR Accuracy", detail: "Automotive & financial pipelines" },
    { value: "96%", label: "Workflow Time Saved", detail: "Reduced 40-min tasks to <15s" },
    { value: "2.5K+", label: "Engineering Commits", detail: "Full-stack & AI pipelines" },
  ];

  const pillars = [
    {
      icon: <BrainCircuit size={24} className="pillar-icon" />,
      title: "Generative AI & RAG Systems",
      desc: "Architecting custom Retrieval-Augmented Generation (RAG) pipelines, integrating Google Gemini 2.5, TinyLlama, Hugging Face Transformers, and Azure Document Intelligence OCR."
    },
    {
      icon: <Cpu size={24} className="pillar-icon" />,
      title: "Deep Learning & Predictive Analytics",
      desc: "Designing multi-horizon LSTM & GRU sequence models for quantitative market forecasting, CNN apparel classifiers, OpenCV facial recognition, and data science pipelines in TensorFlow/Keras."
    },
    {
      icon: <Network size={24} className="pillar-icon" />,
      title: "Full-Stack Microservices & Cloud",
      desc: "Building decoupled microservices across React 18, TypeScript, Python FastAPI, Node.js/GraphQL, MongoDB, ReportLab PDF generators, Docker, and Microsoft Azure Container Apps."
    },
  ];

  const handleResumeDownload = (e) => {
    e.preventDefault();
    showToast("Resume download link requested!");
  };

  return (
    <section id="about" className="section-padding about-section">
      <div className="container">
        {/* Section Header */}
        <div className="about-header">
          <span className="section-tag">01 // ABOUT ME</span>
          <h2 className="section-title">
            Engineering intelligent AI systems & high-performance full-stack architectures.
          </h2>
        </div>

        {/* Two Column Layout: Story & Metrics */}
        <div className="about-grid">
          {/* Left Column: Narrative Bio */}
          <div className="about-narrative">
            <p className="narrative-lead">
              Hello! I'm <strong className="text-white">Aneesh U S</strong>, an <strong className="text-white">AI Engineer & Data Scientist at Adam-i Innovations</strong>, specializing in Generative AI, RAG architectures, machine learning models, and end-to-end full-stack web platforms.
            </p>
            <p className="narrative-body">
              At Adam-i Innovations, I engineer production AI platforms that solve mission-critical operational bottlenecks across international trade, automotive logistics, and quantitative finance. My work spans the complete lifecycle—from training deep learning forecasting models and prompt engineering multimodal LLMs to architecting type-safe GraphQL backends, FastAPI inference services, and responsive React 18 interfaces.
            </p>
            <p className="narrative-body">
              Flagship systems I've built include <strong>Masshou AutoDoc</strong> (automating Japanese MLIT export certificate translation in under 15 seconds with Azure OCR and Gemini AI), <strong>iMarketPredict</strong> (multi-horizon Tokyo Stock Exchange predictive analytics powered by LSTM/GRU networks), and <strong>AniLearn 日本語</strong> (an adaptive full-stack Japanese language learning platform).
            </p>

            <div className="about-badges-row">
              <span className="about-badge">
                <CheckCircle2 size={16} color="#FF4A17" /> Generative AI & RAG Specialist
              </span>
              <span className="about-badge">
                <CheckCircle2 size={16} color="#FF4A17" /> Production Microservices & Azure
              </span>
              <span className="about-badge">
                <CheckCircle2 size={16} color="#FF4A17" /> End-to-End Data Science Pipelines
              </span>
            </div>

            <div className="about-cta-group">
              <a 
                href="#projects" 
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                VIEW AI PLATFORMS
                <ArrowUpRight size={17} />
              </a>
              <button 
                className="btn-secondary"
                onClick={handleResumeDownload}
              >
                <Download size={16} />
                DOWNLOAD CV
              </button>
            </div>
          </div>

          {/* Right Column: Key Stats Matrix */}
          <div className="about-stats-container">
            <div className="stats-matrix">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-card glass-panel">
                  <span className="stat-num">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-detail">{stat.detail}</span>
                  <div className="stat-glow"></div>
                </div>
              ))}
            </div>

            {/* Quick Profile summary card */}
            <div className="profile-quick-card glass-panel">
              <div className="quick-item">
                <span className="label">Current Role</span>
                <span className="value highlight-orange">AI Engineer / Data Scientist</span>
              </div>
              <div className="quick-item">
                <span className="label">Organization</span>
                <span className="value">Adam-i Innovations</span>
              </div>
              <div className="quick-item">
                <span className="label">Location</span>
                <span className="value">Trivandrum, Kerala, India</span>
              </div>
              <div className="quick-item">
                <span className="label">Core Specialization</span>
                <span className="value">GenAI, RAG, Python, React, Cloud</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / Core Focus */}
        <div className="pillars-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="pillar-card glass-panel">
              <div className="pillar-icon-box">
                {pillar.icon}
              </div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
