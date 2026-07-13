import { useState, useRef } from "react";
import axios from "axios";
import "./Contact.css";

/* Point this at your real endpoint — falls back to localhost for local dev.
   If you're on Vite, set VITE_API_URL in your .env instead of hardcoding it. */
const API_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:5000/api/contact";

const MESSAGE_LIMIT = 500;

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 6h18v12H3z" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 13l4 4L19 7" />
  </svg>
);
const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5M12 16h.01" />
  </svg>
);
const SpinnerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="btn-spinner" aria-hidden="true">
    <path d="M12 3a9 9 0 1 0 9 9" />
  </svg>
);

const initialForm = { name: "", email: "", phone: "", location: "", message: "", company: "" };

function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", message: string }
  const statusRef = useRef(null);

  const updateField = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (status) setStatus(null);
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const focusStatus = () => {
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    // Honeypot — real users never fill this in, bots usually do.
    if (formData.company) return;

    if (!formData.name.trim()) {
      setStatus({ type: "error", message: "Enter your name." });
      focusStatus();
      return;
    }

    if (!isValidEmail(formData.email)) {
      setStatus({ type: "error", message: "Enter a valid email address." });
      focusStatus();
      return;
    }

    if (!formData.message.trim()) {
      setStatus({ type: "error", message: "Add a short message so we know how to help." });
      focusStatus();
      return;
    }

    setLoading(true);
    try {
      const { company, ...payload } = formData;
      await axios.post(API_URL, payload);
      setStatus({ type: "success", message: "Message sent. We'll get back to you within one business day." });
      setFormData(initialForm);
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Something went wrong sending your message. Please try again, or email us directly.",
      });
    } finally {
      setLoading(false);
      focusStatus();
    }
  };

  const messageCount = formData.message.length;

  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        {/* Left: context */}
        <div className="contact-info">
          <span className="contact-eyebrow">Get in touch</span>
          <h2>
            Let's build your <em>digital future.</em>
          </h2>
          <p>
            Tell us a bit about your project and we'll get back to you within
            one business day.
          </p>

          <span className="contact-availability">
            <span className="contact-availability-dot" aria-hidden="true" />
            Currently accepting new projects
          </span>

          <ul className="contact-details">
            <li>
              <span className="contact-icon"><MailIcon /></span>
              <div>
                <span className="contact-label">Email</span>
                <span className="contact-value">contact.arcvyntech@gmail.com</span>
              </div>
            </li>
            <li>
              <span className="contact-icon"><PhoneIcon /></span>
              <div>
                <span className="contact-label">Phone</span>
                <span className="contact-value">+91-6396947861</span>
              </div>
            </li>
            <li>
              <span className="contact-icon"><PinIcon /></span>
              <div>
                <span className="contact-label">Location</span>
                <span className="contact-value">Haldwani,Uttrakhand-263139</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Right: form */}
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {/* Honeypot field — hidden from real users via CSS, left open for bots */}
          <div className="form-field form-field--honeypot" aria-hidden="true">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              type="text"
              tabIndex="-1"
              autoComplete="off"
              value={formData.company}
              onChange={updateField("company")}
            />
          </div>

          <div className="form-field">
            <label htmlFor="contact-name">Full name</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={updateField("name")}
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                placeholder="Email-id"
                required
                value={formData.email}
                onChange={updateField("email")}
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-phone">Phone <span className="form-optional">(optional)</span></label>
              <input
                id="contact-phone"
                type="tel"
                placeholder="+91"
                value={formData.phone}
                onChange={updateField("phone")}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="contact-location">Location <span className="form-optional">(optional)</span></label>
            <input
              id="contact-location"
              type="text"
              placeholder="City, country"
              value={formData.location}
              onChange={updateField("location")}
            />
          </div>

          <div className="form-field">
            <div className="form-field-header">
              <label htmlFor="contact-message">Message</label>
              <span className={`form-counter${messageCount > MESSAGE_LIMIT ? " is-over" : ""}`}>
                {messageCount}/{MESSAGE_LIMIT}
              </span>
            </div>
            <textarea
              id="contact-message"
              rows="5"
              placeholder="Tell us about your project..."
              required
              maxLength={MESSAGE_LIMIT}
              value={formData.message}
              onChange={updateField("message")}
            />
          </div>

          {status && (
            <div
              className={`form-status form-status--${status.type}`}
              role="status"
              tabIndex="-1"
              ref={statusRef}
            >
              {status.type === "success" ? <CheckIcon /> : <ErrorIcon />}
              <span>{status.message}</span>
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? <><SpinnerIcon /> Sending...</> : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;