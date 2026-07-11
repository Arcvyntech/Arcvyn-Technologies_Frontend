import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Services.css";

/* ============================= */
/* INLINE ICONS */
/* ============================= */
const icons = {
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 6.5 4 12l5.5 5.5" />
      <path d="M14.5 6.5 20 12l-5.5 5.5" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.6 2.4 4 5.2 4 8.5s-1.4 6.1-4 8.5c-2.6-2.4-4-5.2-4-8.5s1.4-6.1 4-8.5Z" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.2h2" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </svg>
  ),
};

export default function Services() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="services-section" ref={sectionRef} id="services">
      <div className="container">
        <div className="services-header fade-up">
          <span className="badge badge-gold services-eyebrow">What we do</span>
          <h2>
            Services built for <span className="gradient-text">every stage</span> of your product
          </h2>
          <p className="services-subtext">
            From the first line of code to the infrastructure that keeps it running —
            a full-stack partner for teams who ship without compromise.
          </p>
        </div>

        {/* Bento grid: one featured tile carries the visual weight,
            three supporting tiles fill the rest — no leftover empty
            cells regardless of viewport, unlike a plain 4-up grid. */}
        <div className="services-bento">

          <article className="service-tile tile-feature fade-up accent-gold">
            <div className="tile-feature-visual" aria-hidden="true">
              <div className="mock-window">
                <span className="mock-dot" />
                <span className="mock-dot" />
                <span className="mock-dot" />
              </div>
              <div className="mock-lines">
                <span className="mock-line" style={{ width: "72%" }} />
                <span className="mock-line" style={{ width: "45%" }} />
                <span className="mock-line mock-line-accent" style={{ width: "58%" }} />
                <span className="mock-line" style={{ width: "30%" }} />
              </div>
            </div>

            <div className="tile-feature-body">
              <div className="service-icon-wrap">
                <div className="service-icon" aria-hidden="true">{icons.code}</div>
              </div>
              <h3 className="service-title">Custom Software Development</h3>
              <p className="service-desc">
                Bespoke systems engineered around how your team actually works —
                built to scale, easy to maintain, and free of the bloat that
                comes with off-the-shelf tools.
              </p>
            </div>
          </article>

          <article className="service-tile fade-up accent-teal">
            <div className="service-icon-wrap">
              <div className="service-icon" aria-hidden="true">{icons.web}</div>
            </div>
            <h3 className="service-title">Web Development</h3>
            <p className="service-desc">
              Fast, resilient, pixel-precise web products — engineered for
              performance from the first paint.
            </p>
          </article>

          <article className="service-tile fade-up accent-indigo">
            <div className="service-icon-wrap">
              <div className="service-icon" aria-hidden="true">{icons.mobile}</div>
            </div>
            <h3 className="service-title">Mobile App Development</h3>
            <p className="service-desc">
              Native-grade iOS and Android experiences with fluid interactions
              and a release pipeline built for continuous shipping.
            </p>
          </article>

          <article className="service-tile tile-wide fade-up accent-gold">
            <div className="service-icon-wrap">
              <div className="service-icon" aria-hidden="true">{icons.ai}</div>
            </div>
            <div className="tile-wide-body">
              <div className="tile-wide-head">
                <h3 className="service-title">AI Solutions</h3>
                <span className="service-tag">AI-Powered</span>
              </div>
              <p className="service-desc">
                Production-ready AI features — from copilots to automation
                pipelines — designed to integrate cleanly with your existing
                stack and data.
              </p>
            </div>
          </article>

        </div>

        <div className="services-footer fade-up">
          <button
            className="btn btn-outline services-view-all"
            type="button"
            onClick={() => navigate("/services")}
          >
            View all
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h13" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
