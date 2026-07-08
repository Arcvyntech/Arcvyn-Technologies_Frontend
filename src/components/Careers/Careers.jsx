import { useState } from "react";
import "./Careers.css";

const CAREERS_API_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL)
    ? `${import.meta.env.VITE_API_URL}/careers`
    : "http://localhost:5000/api/contact/careers";

/* ── Icons ─────────────────────────────────────────────── */
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M4 4h16v16H4z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const CapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 10-10-5L2 10l10 5 10-5Z" />
    <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 11 9-8 9 8" />
    <path d="M5 10v10h14V10" />
  </svg>
);

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 16V4" />
    <path d="m6 9 6-6 6 6" />
    <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </svg>
);

/* ── Role data ─────────────────────────────────────────── */
const allRoles = [
  { tag: "Engineering", title: "Software Developer", meta: "Full Stack · Remote · Full-time", type: "position" },
  { tag: "Design", title: "UI/UX Designer", meta: "Design Team · Hybrid · Full-time", type: "position" },
  { tag: "AI", title: "AI Engineer", meta: "ML · Remote · Full-time", type: "position", featured: true },
  { tag: "Engineering", title: "Application Developer", meta: "Full Stack · Remote · Full-time", type: "position" },
  { tag: "Internship", title: "Frontend Intern", meta: "3 months · Remote", type: "internship" },
  { tag: "Internship", title: "Design Intern", meta: "3 months · Hybrid", type: "internship" },
  { tag: "HR", title: "HR Intern", meta: "3 months · Hybrid", type: "internship" },
  { tag: "Internship", title: "Content Writer Intern", meta: "3 months · Remote", type: "internship" },
  { tag: "Marketing", title: "Digital Marketing Intern", meta: "3 months · Hybrid", type: "internship" },
];

const openPositions = allRoles.filter((r) => r.type === "position");
const internships = allRoles.filter((r) => r.type === "internship");
const remoteRoles = allRoles.filter((r) => r.meta.includes("Remote"));

