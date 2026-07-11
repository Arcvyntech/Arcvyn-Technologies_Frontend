import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [careersActive, setCareersActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // How far down the page we are, as a 0–100 percentage.
      // docHeight is the total scrollable distance (full page height
      // minus one viewport, since you can't scroll further than that).
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // set correct value immediately on mount (e.g. after a refresh mid-page)
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy: Careers isn't a route, so react-router's NavLink has no
  // way to know it's "active" — the URL stays "/" the whole time. This
  // watches whether #careers is actually in view and drives the
  // underline manually instead.
  useEffect(() => {
    const target = document.getElementById("careers");
    if (!target) return;

    const io = new IntersectionObserver(
      ([entry]) => setCareersActive(entry.isIntersecting),
      { rootMargin: "-45% 0px -45% 0px" } // counts as "active" once it's near center-screen
    );
    io.observe(target);
    return () => io.disconnect();
  }, [location.pathname]);

  // close mobile menu whenever a link is clicked
  const closeMenu = () => setMenuOpen(false);

  // Careers lives on the home page, not its own route — scroll to it,
  // navigating home first if we're on another page
  const scrollToCareers = (e) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname === "/") {
      document.getElementById("careers")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("careers")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  return (
    <nav className={`navbar${scrolled ? " navbar-scrolled" : ""}`}>
      <div className="nav-container">

        <Link to="/" className="logo" onClick={closeMenu}>
          ARC<span>VYN</span>
        </Link>

        <ul className="nav-links">
          <li>
            {/* CHANGE: className is now a function so Home's own active
                state can be suppressed while careersActive is true —
                otherwise both links would show the underline at once,
                since the URL never actually leaves "/". */}
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive && !careersActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services">Services</NavLink>
          </li>
          <li>
            <a
              href="#careers"
              className={careersActive ? "active" : ""}
              onClick={scrollToCareers}
            >
              Careers
            </a>
          </li>
        </ul>

        <button
          className={`nav-toggle${menuOpen ? " open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
        <ul>
          <li>
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) => (isActive && !careersActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
          </li>
          <li>
            <a
              href="#careers"
              className={careersActive ? "active" : ""}
              onClick={scrollToCareers}
            >
              Careers
            </a>
          </li>
        </ul>
      </div>

      {/* Scroll progress bar — sits on the navbar's bottom edge,
          fills left-to-right as the user scrolls down the page. */}
      <div className="nav-progress-track" aria-hidden="true">
        <div
          className="nav-progress-fill"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </nav>
  );
}

export default Navbar;