import React from 'react';
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      period: "2025 — Present",
      role: "AI Engineer / Data Scientist",
      company: "Adam-i Innovations",
      location: "Tokyo, Japan / Trivandrum, India",
      type: "Full-Time Tech",
      description: "Spearheading engineering on production Generative AI platforms, multimodal document intelligence pipelines, and quantitative stock market prediction engines deployed on Microsoft Azure Container Apps.",
      achievements: [
        "Architected Masshou AutoDoc (masshouautodoc.jp), integrating Azure Document Intelligence OCR and Google Gemini 2.5 to extract and translate 41+ Japanese automotive fields in <15 seconds with >99% accuracy",
        "Engineered iMarketPredict quantitative analytics platform using TensorFlow/Keras LSTM & GRU ensemble networks for multi-horizon price forecasting across 100+ Tokyo Stock Exchange equities",
        "Developed decoupled microservices across React 18, TypeScript, Python FastAPI, Node.js GraphQL API gateway, MongoDB, and Python ReportLab vector PDF generation engines",
        "Engineered Adam-i Talent Hub, building dual-engine MongoDB vector & Gemini 2.5 Pro matching, Levenshtein candidate deduplication, and automated background IMAP email JD ingestion",
        "Developed in-browser AI Mock Interview Studio with Three.js 3D avatars, Google MediaPipe Tasks-Vision (iris gaze and posture tracking), and Azure Speech SDK"
      ],
      skills: ["Generative AI", "RAG", "Python", "FastAPI", "React 19", "TypeScript", "TensorFlow", "MediaPipe Vision", "Azure Speech", "Azure Container Apps"]
    },
    {
      period: "2024 — 2025",
      role: "Full-Stack Development & Data Science Specialist",
      company: "Faith InfoTech Academy, Technopark",
      location: "Technopark, Trivandrum, India",
      type: "Technical Specialization",
      description: "Intensive engineering specialization focused on advanced machine learning pipelines, Generative AI models, and scalable full-stack web applications.",
      achievements: [
        "Architected FaithAI: autonomous RAG platform pairing a Scrapy web crawler, Meta FAISS in-memory vector index (bge-small-en), and CPU-optimized TinyLlama-1.1B LLM (<1.8s response latency, zero cloud API fees, one-click self-healing sync)",
        "Engineered CNN-based image classification system for apparel categorization in TensorFlow/Keras and FastAPI, achieving 85% accuracy and slashing manual tagging by 70%",
        "Built real-time face recognition system using Python, OpenCV, and Django REST Framework with bounding box detection and player identification encodings",
        "Mastered end-to-end data science pipelines: data wrangling with Pandas/NumPy, statistical analysis with SciPy, and visualization in Matplotlib/Seaborn"
      ],
      skills: ["Python", "TinyLlama", "RAG", "TensorFlow", "Keras", "OpenCV", "FastAPI", "Django REST Framework", "Scrapy"]
    },
    {
      period: "2023 — 2024",
      role: "Full-Stack Technical Project Developer",
      company: "Independent Technical Innovations",
      location: "Trivandrum, India",
      type: "Software Engineering",
      description: "Architected end-to-end full-stack web platforms and specialized healthcare software systems.",
      achievements: [
        "Architected AniLearn 日本語, a full-stack Japanese learning web platform with dynamic study schedule algorithms, Web Speech API integration, and JLPT curriculum vault",
        "Architected Clinical Management System (31,000+ LOC, 124 REST endpoints, 20 models): engineered 5-tier RBAC (Admin, Doctor, Receptionist, Lab Tech, Pharmacist), 10-minute collision-proof slot scheduling, ReportLab pathology PDF generation, and Hugging Face AI clinical proxy",
        "Designed responsive frontends with real-time state synchronization, clean component architectures, and secure JWT authentication"
      ],
      skills: ["React.js", "Node.js", "Express", "MongoDB", "MySQL", "Django", "Tailwind CSS", "RESTful APIs"]
    }
  ];

  return (
    <section id="experience" className="section-padding experience-section">
      <div className="container">
        {/* Header */}
        <div className="experience-header">
          <span className="section-tag">04 // JOURNEY</span>
          <h2 className="section-title">Technical Experience & Engineering Career.</h2>
          <p className="section-subtitle">
            A focused record of developing production AI platforms, training deep learning models, and building scalable full-stack web architectures.
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
                    <span className="timeline-period-badge">
                      <Calendar size={13} />
                      {item.period}
                    </span>
                    <h3 className="timeline-role">{item.role}</h3>
                    <div className="timeline-company-row">
                      <span className="timeline-company">{item.company}</span>
                      <span className="timeline-dot">•</span>
                      <span className="timeline-loc">
                        <MapPin size={13} /> {item.location}
                      </span>
                    </div>
                  </div>
                  <span className="timeline-type-pill">{item.type}</span>
                </div>

                <p className="timeline-desc">{item.description}</p>

                <div className="timeline-achievements">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="achievement-row">
                      <span className="ach-bullet">›</span>
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                <div className="timeline-skills-list">
                  {item.skills.map((skill) => (
                    <span key={skill} className="timeline-skill-tag">{skill}</span>
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
