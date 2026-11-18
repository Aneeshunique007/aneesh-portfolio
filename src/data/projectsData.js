export const PROJECTS = [
  {
    slug: "masshou-autodoc",
    title: "Masshou AutoDoc",
    subtitle: "AI Automotive Document Intelligence Platform",
    tagline: "Automating Japan's Vehicle Export Logistics with Multimodal OCR & Vector PDF Synthesis",
    category: "genai",
    status: "PRODUCTION SYSTEM // ACTIVE FLEET",
    role: "Lead AI Engineer & Full-Stack Architect",
    timeline: "2024 – Present",
    clientOrg: "Adam-i Innovations / Japan Automotive Exporters",
    image: "/project-masshou.jpg",
    tags: ["Azure Document Intel", "Google Gemini 2.5", "FastAPI", "React 19", "Python ReportLab", "Docker"],
    demo: "https://masshouautodoc.jp/",
    github: "https://github.com/Aneeshunique007",
    metrics: [
      { value: "< 15s", label: "End-to-End Latency", detail: "Down from 40 mins manual transcription" },
      { value: "> 99%", label: "Audited Accuracy", detail: "Across 41+ complex Japanese Kanji fields" },
      { value: "96%", label: "Time Reduction", detail: "Over legacy human translation desks" },
      { value: "0", label: "Kanji Leakage", detail: "Imperial era mapping to Gregorian standards" }
    ],
    theHumanProblem: "Manual desks spent 40 mins per export title squinting at low-res Japanese Kanji and Imperial dates, risking customs seizures from typo errors.",
    theArchitecturalBet: "Deterministic two-stage pipeline: Azure Document Intel extracts spatial Kanji bounding boxes, routed to Google Gemini 2.5 with constrained JSON schemas.",
    theFailureCaughtBeforeLaunch: "Legacy Showa stamps confused OCR weights with dates; engineered an automated Confidence Gate triggering human review only below 97% confidence.",
    architectureHighlights: [
      {
        title: "Hybrid OCR & LLM Pipeline",
        description: "Spatial layout extraction with context-aware Imperial era calendar translation."
      },
      {
        title: "Vector ReportLab Engine",
        description: "Pixel-perfect Japanese export certificate replication with cryptographic QR codes."
      },
      {
        title: "Dual-Pane Split Viewer",
        description: "Synchronized canvas letting operators inspect high-res scans vs extracted JSON in <3s."
      },
      {
        title: "Enterprise Governance",
        description: "Multi-tenant RBAC, Stripe billing, and domestic Japanese bank transfer workflows."
      }
    ]
  },
  {
    slug: "imarket-predict",
    title: "iMarketPredict",
    subtitle: "Institutional Quantitative Analytics & Deep Learning Engine",
    tagline: "Multi-Horizon Neural Forecasting & Streaming Portfolio Risk Analytics",
    category: "ml",
    status: "PRODUCTION SYSTEM // REAL-TIME FEED",
    role: "Quantitative ML Engineer & Backend Architect",
    timeline: "2023 – Present",
    clientOrg: "Institutional Equities Analytics",
    image: "/project-imarket.png",
    tags: ["TensorFlow / Keras", "LSTM / GRU Ensembles", "FastAPI", "React 18", "GraphQL", "Azure Cloud"],
    demo: "https://www.imarketpredict.com/",
    github: "https://github.com/Aneeshunique007",
    metrics: [
      { value: "100+", label: "Tracked Equities", detail: "Across 5 major global market sectors" },
      { value: "6", label: "Forecast Horizons", detail: "1D, 5D, 20D, 3M, 6M, and 12M windows" },
      { value: "0 MB", label: "Persistent Storage", detail: "Streaming zero-database proxy architecture" },
      { value: "< 250ms", label: "P&L Recalculation", detail: "Sharpe, Alpha, Beta vs global benchmarks" }
    ],
    theHumanProblem: "Institutional traders were burdened by expensive, bloated software requiring heavy local database syncs with opaque risk metrics.",
    theArchitecturalBet: "Zero-database streaming architecture: high-throughput FastAPI proxy feeds sector-calibrated LSTM/GRU neural ensembles for multi-horizon price distribution forecasting.",
    theFailureCaughtBeforeLaunch: "Opening market volatility triggered gradient swings; redesigned engine with GRU volatility dampening and statistical confidence intervals.",
    architectureHighlights: [
      {
        title: "LSTM / GRU Ensembles",
        description: "Multi-horizon price path forecasts across 1D to 12M market windows."
      },
      {
        title: "Streaming FastAPI Proxy",
        description: "Real-time OHLCV market feeds with zero persistent database latency."
      },
      {
        title: "Institutional Risk Suite",
        description: "Live mathematical computation of Sharpe Ratio, Alpha, Beta, and Max Drawdown."
      },
      {
        title: "Bilingual Quant UI",
        description: "Full English and Japanese financial terminology internationalization."
      }
    ]
  },
  {
    slug: "talent-hub",
    title: "Adam-i Talent Hub",
    subtitle: "Cross-Border AI Talent Matching & Multimodal Screening",
    tagline: "Gemini 2.5 Pro Vector Search Meets In-Browser 3D Computer Vision Interviews",
    category: "genai",
    status: "PRODUCTION SYSTEM // ACTIVE ATS",
    role: "Lead Full-Stack AI Engineer",
    timeline: "2024 – Present",
    clientOrg: "Adam-i Innovations",
    image: "/project-talenthub.jpg",
    tags: ["Gemini 2.5 Pro", "MongoDB Vector", "Three.js", "MediaPipe Vision", "Azure Speech", "React 19"],
    demo: "https://talenthub.ne.jp/",
    github: "https://github.com/Aneeshunique007",
    metrics: [
      { value: "< 3s", label: "Resume Parsing", detail: "97% faster than manual recruiting desks" },
      { value: "0%", label: "Agency Conflicts", detail: "Levenshtein string & contact matching" },
      { value: "85%", label: "Matching Time Saved", detail: "Cosine vector similarity across 4 dimensions" },
      { value: "+50%", label: "Interview Pass Rate", detail: "Validated through 3D avatar prep sessions" }
    ],
    theHumanProblem: "Cross-border recruiting between India and Japan suffered from candidate submission collisions, multilingual resume gaps, and interview anxiety.",
    theArchitecturalBet: "MongoDB Vector cosine similarity paired with Gemini 2.5 Pro for 4D candidate scoring, alongside a 3D avatar conducting vision interviews.",
    theFailureCaughtBeforeLaunch: "Screening models risk inheriting demographic bias; built a service-layer Ethical Bias Gate that scrubs non-defensible attributes.",
    architectureHighlights: [
      {
        title: "4D Semantic Matching",
        description: "Vector cosine similarity evaluating skills, JLPT fluency, and work style."
      },
      {
        title: "Ethical AI Gate",
        description: "Automated scrubber eliminating non-defensible attributes prior to model scoring."
      },
      {
        title: "3D Vision Studio",
        description: "Three.js avatar with MediaPipe facial mesh and Azure Speech bilingual dialogue."
      },
      {
        title: "Automated Mail Ingestion",
        description: "IMAP background daemons parsing inbound recruiter attachments directly into ATS."
      }
    ]
  },
  {
    slug: "interviewmate",
    title: "InterviewMate",
    subtitle: "AI Mock Interview & Real-Time Performance Analytics Platform",
    tagline: "In-Browser Speech & Computer Vision Behavioral Scoring for Technical Interviews",
    category: "genai",
    status: "PRODUCTION SYSTEM // ACTIVE PLATFORM",
    role: "Lead Full-Stack AI Engineer",
    timeline: "2024 – Present",
    clientOrg: "InterviewMate Japan / Enterprise Tech Hiring",
    image: "/project-interviewmate.png",
    tags: ["React 18", "TypeScript", "FastAPI", "MediaPipe Vision", "Azure Speech SDK"],
    demo: "http://interviewmate.jp/",
    github: "https://github.com/Aneeshunique007",
    metrics: [
      { value: "< 200ms", label: "Speech Latency", detail: "Real-time bilingual voice synthesis & STT" },
      { value: "478 Pts", label: "Facial Mesh", detail: "MediaPipe iris gaze & emotion blendshapes" },
      { value: "94%", label: "Scoring Accuracy", detail: "Automated candidate rubric evaluation" },
      { value: "100%", label: "In-Browser", detail: "Zero client installation required" }
    ],
    theHumanProblem: "Bilingual candidates lacked realistic mock environments with objective, real-time feedback on speech clarity, gaze confidence, and composure.",
    theArchitecturalBet: "Combined sub-200ms Azure Speech streaming with in-browser MediaPipe 478-point facial mesh tracking for real-time verbal and non-verbal behavioral scoring.",
    theFailureCaughtBeforeLaunch: "Variable room lighting caused mesh tracking drift; engineered a WebGL brightness normalization pass stabilizing landmark detection in any lighting.",
    architectureHighlights: [
      {
        title: "Bilingual Speech Engine",
        description: "Sub-200ms real-time question generation and voice synthesis in Japanese & English."
      },
      {
        title: "In-Browser Mesh Tracking",
        description: "478-point MediaPipe vision pipeline scoring eye contact, posture, and pacing."
      },
      {
        title: "Automated Scorecards",
        description: "Instant post-interview diagnostics across 5 core competencies."
      }
    ]
  },
  {
    slug: "faithai",
    title: "FaithAI",
    subtitle: "Autonomous Crawler & Sub-1.8s CPU RAG Engine",
    tagline: "Zero-Cost Enterprise Knowledge Retrieval with Scrapy & TinyLlama-1.1B on Bare CPU",
    category: "genai",
    status: "PRODUCTION SYSTEM // ZERO API COST",
    role: "AI Systems Architect",
    timeline: "2024",
    clientOrg: "Faith InfoTech Academy",
    image: "/project-faithai.png",
    tags: ["TinyLlama-1.1B", "Meta FAISS", "Scrapy", "Django 5", "React 19"],
    demo: null,
    github: "https://github.com/Aneeshunique007",
    metrics: [
      { value: "< 1.8s", label: "CPU Inference", detail: "TinyLlama-1.1B 4-thread CPU optimization" },
      { value: "< 15ms", label: "FAISS Retrieval", detail: "IndexFlatL2 vector cosine similarity" },
      { value: "$0 / mo", label: "API Cost", detail: "Self-hosted zero third-party API dependencies" },
      { value: "100%", label: "Autonomous", detail: "CrawlSpider ingestion with automated dedup" }
    ],
    theHumanProblem: "Educational institutions needed dynamic curriculum Q&A, but high cloud LLM API costs and proprietary data privacy concerns blocked adoption.",
    theArchitecturalBet: "Engineered an autonomous Scrapy crawler paired with Meta FAISS and lightweight TinyLlama-1.1B, achieving sub-1.8s inference on bare CPU with $0 API fees.",
    theFailureCaughtBeforeLaunch: "Recursive syllabus link loops generated duplicate FAISS vectors; introduced canonical URL hashing and content diffing before embedding.",
    architectureHighlights: [
      {
        title: "Autonomous CrawlSpider",
        description: "Scheduled headless crawler discovering and indexing curriculum changes."
      },
      {
        title: "CPU-Optimized FAISS",
        description: "Dense 384-dimensional vector retrieval executed in under 15ms without GPUs."
      },
      {
        title: "Deterministic Guardrails",
        description: "Strict threshold scoring ensuring the model never hallucinates beyond syllabus docs."
      }
    ]
  },
  {
    slug: "clinova-cms",
    title: "Clinova Health Care (CMS)",
    subtitle: "Enterprise Hospital & Clinical Workflow Platform",
    tagline: "Collision-Proof Scheduling, Vector Pathology Reports & 5-Tier Zero-Trust RBAC",
    category: "fullstack",
    status: "ENTERPRISE PLATFORM // ACTIVE",
    role: "Lead Full-Stack Engineer",
    timeline: "2023 – 2024",
    clientOrg: "Healthcare Management Systems",
    image: "/project-cms.png",
    tags: ["Django 5", "React 19", "MySQL", "ReportLab 4.4", "Hugging Face AI"],
    demo: null,
    github: "https://github.com/Aneeshunique007",
    metrics: [
      { value: "31k+", label: "Lines of Code", detail: "Battle-tested clinical architecture" },
      { value: "124", label: "REST Endpoints", detail: "Secure transactional patient APIs" },
      { value: "5-Tier", label: "Zero-Trust RBAC", detail: "Doctor, Nurse, Admin, Lab & Patient" },
      { value: "0%", label: "Slot Collisions", detail: "Transactional database booking locks" }
    ],
    theHumanProblem: "Hospitals suffered from lost paper files, appointment double-bookings, delayed lab reports, and severe patient privacy vulnerabilities.",
    theArchitecturalBet: "Engineered an enterprise clinic platform with 5-tier zero-trust RBAC, atomic database slot locks that eliminate collisions, and vector PDF pathology synthesis.",
    theFailureCaughtBeforeLaunch: "Peak-hour appointment surges caused race conditions; implemented database row locks with automatic rollback to ensure zero double-booking.",
    architectureHighlights: [
      {
        title: "Atomic Slot Allocator",
        description: "Collision-proof scheduling with emergency override workflows."
      },
      {
        title: "Pathology ReportLab PDF",
        description: "Printable, cryptographically verifiable lab reports generated in <2s."
      },
      {
        title: "Zero-Trust 5-Tier RBAC",
        description: "Strict privilege separation across Doctors, Nurses, Admins, Labs, and Patients."
      }
    ]
  },
  {
    slug: "anilearn",
    title: "AniLearn 日本語",
    subtitle: "Gamified Japanese Mastery & Speech Immersion",
    tagline: "Anime Dialogue Immersion, Interactive Kanji Drills & Web Speech Pronunciation",
    category: "fullstack",
    status: "WEB PLATFORM // PUBLIC",
    role: "Full-Stack Creator & Language Engineer",
    timeline: "2023 – 2024",
    clientOrg: "Independent Educational Platform",
    image: "/project-anilearn.jpg",
    tags: ["React 18", "TypeScript", "Node.js", "MongoDB", "Web Speech API"],
    demo: null,
    github: "https://github.com/Aneeshunique007",
    metrics: [
      { value: "3,000+", label: "Interactive Drills", detail: "Context-rich sentence exercises" },
      { value: "1,488", label: "JLPT Vocabulary", detail: "N5 through N2 curriculum coverage" },
      { value: "318", label: "Kanji Radicals", detail: "Stroke-order and mnemonic breakdowns" },
      { value: "< 50ms", label: "Speech Feedback", detail: "In-browser native pronunciation grading" }
    ],
    theHumanProblem: "Textbook Japanese learning feels disconnected from real dialogue, causing hesitation and low retention when speaking with native speakers.",
    theArchitecturalBet: "Interactive gamified platform coupling native dialogue breakdowns with in-browser Web Speech pronunciation grading and spaced-repetition drills.",
    theFailureCaughtBeforeLaunch: "Browser speech engines returned erratic confidence scores; built normalized phoneme distance scoring for fair pronunciation grading.",
    architectureHighlights: [
      {
        title: "Speech Pronunciation Grader",
        description: "Real-time phonetic matching analyzing Japanese pitch and accent in under 50ms."
      },
      {
        title: "Spaced-Repetition Kanji",
        description: "Dynamic Leitner-box review queues covering JLPT N5 through N2."
      },
      {
        title: "Instant Multilingual Lookup",
        description: "Debounced real-time fuzzy search across Kanji, Kana, Romaji, and English."
      }
    ]
  }
];