/* ── Role row ──────────────────────────────────────────── */
function RoleRow({ role, index, onApply }) {
  return (
    <a
      href="#apply"
      className={`career-row glass${role.featured ? " career-row-featured" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        onApply(role.title);
      }}
    >
      <span className="career-index">{String(index + 1).padStart(2, "0")}</span>

      <div className="career-main">
        <h3>{role.title}</h3>
        <span className={`career-tag${role.featured ? " career-tag-accent" : ""}`}>
          {role.tag}
        </span>
        {role.featured && <span className="career-badge">Hiring urgently</span>}
      </div>

      <span className="career-meta">{role.meta}</span>

      <span className="career-apply">
        Apply <ArrowIcon />
      </span>
    </a>
  );
}

/* ── Section title with a small leading icon ─────────────── */
function SectionTitle({ icon, children }) {
  return (
    <h3 className="section-title">
      <span className="section-icon" aria-hidden="true">{icon}</span>
      {children}
    </h3>
  );
}

export default function Careers() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const copyEmail = () => {
    navigator.clipboard.writeText("careers@arcvyn.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e) => {
    setFileName(e.target.files?.[0]?.name || "");
  };

  const applyForRole = (title) => {
    setSelectedRole(title);
    document.getElementById("apply")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const formData = new FormData(e.target);

    try {
      const res = await fetch(CAREERS_API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="careers">

      {/* HEADER */}
      <div className="container careers-header">
        <div>
          <span className="eyebrow">Work With Us</span>
          <h2>
            Build Your Future With <span className="gradient-text">ARCVYN</span>
          </h2>
          <p>
            Join a fast-moving, globally distributed team building modern
            AI-powered digital products — wherever you happen to be based.
          </p>
        </div>

        <div className="careers-stats">
          <div className="careers-stat">
            <strong>{allRoles.length}</strong>
            <span>Open roles</span>
          </div>
          <div className="careers-stat careers-stat-accent">
            <strong>{remoteRoles.length}</strong>
            <span>Remote-friendly</span>
          </div>
        </div>
      </div>

      {/* OPEN POSITIONS */}
      <div className="container">
        <SectionTitle icon={<BriefcaseIcon />}>Open Positions</SectionTitle>
        <div className="career-list glass-card">
          {openPositions.map((j, i) => (
            <RoleRow key={j.title} role={j} index={i} onApply={applyForRole} />
          ))}
        </div>
      </div>

      {/* INTERNSHIPS */}
      <div className="container">
        <SectionTitle icon={<CapIcon />}>Internship Opportunities</SectionTitle>
        <div className="career-list glass-card">
          {internships.map((j, i) => (
            <RoleRow key={j.title} role={j} index={i} onApply={applyForRole} />
          ))}
        </div>
      </div>

      {/* REMOTE OPPORTUNITIES */}
      <div className="container">
        <SectionTitle icon={<HomeIcon />}>Remote Opportunities</SectionTitle>
        <p className="section-sub">
          {remoteRoles.length} of our {allRoles.length} open roles can be done
          fully remote, on a schedule that overlaps with your nearest team.
        </p>
        <div className="remote-strip">
          {remoteRoles.map((r) => (
            <a
              href="#apply"
              className="remote-chip"
              key={r.title}
              onClick={(e) => {
                e.preventDefault();
                applyForRole(r.title);
              }}
            >
              <span className="remote-chip-dot" aria-hidden="true" />
              {r.title}
            </a>
          ))}
        </div>
      </div>

      {/* APPLICATION FORM */}
      <div className="container" id="apply">
        <SectionTitle icon={<MailIcon />}>Apply Now</SectionTitle>

        <div className="application-grid glass-card">
          <div className="application-info">
            <h3>
              Don&rsquo;t see the <span className="gradient-text">right role?</span>
            </h3>
            <p>
              Send your details anyway — we keep every application on file
              and reach out the moment something matches.
            </p>

            <button type="button" className="btn btn-outline" onClick={copyEmail}>
              {copied ? <><CheckIcon /> Copied</> : <><MailIcon /> careers@arcvyn.com</>}
            </button>
          </div>

          {submitted ? (
            <div className="form-success" role="status">
              <span className="form-success-icon" aria-hidden="true"><CheckIcon /></span>
              <h4>Application received</h4>
              <p>Thanks for reaching out — our team will get back to you within a few days.</p>
              <button type="button" className="btn btn-outline" onClick={() => setSubmitted(false)}>
                Submit another
              </button>
            </div>
          ) : (
            <form className="app-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full name</label>
                  <input id="name" name="name" type="text" placeholder="Jane Doe" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="jane@email.com" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="role">Role you&rsquo;re applying for</label>
                <select
                  id="role"
                  name="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="" disabled>Select a role</option>
                  {allRoles.map((r) => (
                    <option value={r.title} key={r.title}>{r.title}</option>
                  ))}
                  <option value="general">General application</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="portfolio">Portfolio / LinkedIn (optional)</label>
                <input id="portfolio" name="portfolio" type="url" placeholder="https://" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Tell us about yourself</label>
                <textarea id="message" name="message" rows="4" placeholder="A few lines about you and why you'd be a good fit" />
              </div>

              <div className="form-group">
                <label htmlFor="resume">Resume / CV</label>
                <label className="file-input-label" htmlFor="resume">
                  <UploadIcon />
                  <span>{fileName || "Upload PDF or DOCX"}</span>
                </label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="file-input"
                  onChange={handleFileChange}
                  required
                />
              </div>

              {error && (
                <p style={{ color: "tomato", fontSize: "0.9rem", marginTop: "-8px" }}>
                  {error}
                </p>
              )}

              <button type="submit" className="btn btn-primary form-submit" disabled={submitting}>
                {submitting ? "Submitting..." : <>Submit application <ArrowIcon /></>}
              </button>
            </form>
          )}
        </div>
      </div>

    </section>
  );
}