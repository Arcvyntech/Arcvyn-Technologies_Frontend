import "./Hero.css";
import { motion } from "framer-motion";
import { CalendarDays, PhoneCall, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Hero() {

  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      navigate(`/#${id}`);
    }
  };

  const scrollToContact = () => scrollToSection("contact");

  // CHANGE: "Book Demo" no longer opens an external Calendly tab.
  // It now scrolls straight to the on-page contact form (#contact),
  // same destination as the "Contact Us" link below.
  const handleBookDemo = () => scrollToContact();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Growth chart bars for the visual card — height is a percentage (0-100)
  const chartBars = [40, 55, 35, 75, 60, 90, 70];

  return (
    <section className="hero">

      {/* Background */}

      <div className="hero-grid" aria-hidden="true"></div>

      <div className="hero-glow hero-glow-one" aria-hidden="true"></div>

      <div className="hero-glow hero-glow-two" aria-hidden="true"></div>

      <div className="hero-container">

        {/* LEFT */}

        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="show"
        >

          <motion.div
            variants={item}
            className="hero-badge"
          >
            BUILDING TOMORROW
          </motion.div>

          <motion.h1
            className="hero-title"
            variants={item}
          >
            Building digital
            <br />
            solutions that
            <br />
            <span>shape the future</span>

          </motion.h1>

          <motion.p
            className="hero-description"
            variants={item}
          >
            We empower businesses with scalable web applications,
            enterprise software, AI powered solutions and digital
            experiences that help brands innovate, grow and lead in
            today's technology driven world.
          </motion.p>

          {/* CTA — "Get Started" removed. "Book Demo" is now the single
              primary action and takes visitors to the contact form.
              "Contact Us" stays as a low-emphasis link doing the same thing,
              for anyone scanning for that specific phrase (e.g. phone/email intent). */}

          <motion.div
            className="hero-buttons"
            variants={item}
          >

            <button
              className="btn btn-primary"
              onClick={handleBookDemo}
            >
              Book Demo
              <CalendarDays size={18} aria-hidden="true" />
            </button>

            <button
              className="btn-link"
              onClick={scrollToContact}
            >
              Contact Us
              <PhoneCall size={16} aria-hidden="true" />
            </button>

          </motion.div>

          {/* SOCIAL PROOF */}

          <motion.div
            className="hero-social-proof"
            variants={item}
          >
            <div className="avatar-stack" aria-hidden="true">
              <span className="avatar avatar-gold"></span>
              <span className="avatar avatar-teal"></span>
              <span className="avatar avatar-indigo"></span>
            </div>
            <p>
              Trusted by 150+ companies ·{" "}
              <span className="rating">
                <Star size={13} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                4.9 rating
              </span>
            </p>
          </motion.div>

          {/* STATS */}

          <motion.div
            className="hero-stats"
            variants={item}
          >

            <div className="stat-inline">
              <p className="stat-inline-value">250+</p>
              <p>Projects Delivered</p>
            </div>

            <div className="stat-inline">
              <p className="stat-inline-value">98%</p>
              <p>Client Satisfaction</p>
            </div>

            <div className="stat-inline">
              <p className="stat-inline-value">10+</p>
              <p>Countries Served</p>
            </div>

          </motion.div>

        </motion.div>

        {/* RIGHT — product visual instead of abstract rings */}

        <motion.div
          className="hero-visual"
          initial={{
            opacity: 0,
            x: 80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1.2,
            delay: 0.5,
          }}
        >

          <div className="visual-card">

            <div className="visual-card-header">
              <span>Growth overview</span>
              <span className="visual-card-delta">+18.4%</span>
            </div>

            <div className="visual-chart" role="img" aria-label="Growth chart trending upward over the last 7 periods">
              {chartBars.map((height, index) => (
                <motion.div
                  key={index}
                  className={
                    "visual-bar" +
                    (index === 2 || index === 5 ? " visual-bar-teal" : "")
                  }
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.8 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                ></motion.div>
              ))}
            </div>

            <div className="visual-metrics">
              <div className="visual-metric">
                <p className="visual-metric-label">Active users</p>
                <p className="visual-metric-value">24.8k</p>
              </div>
              <div className="visual-metric">
                <p className="visual-metric-label">Uptime</p>
                <p className="visual-metric-value">99.9%</p>
              </div>
            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;