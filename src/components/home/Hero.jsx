import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-primary text-white min-h-screen flex items-center relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-black to-primary opacity-95"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        
        <h1 className="text-4xl md:text-6xl font-harry leading-tight tracking-wide">
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
            to="/register" 
            className="bg-accent text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
          >
            Register Now
          </Link>

          <Link
            to="/sponsors"
            className="border border-accent px-8 py-3 rounded-xl font-semibold hover:bg-accent hover:text-black transition duration-300"
          >
            Partner With Us
          </Link>

        </div>

      </div>
    </section>
  );
};

export default Hero;