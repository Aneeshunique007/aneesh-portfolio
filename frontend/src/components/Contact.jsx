import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  Clock, 
  Sparkles,
  CheckCircle2,
  AlertCircle
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

  const email = "aneeshusunique@gmail.com";
  const phone = "+91 86672 70586";
  const linkedin = "https://www.linkedin.com/in/aneesh-u-s";

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
          <h2 className="section-title">Let's discuss your next breakthrough.</h2>
          <p className="section-subtitle">
            Have a project in mind, an architectural challenge, or looking to add senior engineering talent to your squad? Let's connect.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info Cards */}
          <div className="contact-info-col">
            <div className="contact-card glass-panel">
              <div className="contact-card-icon">
                <Mail size={22} color="#FF4A17" />
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
                    {copiedEmail ? <Check size={14} color="#FF4A17" /> : <Copy size={14} />}
                  </button>
                </div>
                <span className="contact-note">Typically replies within 4-8 hours</span>
              </div>
            </div>

            <div className="contact-card glass-panel">
              <div className="contact-card-icon">
                <Phone size={22} color="#FF4A17" />
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
                    {copiedPhone ? <Check size={14} color="#FF4A17" /> : <Copy size={14} />}
                  </button>
                </div>
                <span className="contact-note">Available Mon - Fri, 9am - 7pm IST</span>
              </div>
            </div>

            <div className="contact-card glass-panel">
              <div className="contact-card-icon">
                <MapPin size={22} color="#FF4A17" />
              </div>
              <div className="contact-card-content">
                <span className="contact-label">LOCATION</span>
                <span className="contact-val-text">Trivandrum, Kerala, India</span>
                <span className="contact-note">Open to remote worldwide & enterprise AI consulting</span>
              </div>
            </div>

            <div className="status-banner-card glass-panel">
              <div className="status-pulse-dot"></div>
              <div>
                <strong className="status-strong">Currently Accepting New Projects</strong>
                <p className="status-desc">Bookings open for Q4 2026. Available for architectural audits and full-cycle development.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-col">
            <div className="form-card glass-panel">
              {submitted ? (
                <div className="form-success-state">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={54} color="#FF4A17" />
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

                  <div className="form-group">
                    <label htmlFor="projectType">Inquiry Type</label>
                    <select 
                      id="projectType"
                      name="projectType" 
                      value={formData.projectType}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="web-app">Full-Stack Web Application</option>
                      <option value="frontend-ui">Frontend Engineering & UI/UX</option>
                      <option value="backend-cloud">Cloud Architecture & API Infrastructure</option>
                      <option value="consulting">System Audit / Technical Consultation</option>
                      <option value="fulltime">Full-time Engineering Role</option>
                    </select>
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
