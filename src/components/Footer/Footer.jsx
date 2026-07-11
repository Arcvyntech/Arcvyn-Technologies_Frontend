import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // scrolls to a section on the home page ("about", "contact", etc.)
  // if we're not on the home page yet, navigate there first, then scroll
  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  // placeholder until Solutions pages exist — stops it from jumping to top
  const notReady = (e) => e.preventDefault();

  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-brand">
          <h2>ARCVYN</h2>

          <p>
            Building Tomorrow's Digital Future through
            innovative technology, AI solutions and
            digital transformation.
          </p>
        </div>

        <div className="footer-links">
          <h3>Company</h3>

          <a href="#about" onClick={scrollToSection("about")}>About</a>
          <Link to="/services">Services</Link>
          <a href="#careers" onClick={scrollToSection("careers")}>Careers</a>
          <a href="#contact" onClick={scrollToSection("contact")}>Contact</a>
        </div>

        <div className="footer-links">
          <h3>Solutions</h3>

          <a href="#" onClick={notReady}>Software Development</a>
          <a href="#" onClick={notReady}>AI Solutions</a>
          <a href="#" onClick={notReady}>Cloud Services</a>
          <a href="#" onClick={notReady}>ACADEMIAX</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 ARCVYN. All Rights Reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;