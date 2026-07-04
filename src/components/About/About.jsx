import { useEffect, useRef, useState } from "react";
import "./about.css";

const PILLARS = [
  {
    accent: "teal",
    title: "Global Presence",
    desc: "Teams and delivery centers across time zones, so momentum never sleeps.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z" />
      </svg>
    ),
  },
  {
    accent: "indigo",
    title: "Industry Expertise",
    desc: "Deep domain knowledge across the sectors we build for.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 3 8l9 5 9-5-9-5Z" />
        <path d="M3 16l9 5 9-5" />
        <path d="M3 12l9 5 9-5" />
      </svg>
    ),
  },
  {
    accent: "gold",
    title: "Innovation Driven",
    desc: "We ship what's next, not just what's safe.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.4 1 2.5h6c0-1.1.4-1.9 1-2.5A6 6 0 0 0 12 3Z" />
      </svg>
    ),
  },
  {
    accent: "teal",
    title: "Client Centric",
    desc: "Every roadmap starts with your outcomes, not ours.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M2.5 20c0-3.3 2.9-6 6.5-6s6.5 2.7 6.5 6" />
        <path d="M16.5 4.8a3.2 3.2 0 0 1 0 6.2" />
        <path d="M21.5 20c0-2.8-2-5.1-4.8-5.8" />
      </svg>
    ),
  },
  {
    accent: "indigo",
    title: "Future Ready Solutions",
    desc: "Architecture built to absorb tomorrow's requirements today.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h4l3-8 4 16 3-8h4" />
      </svg>
    ),
  },
  {
    accent: "gold",
    title: "Scalable Technology",
    desc: "Systems designed to grow at the same speed you do.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="14" width="4" height="6" />
        <rect x="10" y="9" width="4" height="11" />
        <rect x="16" y="4" width="4" height="16" />
      </svg>
    ),
  },
];

export default function About() {
  const revealRefs = useRef([]);
  revealRefs.current = [];

  // FIX: reveal animations are now opt-in. Content is fully visible by
  // default (see about.css); this flag only *arms* the hidden/fade-in
  // state once React has actually mounted and can guarantee the
  // IntersectionObserver will run to bring it back. No-JS visitors,
  // or anyone whose script errors before this runs, still see everything.
  const [revealArmed, setRevealArmed] = useState(false);

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    setRevealArmed(true);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealRefs.current.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <section className={`about-section${revealArmed ? " reveal-armed" : ""}`}>
      <div className="about-container">

        <span className="about-eyebrow reveal-item" ref={addRevealRef}>
          <span className="dot" aria-hidden="true" />
          About ARCVYN
        </span>

        <h2 className="about-headline reveal-item" ref={addRevealRef}>
          Where ambition meets <em>engineering.</em>
        </h2>

        <p className="about-sub reveal-item" ref={addRevealRef}>
          ARCVYN partners with businesses ready to outgrow their tools — building
          the technology that turns transformation into a repeatable advantage.
        </p>

        <div className="thesis-row reveal-item" ref={addRevealRef}>
          <div className="beam-track" aria-hidden="true">
            <div className="beam-glow" />
          </div>

          <div className="thesis-card mission">
            <div className="thesis-label">
              <span className="num">01</span> Mission
            </div>
            <p className="thesis-text">
              Empowering businesses through innovative technology solutions
              that drive growth and digital transformation.
            </p>
          </div>

          <div className="thesis-card vision">
            <div className="thesis-label">
              <span className="num">02</span> Vision
            </div>
            <p className="thesis-text">
              To become a globally recognized technology leader creating
              impactful digital experiences.
            </p>
          </div>
        </div>

        <div className="why-block">
          <div className="why-header reveal-item" ref={addRevealRef}>
            <span className="why-eyebrow">The difference</span>
            <h3 className="why-heading">Six reasons teams choose ARCVYN.</h3>
          </div>

          {/* FIX: was a <div> of <div>s — now a real list, and each title
              is an <h4> under the "Six reasons" <h3> so screen reader users
              get correct heading hierarchy and item count. */}
          <ul className="pillars-grid">
            {PILLARS.map((pillar, i) => (
              <li
                key={pillar.title}
                ref={addRevealRef}
                className={`pillar-card reveal-item accent-${pillar.accent}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="pillar-icon" aria-hidden="true">{pillar.icon}</div>
                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-desc">{pillar.desc}</p>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}