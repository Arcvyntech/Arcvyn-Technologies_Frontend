import "./Industries.css";

/* ── Icons ─────────────────────────────────────────────── */
const CapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 10-10-5L2 10l10 5 10-5Z" />
    <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
  </svg>
);

const HeartPulseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 12 5.5 5.5 5.5 0 0 0 2 8.5c0 4 3.5 6 10 12 3.5-3.5 4.9-4.9 5.9-5.9" />
    <path d="M3.5 9h4l1.5-3 2 6 1.5-3H16" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 19 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const WorkflowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <path d="M9.5 10v4a2 2 0 0 0 2 2h2" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const INDUSTRIES = [
  {
    icon: <CapIcon />,
    title: "Education (ERP)",
    desc: "End-to-end ERP systems for institutions admissions, attendance, fees, and academics in one platform.",
  },
  {
    icon: <HeartPulseIcon />,
    title: "Healthcare",
    desc: "Secure, compliant platforms for patient records, scheduling, and clinical workflows.",
    accent: true,
  },
  {
    icon: <CartIcon />,
    title: "E-Commerce",
    desc: "Scalable storefronts and backend systems built to handle traffic spikes and growing catalogs.",
  },
  {
    icon: <RocketIcon />,
    title: "Startups",
    desc: "MVPs and lean product builds that help early stage teams ship fast and validate quickly.",
    accent: true,
  },
  {
    icon: <WorkflowIcon />,
    title: "Business Automation",
    desc: "Custom tools and integrations that remove manual work from day to day operations.",
  },
  {
    icon: <CodeIcon />,
    title: "Custom Software",
    desc: "Bespoke systems engineered around how your team actually works, built to last.",
    accent: true,
  },
];

export default function Industries() {
  return (
    <section id="industries" className="industries">
      <div className="industries-container industries-header">
        <div>
          
          <h2>
            Industries We <span className="gradient-text">Serve</span>
          </h2>
          <p>
            From institutions to fast moving startups we build software
            tailored to how each industry actually operates.
          </p>
        </div>
      </div>

      <div className="industries-container">
        <div className="industries-grid">
          {INDUSTRIES.map((item, i) => (
            <div
              className={`industry-card glass-card${item.accent ? " industry-card-accent" : ""}`}
              key={item.title}
            >
              <span className="industry-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="industry-icon" aria-hidden="true">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}