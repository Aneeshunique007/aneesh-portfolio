import React from 'react';

const TRACK_ONE = [
  { icon: "⚡", label: "Generative AI Architectures" },
  { icon: "🧠", label: "Enterprise RAG & Hybrid Search" },
  { icon: "🏎️", label: "PyTorch & Deep Learning" },
  { icon: "💎", label: "Google Gemini 2.5 Pro & Multimodal LLMs" },
  { icon: "🌐", label: "FastAPI High-Throughput Microservices" },
  { icon: "🇯🇵", label: "TSE Quantitative Stock Prediction" },
  { icon: "👁️", label: "MediaPipe Computer Vision & Gaze Tracking" },
  { icon: "🛡️", label: "Azure AI & Document Intelligence" },
];

const TRACK_TWO = [
  { icon: "🚀", label: "Vector Databases & Semantic Embeddings" },
  { icon: "📈", label: "LSTM / GRU Neural Forecasting" },
  { icon: "📦", label: "Docker Containerization & Production CI/CD" },
  { icon: "📑", label: "ReportLab Official Japanese PDF Engine" },
  { icon: "✨", label: "React 19, TypeScript & Next.js" },
  { icon: "🔗", label: "LangChain & LlamaIndex Workflows" },
  { icon: "🤖", label: "Autonomous Agentic Tool-Use Systems" },
  { icon: "🎯", label: "Sub-Second Latency Cloud Deployment" },
];

export default function MarqueeStreamer() {
  return (
    <section className="marquee-section" aria-label="Core Technology and Engineering Capabilities">
      <div className="marquee-container">
        {/* Track 1: Flows Left */}
        <div className="marquee-row marquee-left">
          <div className="marquee-track">
            {TRACK_ONE.concat(TRACK_ONE).map((item, idx) => (
              <div key={`t1-${idx}`} className="marquee-pill">
                <span className="marquee-pill-icon">{item.icon}</span>
                <span className="marquee-pill-text">{item.label}</span>
                <span className="marquee-pill-dot" aria-hidden="true">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Flows Right */}
        <div className="marquee-row marquee-right">
          <div className="marquee-track">
            {TRACK_TWO.concat(TRACK_TWO).map((item, idx) => (
              <div key={`t2-${idx}`} className="marquee-pill marquee-pill-alt">
                <span className="marquee-pill-icon">{item.icon}</span>
                <span className="marquee-pill-text">{item.label}</span>
                <span className="marquee-pill-dot" aria-hidden="true">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Edge gradient fade masks */}
      <div className="marquee-fade-left" aria-hidden="true"></div>
      <div className="marquee-fade-right" aria-hidden="true"></div>
    </section>
  );
}
