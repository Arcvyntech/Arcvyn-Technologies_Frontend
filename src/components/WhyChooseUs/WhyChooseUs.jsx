import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import "./WhyChooseUs.css";

/* ── Icon draw-in variants — used only by the signature "Our approach"
   icon, so the one bold move stays in one place instead of scattered
   across every glyph on the panel. ── */
const iconDrawContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const iconDrawPath = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
};

const BlueprintIcon = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={iconDrawContainer}
    >
      <motion.path variants={iconDrawPath} d="M3 21h18" />
      <motion.path variants={iconDrawPath} d="M5 21V8l7-5 7 5v13" />
      <motion.path variants={iconDrawPath} d="M9 21v-7h6v7" />
      <motion.path variants={iconDrawPath} d="M9 11h6" />
    </motion.svg>
  );
};

const ScaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17h4v4H3z" />
    <path d="M10 11h4v10h-4z" />
    <path d="M17 5h4v16h-4z" />
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const SupportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
const BulbIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a6 6 0 0 0-4 10.5c.6.55 1 1.3 1 2.1V16h6v-1.4c0-.8.4-1.55 1-2.1A6 6 0 0 0 12 2z" />
  </svg>
);
const ChipIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
  </svg>
);
const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const TrendUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 6 13.5 15.5l-5-5L1 18" />
    <path d="M17 6h6v6" />
  </svg>
);
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const ActivityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

/* Each point carries a short "why it matters" line, revealed on
   demand — the row does more work without asking for more room. */
const supportingPoints = [
  {
    accent: "gold",
    icon: <BulbIcon />,
    title: "Innovative Solutions",
    desc: "We approach every problem fresh, pairing creative thinking with engineering rigor instead of reaching for the nearest template.",
    detail: "Ideas get pressure-tested against your actual constraints before a single line of code is written.",
  },
  {
    accent: "teal",
    icon: <BoltIcon />,
    title: "Fast Delivery",
    desc: "We ship early and often, so you're seeing working software in weeks, not waiting months for a single big reveal.",
    detail: "Short, predictable cycles mean you can course-correct early instead of at the finish line.",
  },
  {
    accent: "indigo",
    icon: <ScaleIcon />,
    title: "Scalable Architecture",
    desc: "Architecture decisions are made for the business you're growing into, not just the one you have today.",
    detail: "Fewer rewrites later — the data model and infrastructure are sized for growth from day one.",
  },
  {
    accent: "gold",
    icon: <ShieldIcon />,
    title: "Secure Systems",
    desc: "Protections are part of the foundation, reviewed at every stage — never a patch added after launch.",
    detail: "Threat modeling happens during design, not the week before launch.",
  },
  {
    accent: "teal",
    icon: <SupportIcon />,
    title: "Dedicated Support",
    desc: "The people who built it are the ones who answer when you call after launch.",
    detail: "No hand-off to a separate support desk — the engineers who wrote it fix it.",
  },
  {
    accent: "indigo",
    icon: <ChipIcon />,
    title: "Latest Technologies",
    desc: "We adopt new tools when they earn their place on real requirements, not because they're new.",
    detail: "Every new tool has to win against a real requirement before it ships.",
  },
];

const processSteps = ["Discovery", "Design", "Build", "Ship"];

const metrics = [
  { value: "95%", label: "Client Retention", sub: "clients return for their next project", accent: "gold", icon: <UsersIcon /> },
  { value: "99.9%", label: "System Uptime", sub: "across all production deployments", accent: "teal", icon: <ActivityIcon /> },
  { value: "50%", label: "Faster Delivery", sub: "compared to industry average", accent: "indigo", icon: <BoltIcon /> },
];

/* ── Animation presets ─────────────────────────────────────── */
const fadeUp = (delay = 0, reduce = false) => {
  if (reduce) return {};
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, delay, ease: [0.22, 0.61, 0.36, 1] },
  };
};

/* Ruler mark under the header — draws left-to-right once, in place
   of the removed "Fig. 01" label. */
const drawRule = (delay = 0, reduce = false) => {
  if (reduce) return {};
  return {
    initial: { scaleX: 0, opacity: 0 },
    whileInView: { scaleX: 1, opacity: 1 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] },
  };
};

/* ── Count-up numbers — animate once the metric scrolls into view ── */
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

