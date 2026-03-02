import { Link } from "react-router-dom";
import eventLogo from "../../assets/logos/GLOBIZZ.png";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-2 py-5 text-white text-center">

      <div className="max-w-5xl w-full">

        <div className="flex justify-center ">
          <img
            src={eventLogo}
            alt="GLOBIZZ Logo"
            className="w-32 sm:w-40 md:w-56 mb-5 lg:w-64 drop-shadow-lg"
          />
        </div>

        <h1>
          GLOBIZZ <span className="text-accent">2026</span>
        </h1>

        <p className=" text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Where <span className="text-accent font-semibold">Industry Leaders</span> meet
          <span className="text-accent font-semibold"> Management Minds</span>.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/events"
            className="bg-accent text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Explore Events
          </Link>

          <Link
            to="/sponsors"
            className="border border-accent px-6 py-3 rounded-xl font-semibold hover:bg-accent hover:text-black transition"
          >
            Partner With Us
          </Link>
        </div>
        <div className="mt-20">
          <h1>
            Event Dates: <span className="text-accent"> March 11, 12 & 13, 2026 </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;