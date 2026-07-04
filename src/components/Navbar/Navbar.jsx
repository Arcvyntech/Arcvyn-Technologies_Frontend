import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo">
          ARC<span>VYN</span>
        </Link>

        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/services">Services</NavLink>
          </li>
        </ul>

        <Link to="/contact" className="nav-btn">
          Get Started
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;