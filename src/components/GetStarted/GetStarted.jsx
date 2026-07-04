import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import "./GetStarted.css";

/* ── Icons ─────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

/* Per-feature icons — each maps to a distinct concept rather than a repeated checkmark */
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="8 5 3 12 8 19" /><polyline points="16 5 21 12 16 19" />
  </svg>
);
const SparkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2 2M17.7 17.7l-2-2M17.7 6.3l-2 2M6.3 17.7l2-2" />
  </svg>
);
const LayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 3 21 8 12 13 3 8 12 3" /><polyline points="3 14 12 19 21 14" />
  </svg>
);
const CloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6.5 18.5a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 16.6 8.5 4 4 0 0 1 17.5 18.5h-11z" />
  </svg>
);

/* ── Data ───────────────────────────────────────────────── */
const arcvynFeatures = [
  { label: "Custom Software", Icon: CodeIcon },
  { label: "AI-Powered Products", Icon: SparkIcon },
  { label: "SaaS Platforms", Icon: LayersIcon },
  { label: "Cloud Infrastructure", Icon: CloudIcon },
];

const sharedMetrics = [
  { val: "120+", label: "Projects Shipped" },
  { val: "50+", label: "Active Clients" },
  { val: "95%", label: "Client Satisfaction" },
];

/* ── Animation preset ──────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: [0.22, 0.61, 0.36, 1] },
});

/* ── Count-up numbers — animate once visible ──────────────── */
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

const useCountUp = (raw, active, duration = 1100) => {
  const match = String(raw).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * easeOutExpo(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return match ? `${value}${match[2]}` : raw;
};

const Metric = ({ raw, label, active }) => {
  const display = useCountUp(raw, active);
  return (
    <div className="gs-metric">
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
};

const MetricsBar = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div className="gs-metrics" ref={ref}>
      {sharedMetrics.map((m) => (
        <Metric key={m.label} raw={m.val} label={m.label} active={inView} />
      ))}
    </div>
  );
};

/* ── Component ──────────────────────────────────────────── */
const GetStarted = () => {
  const panelRef = useRef(null);
  const panelInView = useInView(panelRef, { once: true, margin: "-80px" });

  return (
    <section className="gs" id="ecosystem">
      {/* ── Header ── */}
      <div className="gs-header">
        <motion.span className="gs-eyebrow" {...fadeUp(0)}>
          What We Do
        </motion.span>
        <motion.h2 {...fadeUp(0.08)}>
          Software &amp; AI, <em>built to scale</em>
        </motion.h2>
        <motion.p {...fadeUp(0.16)}>
          From idea to deployment — custom software, AI products, and cloud
          solutions for ambitious businesses worldwide.
        </motion.p>
      </div>

      {/* ── Single panel ── */}
      <motion.div className="gs-single" {...fadeUp(0.1)} ref={panelRef}>
        <div className={`gs-panel gs-panel--tech ${panelInView ? "is-live" : ""}`}>
          <span className="gs-panel-label">
            Technology
            <span className="gs-panel-label-dot" aria-hidden="true" />
          </span>
          <h3>ARCVYN</h3>
          <p className="gs-panel-tagline">Software &amp; AI studio</p>
          <p className="gs-panel-desc">
            From idea to deployment — custom software, AI products, and cloud
            solutions for ambitious businesses worldwide.
          </p>
          <ul className="gs-features gs-features--tech">
            {arcvynFeatures.map(({ label, Icon }) => (
              <li key={label}>
                <span className="gs-feature-icon"><Icon /></span>
                <span className="gs-feature-label">{label}</span>
                <CheckIcon />
              </li>
            ))}
          </ul>
          <div className="gs-cta-row">
            <Link to="/services" className="gs-btn gs-btn--tech">
              Explore Services <ArrowIcon />
            </Link>
            <span className="gs-cta-note"></span>
          </div>
        </div>
      </motion.div>

      {/* ── Metrics ── */}
      <MetricsBar />
    </section>
  );
};

export default GetStarted;