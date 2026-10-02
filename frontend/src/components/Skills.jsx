import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Database, 
  Terminal, 
  Cloud, 
  Workflow, 
  Check, 
  Sparkles,
  Zap,
  Cpu,
  Layers
} from 'lucide-react';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'genai', label: 'Generative AI & LLMs' },
    { id: 'ml', label: 'Data Science & ML' },
    { id: 'fullstack', label: 'Full-Stack & APIs' },
    { id: 'cloud', label: 'Cloud, DBs & DevOps' },
  ];

  const skills = [
    // Generative AI & LLMs
    { name: 'RAG Architectures', category: 'genai', level: 'Expert', experience: 'Production', desc: 'Custom retrieval systems, embeddings, vector indexing, context-aware reasoning' },
    { name: 'Google Gemini 2.5 Pro / Flash', category: 'genai', level: 'Expert', experience: 'Production', desc: 'Contextual translation, multi-modal structuring, automotive taxonomy mapping' },
    { name: 'Hugging Face Transformers', category: 'genai', level: 'Expert', experience: '3+ yrs', desc: 'Text generation, sequence classification, tokenizers, pipeline fine-tuning' },
    { name: 'Vision-Language & OCR', category: 'genai', level: 'Expert', experience: 'Production', desc: 'Azure Document Intelligence, multi-format layout OCR, bounding box parsing' },
    { name: 'MediaPipe Vision & Three.js', category: 'genai', level: 'Expert', experience: 'Production', desc: 'In-browser iris gaze calculation, 478-point facial mesh, posture tracking, 3D interactive avatars' },
    { name: 'Azure Speech SDK (STT/TTS)', category: 'genai', level: 'Advanced', experience: 'Production', desc: 'Real-time bilingual Japanese/English speech recognition, audio buffering, voice synthesis' },

    // Data Science & ML
    { name: 'TensorFlow & Keras', category: 'ml', level: 'Expert', experience: 'Production', desc: 'Deep learning neural nets, CNN image classification, custom loss functions' },
    { name: 'LSTM & GRU Networks', category: 'ml', level: 'Expert', experience: 'Production', desc: 'Multi-horizon sequence forecasting for financial equities and time-series' },
    { name: 'Scikit-learn', category: 'ml', level: 'Expert', experience: '2+ yrs', desc: 'Ensemble models, regression, clustering, hyperparameter grid search' },
    { name: 'OpenCV & Computer Vision', category: 'ml', level: 'Advanced', experience: '2+ yrs', desc: 'Face recognition, encodings databases, real-time bounding box tracking' },
    { name: 'Pandas & NumPy', category: 'ml', level: 'Expert', experience: '3 yrs', desc: 'Data cleaning pipelines, ETL aggregation, vector operations, matrix math' },
    { name: 'Scrapy & Web Extraction', category: 'ml', level: 'Advanced', experience: '2+ yrs', desc: 'Automated data scraping, rate limiting, pipeline preprocessing' },
    { name: 'Data Visualization (Matplotlib/Seaborn)', category: 'ml', level: 'Expert', experience: '2+ yrs', desc: 'Exploratory data analysis, statistical charting, Power BI dashboards' },

    // Full-Stack & APIs
    { name: 'Python', category: 'fullstack', level: 'Expert', experience: '3 yrs', desc: 'AsyncIO, OOP, algorithm design, data pipeline automation' },
    { name: 'React 18/19 & TypeScript', category: 'fullstack', level: 'Expert', experience: 'Production', desc: 'Modern hooks, Redux Toolkit, Vite, Ant Design, Tailwind CSS' },
    { name: 'FastAPI', category: 'fullstack', level: 'Expert', experience: 'Production', desc: 'High-throughput async AI inference microservices, Pydantic schemas' },
    { name: 'Node.js & Express', category: 'fullstack', level: 'Expert', experience: 'Production', desc: 'API gateways, JWT authentication, RBAC, background job schedulers' },
    { name: 'GraphQL & Apollo Server', category: 'fullstack', level: 'Advanced', experience: 'Production', desc: 'Type-safe schemas, resolvers, mutations, Apollo Client queries' },
    { name: 'Django & Django REST Framework', category: 'fullstack', level: 'Advanced', experience: '2+ yrs', desc: 'ORM, serializers, auth middlewares, admin interfaces' },

    // Cloud, DBs & DevOps
    { name: 'Microsoft Azure Container Apps', category: 'cloud', level: 'Expert', experience: 'Production', desc: 'Microservice container orchestration, ingress rules, scaling policies' },
    { name: 'MongoDB (Mongoose)', category: 'cloud', level: 'Expert', experience: 'Production', desc: 'Document schemas, aggregation pipelines, multi-tenant collections' },
    { name: 'PostgreSQL & MySQL', category: 'cloud', level: 'Advanced', experience: '2+ yrs', desc: 'Relational modeling, indexing, ACID transactions, complex joins' },
    { name: 'Docker & Multi-Stage Builds', category: 'cloud', level: 'Advanced', experience: 'Production', desc: 'Containerizing Python ML and Node.js microservices (<4GB footprints)' },
    { name: 'ReportLab PDF Vector Engine', category: 'cloud', level: 'Expert', experience: 'Production', desc: 'Pixel-perfect official Japanese MLIT certificate replication & typography' },
    { name: 'Git & GitHub Actions', category: 'cloud', level: 'Expert', experience: '3 yrs', desc: 'Continuous integration, automated deployments, branch workflows' },
  ];

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(item => item.category === activeTab);

  return (
    <section id="skills" className="section-padding skills-section">
      <div className="container">
        {/* Header */}
        <div className="skills-header">
          <span className="section-tag">02 // CAPABILITIES</span>
          <h2 className="section-title">Specialized AI & Full-Stack Tooling.</h2>
          <p className="section-subtitle">
            A comprehensive overview of the machine learning frameworks, large language models, cloud services, and full-stack technologies I leverage daily.
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

        {/* Skills Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill) => (
            <div key={skill.name} className="skill-card glass-panel">
              <div className="skill-card-top">
                <div className="skill-name-group">
                  <h3 className="skill-title">{skill.name}</h3>
                  <span className="skill-exp">{skill.experience}</span>
                </div>
                <span className={`skill-level-pill ${skill.level.toLowerCase()}`}>
                  {skill.level}
                </span>
              </div>
              <p className="skill-description">{skill.desc}</p>
              <div className="skill-bar-track">
                <div 
                  className="skill-bar-fill" 
                  style={{ 
                    width: skill.level === 'Expert' ? '94%' : skill.level === 'Advanced' ? '82%' : '72%' 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Feature */}
        <div className="skills-quote-card glass-panel">
          <div className="quote-icon-col">
            <Zap size={32} color="#FF4A17" />
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
