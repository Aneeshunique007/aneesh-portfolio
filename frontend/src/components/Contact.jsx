import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check,
  CheckCircle2,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

export default function Contact({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'web-app',
    message: ''
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const inquiryOptions = [
    { value: "web-app", label: "Full-Stack Web Application" },
    { value: "genai-llm", label: "Generative AI & LLM Systems" },
    { value: "frontend-ui", label: "Frontend Engineering & UI/UX" },
    { value: "backend-cloud", label: "Cloud Architecture & API Infrastructure" },
    { value: "consulting", label: "System Audit / Technical Consultation" },
    { value: "fulltime", label: "Full-time Engineering Role" }
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const email = "aneeshusunique@gmail.com";
  const phone = "+91 86672 70586";

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      showToast("Email address copied to clipboard!");
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedPhone(true);
      showToast("Phone number copied to clipboard!");
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    // Simulate high-end asynchronous API dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast("Thank you! Your message has been sent successfully.");
      setFormData({
        name: '',
        email: '',
        projectType: 'web-app',
        message: ''
      });
    }, 1200);
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        {/* Header */}
        <div className="contact-header">
          <span className="section-tag">05 // GET IN TOUCH</span>
          <h2 className="section-title">LET'S DISCUSS YOUR NEXT BREAKTHROUGH.</h2>
          <p className="section-subtitle">
            Have a project in mind, an architectural challenge, or looking to add senior engineering talent to your squad? Let's connect.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info Cards */}
          <div className="contact-info-col">
            <div className="contact-card glass-panel">
              <div className="contact-card-icon">
                <Mail size={22} color="#06B6D4" />
              </div>
              <div className="contact-card-content">
                <span className="contact-label">EMAIL ADDRESS</span>
                <div className="contact-value-row">
                  <a href={`mailto:${email}`} className="contact-val-link">{email}</a>
                  <button 
                    className="copy-btn" 
                    onClick={() => handleCopy(email, 'email')}
                    title="Copy email"
                  >
                    {copiedEmail ? <Check size={14} color="#06B6D4" /> : <Copy size={14} />}
                  </button>
                </div>
                <span className="contact-note">Typically replies within 4-8 hours</span>
              </div>
            </div>

            <div className="contact-card glass-panel">
              <div className="contact-card-icon">
                <Phone size={22} color="#06B6D4" />
              </div>
              <div className="contact-card-content">
                <span className="contact-label">DIRECT PHONE / WHATSAPP</span>
                <div className="contact-value-row">
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="contact-val-link">{phone}</a>
                  <button 
                    className="copy-btn" 
                    onClick={() => handleCopy(phone, 'phone')}
                    title="Copy phone"
                  >
                    {copiedPhone ? <Check size={14} color="#06B6D4" /> : <Copy size={14} />}
                  </button>
                </div>
                <span className="contact-note">Available Mon - Fri, 9am - 7pm IST</span>
              </div>
            </div>

            <div className="contact-card glass-panel">
              <div className="contact-card-icon">
                <MapPin size={22} color="#06B6D4" />
              </div>
              <div className="contact-card-content">
                <span className="contact-label">LOCATION</span>
                <span className="contact-val-text">Trivandrum, Kerala, India</span>
                <span className="contact-note">Open to remote worldwide & enterprise AI consulting</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-col">
            <div className="form-card glass-panel">
              {submitted ? (
                <div className="form-success-state">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={54} color="#06B6D4" />
                  </div>
                  <h3>Message Dispatched!</h3>
                  <p>
                    Thank you for reaching out. I've received your inquiry and will review your project requirements promptly.
                  </p>
                  <button 
                    className="btn-primary" 
                    onClick={() => setSubmitted(false)}
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                  <h3 className="form-heading">Send a Direct Message</h3>
                  
                  {errorMsg && (
                    <div className="form-error-banner">
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Your Name *</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Jenkins" 
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sarah@company.com" 
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group custom-select-group" ref={dropdownRef}>
                    <label htmlFor="projectType">Inquiry Type</label>
                    <div 
                      className={`custom-select-trigger ${dropdownOpen ? 'open' : ''}`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setDropdownOpen(!dropdownOpen);
                        }
                      }}
                      role="combobox"
                      aria-expanded={dropdownOpen}
                      aria-haspopup="listbox"
                    >
                      <span className="custom-select-value">
                        {inquiryOptions.find(o => o.value === formData.projectType)?.label || "Select Inquiry Type"}
                      </span>
                      <ChevronDown size={18} className={`custom-select-chevron ${dropdownOpen ? 'rotate' : ''}`} />
                    </div>

                    {dropdownOpen && (
                      <div className="custom-select-menu glass-panel" role="listbox">
                        {inquiryOptions.map((opt) => (
                          <div 
                            key={opt.value}
                            className={`custom-select-option ${formData.projectType === opt.value ? 'selected' : ''}`}
                            onClick={() => {
                              setFormData(prev => ({ ...prev, projectType: opt.value }));
                              setDropdownOpen(false);
                            }}
                            role="option"
                            aria-selected={formData.projectType === opt.value}
                          >
                            <span>{opt.label}</span>
                            {formData.projectType === opt.value && (
                              <Check size={16} className="custom-select-check" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Project Overview / Message *</label>
                    <textarea 
                      id="message"
                      name="message" 
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me a bit about your goals, timelines, and technical requirements..." 
                      required
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className={`btn-primary form-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        SENDING MESSAGE...
                      </>
                    ) : (
                      <>
                        TRANSMIT INQUIRY
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
