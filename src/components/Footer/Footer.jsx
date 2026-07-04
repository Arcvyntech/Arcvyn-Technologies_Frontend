import "./Footer.css";

function Footer() {
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

          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#careers">Careers</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-links">
          <h3>Solutions</h3>

          <a href="#">Software Development</a>
          <a href="#">AI Solutions</a>
          <a href="#">Cloud Services</a>
          <a href="#">ACADEMIAX</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 ARCVYN. All Rights Reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;