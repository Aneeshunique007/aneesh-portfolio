import React, { useState } from 'react';
import { ArrowUpRight, Zap } from 'lucide-react';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('genai');

  const categories = [
    { id: 'genai', label: 'Generative AI & LLMs' },
    { id: 'ml', label: 'Data Science & ML' },
    { id: 'fullstack', label: 'Full-Stack & APIs' },
    { id: 'cloud', label: 'Cloud & DevOps' },
  ];

  const skills = [
    // Generative AI & LLMs
    { 
      name: 'Google Gemini 2.5 (Pro / Flash)', 
      category: 'genai', 
      tag: 'Multimodal LLM Reasoning', 
      project: 'Masshou AutoDoc',
      proof: 'Automated 41+ fields with >99% accuracy & Japanese Imperial Era mapping.' 
    },
    { 
      name: 'Enterprise RAG & FAISS', 
      category: 'genai', 
      tag: 'Vector Search & Embeddings', 
      project: 'Production Platforms',
      proof: 'Sub-second hybrid dense vector indexing & context-grounded reasoning.' 
    },
    { 
      name: 'Azure Document Intelligence', 
      category: 'genai', 
      tag: 'Multimodal OCR & Layout', 
      project: 'Masshou AutoDoc',
      proof: 'High-speed document parsing, bounding box extraction & multi-format OCR.' 
    },
    { 
      name: 'Hugging Face Transformers', 
      category: 'genai', 
      tag: 'NLP & Sequence Modeling', 
      project: 'AI Pipelines',
      proof: 'Tokenizer pipelines, custom loss functions, and model fine-tuning.' 
    },
    { 
      name: 'MediaPipe Vision & Three.js', 
      category: 'genai', 
      tag: 'Spatial Vision & 3D Avatars', 
      project: 'Interactive AI',
      proof: 'In-browser 478-point facial mesh tracking & real-time avatar animation.' 
    },
    { 
      name: 'Azure Speech SDK (STT/TTS)', 
      category: 'genai', 
      tag: 'Bilingual Voice Engines', 
      project: 'Voice AI Systems',
      proof: 'Real-time bilingual Japanese/English speech recognition & neural synthesis.' 
    },

    // Data Science & ML
    { 
      name: 'LSTM & GRU Neural Networks', 
      category: 'ml', 
      tag: 'Time-Series Sequence Forecasting', 
      project: 'iMarketPredict',
      proof: 'Multi-horizon equity price window forecasting (1D to 12M) with sector calibration.' 
    },
    { 
      name: 'TensorFlow & Keras', 
      category: 'ml', 
      tag: 'Deep Learning Architectures', 
      project: 'Predictive ML',
      proof: 'Custom loss metrics, sequence models, and multi-layer neural architectures.' 
    },
    { 
      name: 'Scikit-learn', 
      category: 'ml', 
      tag: 'Quantitative Analytics', 
      project: 'Financial Models',
      proof: 'Ensemble regressors, automated grid search, and portfolio risk calibration.' 
    },
    { 
      name: 'OpenCV & Computer Vision', 
      category: 'ml', 
      tag: 'Visual Processing & Tracking', 
      project: 'Vision Analytics',
      proof: 'Spatial bounding box parsing, facial encoding databases & defect detection.' 
    },
    { 
      name: 'Pandas & NumPy', 
      category: 'ml', 
      tag: 'High-Throughput Vector Math', 
      project: 'Data Pipelines',
      proof: 'Multi-dimensional vector math, financial OHLCV aggregation & ETL workflows.' 
    },
    { 
      name: 'Scrapy & Automated Ingestion', 
      category: 'ml', 
      tag: 'Data Extraction & Pipelines', 
      project: 'Data Scraping',
      proof: 'Resilient web scrapers, proxy rotation, and automated raw dataset pipelines.' 
    },

    // Full-Stack & APIs
    { 
      name: 'Python 3 (AsyncIO / OOP)', 
      category: 'fullstack', 
      tag: 'Core Engineering Language', 
      project: 'Core Backend',
      proof: 'Non-blocking concurrency, object-oriented design & robust data models.' 
    },
    { 
      name: 'FastAPI Microservices', 
      category: 'fullstack', 
      tag: 'Async Inference Microservices', 
      project: 'iMarket & AutoDoc',
      proof: 'High-speed async AI endpoints, Pydantic validation & zero-storage proxies.' 
    },
    { 
      name: 'React 18 / 19 & TypeScript', 
      category: 'fullstack', 
      tag: 'Reactive Web Architecture', 
      project: 'Client Frontends',
      proof: 'Interactive dual-pane split viewers, responsive HUD interfaces & type safety.' 
    },
    { 
      name: 'Node.js & Express', 
      category: 'fullstack', 
      tag: 'API Gateways & Auth', 
      project: 'Enterprise Gateways',
      proof: 'JWT authentication, multi-tenant RBAC, and background queue schedulers.' 
    },
    { 
      name: 'GraphQL & Apollo Server', 
      category: 'fullstack', 
      tag: 'Type-Safe Data Federation', 
      project: 'iMarketPredict',
      proof: 'Consolidated portfolio queries, real-time resolvers & subscription billing.' 
    },
    { 
      name: 'Django & Django REST', 
      category: 'fullstack', 
      tag: 'Relational Web Systems', 
      project: 'Platform Backends',
      proof: 'ORM architecture, robust serializers, and secure administrative controls.' 
    },

    // Cloud, DBs & DevOps
    { 
      name: 'Azure Container Apps', 
      category: 'cloud', 
      tag: 'Microservice Orchestration', 
      project: 'Cloud Deployment',
      proof: 'Serverless container scaling, ingress routing, and multi-tenant security.' 
    },
    { 
      name: 'Docker & Multi-Stage Builds', 
      category: 'cloud', 
      tag: 'Container Optimization', 
      project: 'Production Images',
      proof: 'Optimized minimal footprints (<4GB) for Python ML & Node microservices.' 
    },
    { 
      name: 'ReportLab PDF Vector Engine', 
      category: 'cloud', 
      tag: 'Official Vector PDF Replication', 
      project: 'Masshou AutoDoc',
      proof: 'Pixel-perfect replication of Japanese Ministry (MLIT) export certificates.' 
    },
    { 
      name: 'MongoDB & Mongoose', 
      category: 'cloud', 
      tag: 'Document Database Systems', 
      project: 'NoSQL Storage',
      proof: 'Dynamic document schemas, indexing strategies & aggregation pipelines.' 
    },
    { 
      name: 'PostgreSQL & MySQL', 
      category: 'cloud', 
      tag: 'Relational ACID Storage', 
      project: 'Enterprise Storage',
      proof: 'Normalized relational schemas, transactional safety, and complex joins.' 
    },
    { 
      name: 'GitHub Actions CI/CD', 
      category: 'cloud', 
      tag: 'Automated Delivery Pipelines', 
      project: 'DevOps & Workflows',
      proof: 'Continuous integration, automated container linting & rolling production deploys.' 
    },
  ];

  const filteredSkills = skills.filter(item => item.category === activeTab);

  return (
    <section id="skills" className="section-padding skills-section">
      <div className="container">
        {/* Header */}
        <div className="skills-header">
          <span className="section-tag">02 // TECHNICAL ARSENAL</span>
          <h2 className="section-title">SPECIALIZED AI &amp; FULL-STACK TOOLING.</h2>
          <p className="section-subtitle">
            Every technology in my stack is validated by real production systems. Click any tool to inspect its flagship implementation.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="skills-tab-filter">
          {categories.map(tab => (
            <button
              key={tab.id}
              className={`skills-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {activeTab === tab.id && <span className="tab-indicator"></span>}
            </button>
          ))}
        </div>

        {/* Project-Linked Skills Grid */}
        <div className="skills-tiles-grid">
          {filteredSkills.map((skill) => (
            <div 
              key={skill.name} 
              className="skill-tile glass-panel"
              onClick={() => {
                document.querySelector("#projects")?.scrollIntoView({ behavior: 'smooth' });
              }}
              role="button"
              tabIndex={0}
              title={`View ${skill.project} in Projects`}
            >
              <div className="skill-tile-top">
                <div className="skill-tile-tag-group">
                  <span className="skill-live-dot" aria-hidden="true">●</span>
                  <span className="skill-category-tag">{skill.tag}</span>
                </div>
                <span className="skill-project-anchor">
                  <span className="anchor-text">{skill.project}</span>
                  <ArrowUpRight size={13} className="anchor-arrow" />
                </span>
              </div>

              <h3 className="skill-tile-title">{skill.name}</h3>
              <p className="skill-tile-proof">{skill.proof}</p>
            </div>
          ))}
        </div>

        {/* Bottom Banner Feature */}
        <div className="skills-quote-card glass-panel">
          <div className="quote-icon-col">
            <Zap size={28} className="quote-zap-icon" />
          </div>
          <div className="quote-text-col">
            <h4>Engineering Philosophy</h4>
            <p>
              "Production AI isn't just about calling an API; it requires architecting bulletproof data ingestion pipelines, deterministic validation rules, low-latency microservices, and intuitive interfaces that turn complex machine learning into effortless business value."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
