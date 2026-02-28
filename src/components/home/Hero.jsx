import { Link } from "react-router-dom";
import eventLogo from "../../assets/logos/GLOBIZZ.png";
import heroBG from "../../assets/images/heroBG.jpg";

const Hero = () => {
  return (
  <section className="relative min-h-screen flex items-center justify-center">      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">

        {/* Event Logo Center */}
        <div className="flex justify-center mb-10">
          <img
            src={eventLogo}
            alt="GLOBIZZ Logo"
            className="w-48 md:w-64 drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-harry leading-tight tracking-wide text-white">
          GLOBIZZ <span className="text-accent">2026</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Where <span className="text-accent font-semibold">Industry Leaders</span> meet 
          <span className="text-accent font-semibold"> Management Minds</span>.
          <br />
          An Institution–Industry Interface Summit redefining business conversations.
        </p>

        <div className="mt-10 flex flex-col md:flex-row justify-center gap-6">
          
          <Link
            to="/events"
            className="bg-accent text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
          >
            Explore Events
          </Link>

          <Link
            to="/sponsors"
            className="text-white border border-accent px-8 py-3 rounded-xl font-semibold hover:bg-accent hover:text-black transition duration-300"
          >
            Partner With Us
          </Link>

        </div>

      </div>
    </section>
  );
};

export default Hero;