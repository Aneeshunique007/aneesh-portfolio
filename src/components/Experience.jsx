import React from 'react';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      period: "2025 — Present",
      role: "AI Engineer / Data Scientist",
      company: "Adam-i Innovations",
      location: "Tokyo, Japan & Trivandrum, India",
      type: "Current Role",
      bullets: [
        {
          label: "Production AI Systems",
          text: "Architecting and deploying enterprise Generative AI platforms, multimodal document intelligence pipelines, and quantitative deep learning forecasting models."
        },
        {
          label: "Cloud & Microservice Infrastructure",
          text: "Engineering decoupled microservices across React 19, TypeScript, Python FastAPI, and GraphQL gateways deployed on Microsoft Azure Container Apps."
        },
        {
          label: "Enterprise Delivery & Governance",
          text: "Leading end-to-end implementations with multi-tenant RBAC security, automated confidence auditing, and resilient cloud CI/CD pipelines."
        }
      ]
    },
    {
      period: "2024 — 2025",
      role: "Full-Stack & Data Science Specialist",
      company: "Faith InfoTech Academy",
      location: "Technopark, Trivandrum, India",
      type: "Specialization",
      bullets: [
        {
          label: "Machine Learning & Computer Vision",
          text: "Engineered automated ML pipelines, CNN classification models, and real-time computer vision facial detection architectures."
        },
        {
          label: "Autonomous Retrieval & RAG",
          text: "Researched and built low-latency CPU-optimized RAG pipelines, dense vector indices, and automated web crawling ingestion systems."
        },
        {
          label: "Statistical & Data Pipelines",
          text: "Built high-throughput data processing workflows with Pandas, NumPy, and statistical hypothesis testing engines."
        }
      ]
    },
    {
      period: "2023 — 2024",
      role: "Full-Stack Technical Project Developer",
      company: "Independent Technical Innovations",
      location: "Trivandrum, India",
      type: "Foundational",
      bullets: [
        {
          label: "Enterprise Web Platforms",
          text: "Engineered scalable healthcare workflow management systems with 5-tier RBAC, collision-proof slot scheduling, and ReportLab PDF engines."
        },
        {
          label: "Frontend & API Architecture",
          text: "Built responsive, high-performance web applications with modular component architecture, state management, and secure JWT authentication."
        },
        {
          label: "Database Optimization",
          text: "Designed normalized relational schemas and document stores (MySQL, MongoDB) optimized for query speed and transactional integrity."
        }
      ]
    }
  ];

  return (
    <section id="experience" className="section-padding experience-section">
      <div className="container">
        {/* Header */}
        <div className="experience-header">
          <span className="section-tag">04 // JOURNEY</span>
          <h2 className="section-title">ENGINEERING CAREER &amp; MILESTONES.</h2>
          <p className="section-subtitle">
            A focused track record of architecting production AI platforms, quantitative deep learning models, and scalable full-stack web systems.
          </p>
        </div>

        {/* Timeline Track */}
        <div className="timeline-container">
          <div className="timeline-spine"></div>

          {experiences.map((item, index) => (
            <div key={index} className="timeline-item">
              {/* Timeline Indicator Dot */}
              <div className="timeline-node">
                <div className="node-outer">
                  <div className="node-inner"></div>
                </div>
              </div>

              {/* Timeline Card */}
              <div className="timeline-card glass-panel">
                <div className="timeline-card-header">
                  <div className="timeline-role-info">
                    <div className="timeline-meta-top">
                      <span className="timeline-period-badge">
                        <Calendar size={13} />
                        {item.period}
                      </span>
                      <span className={`timeline-status-badge ${item.type === 'Current Role' ? 'status-active' : ''}`}>
                        {item.type === 'Current Role' && <Sparkles size={11} />}
                        {item.type}
                      </span>
                    </div>
                    <h3 className="timeline-role">{item.role}</h3>
                    <div className="timeline-company-row">
                      <span className="timeline-company">{item.company}</span>
                      <span className="timeline-dot">•</span>
                      <span className="timeline-loc">
                        <MapPin size={13} /> {item.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Executive Scope Bullets */}
                <div className="timeline-scope-list">
                  {item.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="timeline-scope-item">
                      <span className="timeline-scope-bullet">›</span>
                      <div className="timeline-scope-content">
                        <strong className="timeline-scope-label">{bullet.label}:</strong>
                        <span className="timeline-scope-text">{bullet.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
