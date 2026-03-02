import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ibLogo from "../../assets/logos/IB.jpeg";
import puLogo from "../../assets/logos/PU.jpg";

const Navbar = () => {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown Timer
  useEffect(() => {
    const targetDate = new Date(2026, 2, 11, 10, 0, 0).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 Dynamic Navbar Height Sync
  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty(
          "--navbar-height",
          `${navRef.current.offsetHeight}px`
        );
      }
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "font-harry large-text text-accent spaced-text font-semibold"
      : "font-harry large-text text-gray-300 hover:text-accent transition spaced-text";

  return (
    <>
      <nav
        ref={navRef}
        className="text-white shadow-md relative z-50"
      >
        <div className="max-w-7xl mx-auto px-2 md:px-1 py-3 flex items-center justify-between">

          {/* Left Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-accent shadow-lg bg-white">
              <img src={ibLogo} alt="IB Logo" className="h-full w-full object-cover" />
            </div>

            <Link to="/" className="text-4xl md:text-5xl font-harry text-accent">
              GLOBIZZ
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/gallery" className={navLinkClass}>Gallery</NavLink>
            <NavLink to="/events" className={navLinkClass}>Events</NavLink>
            <NavLink to="/speakers" className={navLinkClass}>Speakers</NavLink>
            <NavLink to="/sponsors" className={navLinkClass}>Sponsors</NavLink>
            <NavLink to="/volunteers" className={navLinkClass}>Volunteers</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

            <div className="bg-accent text-black px-4 py-2 rounded-lg text-xs font-semibold">
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-accent shadow-lg bg-white">
              <img src={puLogo} alt="PU Logo" className="h-full w-full object-cover" />
            </div>

            <button
              className="md:hidden text-accent text-3xl"
              onClick={() => setIsOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#0F172A] z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">

          <button
            onClick={() => setIsOpen(false)}
            className="text-right text-accent text-2xl mb-8"
          >
            ✕
          </button>

          <div className="flex flex-col space-y-6 text-lg">
            <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={() => setIsOpen(false)}>About</NavLink>
            <NavLink to="/gallery" className={navLinkClass} onClick={() => setIsOpen(false)}>Gallery</NavLink>
            <NavLink to="/events" className={navLinkClass} onClick={() => setIsOpen(false)}>Events</NavLink>
            <NavLink to="/speakers" className={navLinkClass} onClick={() => setIsOpen(false)}>Speakers</NavLink>
            <NavLink to="/sponsors" className={navLinkClass} onClick={() => setIsOpen(false)}>Sponsors</NavLink>
            <NavLink to="/volunteers" className={navLinkClass} onClick={() => setIsOpen(false)}>Volunteers</NavLink>
            <NavLink to="/contact" className={navLinkClass} onClick={() => setIsOpen(false)}>Contact</NavLink>
          </div>

          <div className="mt-auto bg-accent text-black p-4 rounded-lg text-center font-semibold">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;