const useCountUp = (raw, active, duration = 1200, reduce = false) => {
  const match = String(raw).match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const [value, setValue] = useState(reduce ? target : 0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    if (reduce) {
      setValue(target);
      return;
    }

    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(target * easeOutExpo(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [active, target, duration, reduce]);

  return match ? `${value.toFixed(decimals)}${match[2]}` : raw;
};

/* ── Cursor spotlight — writes pointer position into CSS custom
   properties so the glow can be pure CSS (no per-frame re-render).
   Disabled entirely on touch/coarse pointers and reduced-motion. ── */
const useSpotlight = (reduce) => {
  const enabled = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(hover: hover) and (pointer: fine)").matches
  ).current && !reduce;

  const onMove = useCallback(
    (e) => {
      if (!enabled) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    },
    [enabled]
  );

  const onEnter = useCallback(
    (e) => {
      if (!enabled) return;
      e.currentTarget.style.setProperty("--spot-o", "1");
    },
    [enabled]
  );

  const onLeave = useCallback(
    (e) => {
      if (!enabled) return;
      e.currentTarget.style.setProperty("--spot-o", "0");
    },
    [enabled]
  );

  return { onMouseMove: onMove, onMouseEnter: onEnter, onMouseLeave: onLeave };
};

/* dt/dd order in the DOM stays semantically correct (label describes
   value); visual order — value first, big and bold — is handled by
   CSS `order`, so sighted and screen-reader users each get the right
   read on the same markup. */
const Metric = ({ value, label, sub, accent, icon, index, shouldReduceMotion, spotlightProps }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const display = useCountUp(value, inView, 1200, shouldReduceMotion);

  return (
    <motion.div
      className={`wcu-metric${inView ? " is-in-view" : ""}`}
      ref={ref}
      {...fadeUp(index * 0.08, shouldReduceMotion)}
      whileHover={shouldReduceMotion ? {} : { y: -6, transition: { type: "spring", stiffness: 320, damping: 26 } }}
      {...spotlightProps}
    >
      <span className="wcu-spotlight" aria-hidden="true" />
      <span className={`wcu-metric-icon accent-${accent}`} aria-hidden="true">{icon}</span>
      <dt className="wcu-metric-label">{label}</dt>
      <dd className="wcu-metric-value">
        {display}
        <span className="wcu-metric-trend" aria-hidden="true">
          <TrendUpIcon />
        </span>
      </dd>
      <dd className="wcu-metric-sub">{sub}</dd>
    </motion.div>
  );
};

function WhyChooseUs() {
  const shouldReduceMotion = useReducedMotion();
  const [openRows, setOpenRows] = useState(() => new Set());
  const spotlightProps = useSpotlight(shouldReduceMotion);

  const toggleRow = (i) => {
    setOpenRows((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className="wcu" id="why-us" aria-labelledby="wcu-heading">
      <div className="wcu-noise" aria-hidden="true" />

      {/* Header */}
      <div className="wcu-header">
        <div className="wcu-header-main">
          <motion.span className="wcu-eyebrow" {...fadeUp(0, shouldReduceMotion)}>
            <span className="wcu-eyebrow-dot" aria-hidden="true" />
            Why ARCVYN
          </motion.span>
          <motion.h2 id="wcu-heading" {...fadeUp(0.08, shouldReduceMotion)}>
            Built on trust, <em>proven by results.</em>
          </motion.h2>
          <motion.span
            className="wcu-header-rule"
            aria-hidden="true"
            {...drawRule(0.3, shouldReduceMotion)}
          />
        </div>
        <motion.div className="wcu-header-aside" {...fadeUp(0.14, shouldReduceMotion)}>
          <p>
            We combine strategy, craft, and engineering discipline into a
            single practice — so nothing is lost in the handoff between them.
          </p>
        </motion.div>
      </div>

      {/* Featured approach + supporting list */}
      <div className="wcu-body">
        <motion.div
          className="wcu-feature"
          {...fadeUp(0.1, shouldReduceMotion)}
          whileHover={shouldReduceMotion ? {} : { y: -3, transition: { type: "spring", stiffness: 280, damping: 26 } }}
          {...spotlightProps}
        >
          <span className="wcu-spotlight" aria-hidden="true" />
          <span className="wcu-feature-corner wcu-feature-corner--tr" aria-hidden="true" />
          <span className="wcu-feature-corner wcu-feature-corner--bl" aria-hidden="true" />

          <div className="wcu-feature-icon-wrap">
            <span className="wcu-feature-icon-glow" aria-hidden="true" />
            <div className="wcu-feature-icon" aria-hidden="true"><BlueprintIcon /></div>
            <span className="wcu-feature-trace" aria-hidden="true" />
          </div>

          <h3>One team, start to finish</h3>
          <p>
            Strategy, design, and engineering sit in the same room from day
            one — so the plan that gets approved is the plan that ships, not
            a rough sketch lost in translation.
          </p>

          <ol className="wcu-process" aria-label="Our process, start to finish">
            {processSteps.map((step, i) => (
              <li className="wcu-process-step" key={step}>
                <span className="wcu-process-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="wcu-process-label">{step}</span>
              </li>
            ))}
          </ol>

          <div className="wcu-feature-stats">
            <div className="wcu-feature-stat">
              <strong>6 wks</strong>
              <span>Avg. to first release</span>
            </div>
            <div className="wcu-feature-stat">
              <strong>12 yrs</strong>
              <span>Practicing this way</span>
            </div>
          </div>
        </motion.div>

        <ul className="wcu-list">
          {supportingPoints.map((p, i) => {
            const isOpen = openRows.has(i);
            return (
              <motion.li
                className={`wcu-row${isOpen ? " is-open" : ""}`}
                key={p.title}
                {...fadeUp(0.15 + i * 0.06, shouldReduceMotion)}
              >
                <button
                  type="button"
                  className="wcu-row-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`wcu-detail-${i}`}
                  onClick={() => toggleRow(i)}
                  {...spotlightProps}
                >
                  <span className="wcu-spotlight" aria-hidden="true" />
                  <span className={`wcu-row-icon accent-${p.accent}`} aria-hidden="true">{p.icon}</span>
                  <span className="wcu-row-text">
                    <span className="wcu-row-title">{p.title}</span>
                    <span className="wcu-row-desc">{p.desc}</span>
                  </span>
                  <span className="wcu-row-chevron" aria-hidden="true"><ChevronIcon /></span>
                </button>
                <div
                  className="wcu-row-detail"
                  id={`wcu-detail-${i}`}
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="wcu-row-detail-inner">
                    <p>{p.detail}</p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Metrics bar */}
      <dl className="wcu-metrics">
        {metrics.map((m, i) => (
          <Metric
            key={m.label}
            value={m.value}
            label={m.label}
            sub={m.sub}
            accent={m.accent}
            icon={m.icon}
            index={i}
            shouldReduceMotion={shouldReduceMotion}
            spotlightProps={spotlightProps}
          />
        ))}
      </dl>

    </section>
  );
}

export default WhyChooseUs;