import React, { useState, useEffect, useRef } from 'react';
import './ServicesPage.css';

const API_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:5000/api/contact";

const services = [
  {
    index: '01',
    kicker: 'Build',
    title: 'Custom Software Development',
    accent: '#6E8CFF',
    description:
      'Software built around how your business actually runs — scalable, secure, and fast from the first release.',
    features: [
      'Requirements & systems architecture',
      'Scalable backend engineering',
      'Ongoing maintenance & support',
    ],
    icon: (
      <svg viewBox="0 0 24 24"><polyline points="9 18 3 12 9 6" /><polyline points="15 6 21 12 15 18" /></svg>
    ),
  },
  {
    index: '02',
    kicker: 'Craft',
    title: 'Web Development',
    accent: '#4FD1C5',
    description:
      'Fast, resilient, pixel-precise web products — engineered for performance from the first paint.',
    features: [
      'Performance-first front-end builds',
      'CMS & headless integrations',
      'Cross-browser, accessibility tested',
    ],
    icon: (
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
    ),
  },
  {
    index: '03',
    kicker: 'Ship',
    title: 'Mobile App Development',
    accent: '#E8925C',
    description:
      'Native-grade iOS and Android experiences with fluid interactions and a release pipeline built for continuous shipping.',
    features: [
      'Native iOS & Android builds',
      'Offline-first sync architecture',
      'App Store & Play Store releases',
    ],
    icon: (
      <svg viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2" /><line x1="11" y1="18" x2="13" y2="18" /></svg>
    ),
  },
  {
    index: '04',
    kicker: 'Automate',
    title: 'AI Solutions',
    accent: '#A78BFA',
    badge: 'AI-Powered',
    description:
      'Production-ready AI features — from copilots to automation pipelines — designed to integrate cleanly with your existing stack and data.',
    features: [
      'LLM copilots & chat interfaces',
      'Workflow & document automation',
      'Fine-tuning & RAG pipelines',
    ],
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /><circle cx="12" cy="12" r="3.4" /></svg>
    ),
  },
  {
    index: '05',
    kicker: 'Launch',
    title: 'SaaS Products',
    accent: '#F5B94D',
    description:
      'From zero to first paying customer — multi-tenant architecture, billing, and onboarding designed to hold up at scale.',
    features: [
      'Multi-tenant architecture',
      'Subscription billing & metering',
      'Onboarding flows built to convert',
    ],
    icon: (
      <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="5" rx="1.5" /><rect x="3" y="10.5" width="18" height="5" rx="1.5" /><rect x="3" y="17" width="18" height="5" rx="1.5" /></svg>
    ),
  },
  {
    index: '06',
    kicker: 'Teach',
    title: 'EdTech Solutions',
    accent: '#6FCF97',
    description:
      'Learning platforms, attendance systems, and academic dashboards built for institutions and the people who run them.',
    features: [
      'LMS & course delivery platforms',
      'Attendance & grading systems',
      'Parent & student dashboards',
    ],
    icon: (
      <svg viewBox="0 0 24 24"><path d="M2 8l10-5 10 5-10 5-10-5z" /><path d="M6 10.5v5c0 1.4 2.7 3 6 3s6-1.6 6-3v-5" /></svg>
    ),
  },
  {
    index: '07',
    kicker: 'Design',
    title: 'UI/UX Design',
    accent: '#F27F9E',
    description:
      'Interfaces designed around real user behaviour — wireframes to polished, tested screens your team can ship with confidence.',
    features: [
      'User research & journey mapping',
      'Wireframes to hi-fi prototypes',
      'Design systems that scale',
    ],
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
    ),
  },
  {
    index: '08',
    kicker: 'Operate',
    title: 'Cloud Solutions',
    accent: '#5EC8E0',
    description:
      'Infrastructure managed end to end, so your systems stay online, secure, and ready for the next order of magnitude.',
    features: [
      'AWS / GCP / Azure architecture',
      'CI/CD pipelines & observability',
      'Cost optimization & 24/7 monitoring',
    ],
    icon: (
      <svg viewBox="0 0 24 24"><path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.5A5 5 0 0 0 6.5 19h11z" /></svg>
    ),
  },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2.5 7.2L5.6 10.3L11.5 3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ServicesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  const openModal = (serviceTitle, triggerEl) => {
    triggerRef.current = triggerEl;
    setSelectedService(serviceTitle);
    setSubmitted(false);
    setErrorMsg('');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    if (triggerRef.current) triggerRef.current.focus();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      const firstField = dialogRef.current?.querySelector('input, textarea, button');
      firstField?.focus();
    });
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      location: formData.get('location'),
      message: formData.get('message'),
    };

       try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong.');
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sp-page">
      <div className="sp-grid-overlay" aria-hidden="true" />

      <header className="sp-header">
        <span className="sp-eyebrow">What we do</span>
        <h1>
          Professional services, <em>built to scale.</em>
        </h1>
        <p>
          ARCVYN partners with growing businesses to design, build, and run the
          software and AI systems behind their next stage of growth.
        </p>
      </header>

      <div className="sp-grid">
        {services.map((service) => (
          <div className="sp-card" data-index={service.index} style={{ '--accent': service.accent }} key={service.index}>
            <span className="sp-corner sp-corner-tl" aria-hidden="true" />
            <span className="sp-corner sp-corner-br" aria-hidden="true" />

            <div className="sp-card-top">
              <span className="sp-card-icon" aria-hidden="true">{service.icon}</span>
              <span className="sp-index">{service.index}</span>
            </div>

            <div className="sp-kicker-row">
              <span className="sp-kicker">{service.kicker}</span>
              {service.badge && <span className="sp-badge">{service.badge}</span>}
            </div>
            <h3>{service.title}</h3>
            <span className="sp-rule" aria-hidden="true" />
            <p>{service.description}</p>

            <ul className="sp-feature-list">
              {service.features.map((feature) => (
                <li key={feature}>
                  <CheckIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="sp-learn-more"
              onClick={(e) => openModal(service.title, e.currentTarget)}
            >
              Talk to us <ArrowIcon />
            </button>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="sp-modal-overlay" onMouseDown={closeModal}>
          <div
            className="sp-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            ref={dialogRef}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button type="button" className="sp-modal-close" onClick={closeModal} aria-label="Close contact form">
              <CloseIcon />
            </button>

            {!submitted ? (
              <>
                <span className="sp-modal-kicker">Get in touch</span>
                <h2 id="contact-modal-title">Tell us about your project</h2>
                <p className="sp-modal-subtext">
                  {selectedService
                    ? `We'll follow up about ${selectedService.toLowerCase()}.`
                    : "We'll get back to you within one business day."}
                </p>

                <form className="sp-contact-form" onSubmit={handleSubmit}>
                  <div className="sp-form-row">
                    <label htmlFor="contact-name">Name</label>
                    <input id="contact-name" name="name" type="text" placeholder="Your full name" required />
                  </div>
                  <div className="sp-form-row">
                    <label htmlFor="contact-email">Email</label>
                    <input id="contact-email" name="email" type="email" placeholder="you@company.com" required />
                  </div>
                  <div className="sp-form-row">
                    <label htmlFor="contact-phone">Phone</label>
                    <input id="contact-phone" name="phone" type="text" placeholder="Number" required />
                  </div>
                  <div className="sp-form-row">
                    <label htmlFor="contact-location">Location</label>
                    <input id="contact-location" name="location" type="text" placeholder="Your City" required />
                  </div>
                  <div className="sp-form-row">
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="4"
                      placeholder="What are you looking to build?"
                      required
                    />
                  </div>
                  {errorMsg && <p className="sp-modal-error">{errorMsg}</p>}
                  <button type="submit" className="sp-modal-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending…' : 'Send message'}
                  </button>
                </form>
              </>
            ) : (
              <div className="sp-modal-success">
                <span className="sp-modal-kicker">Message sent</span>
                <h2 id="contact-modal-title">Thanks — we'll be in touch.</h2>
                <p className="sp-modal-subtext">
                  Someone from ARCVYN will reply within one business day.
                </p>
                <button type="button" className="sp-modal-submit" onClick={closeModal}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;