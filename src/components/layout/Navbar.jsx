import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-accent font-semibold"
      : "text-gray-300 hover:text-accent transition";

  return (
    <nav className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-accent font-harry large-text spaced-text">
          GLOBIZZ
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-harry large-text spaced-text">
          <NavLink to="/" className={navLinkClass}>
            HOME
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            ABOUT
          </NavLink>
          <NavLink to="/gallery" className={navLinkClass}>
            GALLERY
          </NavLink>
          <NavLink to="/events" className={navLinkClass}>
            EVENTS
          </NavLink>
          <NavLink to="/speakers" className={navLinkClass}>
            SPEAKERS
          </NavLink>
          <NavLink to="/sponsors" className={navLinkClass}>
            SPONSORS
          </NavLink>
          <NavLink to="/volunteers" className={navLinkClass}>
            VOLUNTEERS
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            CONTACT
          </NavLink>
        </div>

        {/* Register Button */}
        <div className="hidden md:block">
          <Link
            to="/register"
            className="bg-accent text-black px-5 py-2 rounded-lg font-semibold hover:scale-105 transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-accent text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black px-6 pb-4 space-y-4">
          <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={() => setIsOpen(false)}>
            About
          </NavLink>
          <NavLink to="/gallery" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Events
          </NavLink>
          <NavLink to="/events" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Events
          </NavLink>
          <NavLink to="/speakers" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Speakers
          </NavLink>
          <NavLink to="/sponsors" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Sponsors
          </NavLink>
          <NavLink to="/Volunteers" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Volunteers
          </NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Contact
          </NavLink>
          <Link
            to="/register"
            className="block bg-accent text-black px-5 py-2 rounded-lg font-semibold text-center"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;