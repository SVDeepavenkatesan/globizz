import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import ibLogo from "../../assets/logos/IB.jpeg";
import puLogo from "../../assets/logos/PU.jpg";

const Navbar = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-accent font-semibold font-harry large-text spaced-text"
      : "text-gray-300 hover:text-accent transition font-harry large-text spaced-text";

  return (
    <nav className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-10xl mx-auto px-10 py-8 flex items-center justify-between">

        {/* LEFT SIDE (IB Logo + Title) */}
        <div className="flex items-center gap-4">

          {/* Circular IB Logo */}
          <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-accent shadow-lg bg-white flex items-center justify-center">
            <img
              src={ibLogo}
              alt="IB Logo"
              className="h-full w-full object-cover"
            />
          </div>

          <Link
            to="/"
            className="text-2xl font-harry text-accent font-bold large-text spaced-text"
          >
            GLOBIZZ
          </Link>
        </div>

        {/* CENTER NAV */}
        <div className="hidden md:flex space-x-8 items-center">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/gallery" className={navLinkClass}>Gallery</NavLink>
          <NavLink to="/events" className={navLinkClass}>Events</NavLink>
          <NavLink to="/speakers" className={navLinkClass}>Speakers</NavLink>
          <NavLink to="/sponsors" className={navLinkClass}>Sponsors</NavLink>
          <NavLink to="/volunteers" className={navLinkClass}>Volunteers</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

          {/* Countdown Timer */}
          <div className="bg-accent text-black px-4 py-2 rounded-lg font-semibold text-sm tracking-wide text-center">
            Event Begins in <br />
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </div>
        </div>

        {/* RIGHT SIDE (PU Logo) */}
        <div className="hidden md:flex items-center">

          {/* Circular PU Logo */}
          <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-accent shadow-lg bg-white flex items-center justify-center">
            <img
              src={puLogo}
              alt="PU Logo"
              className="h-full w-full object-cover"
            />
          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;