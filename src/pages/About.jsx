const About = () => {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white"
    >
      {/* Dark Overlay */}
      <div className="inset-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">

        {/* Heading */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-harry font-bold large-text spaced-text text-accent tracking-wider">
            About GLOBIZZ
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Intro Section */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">

          <div>
            <h2 className="text-2xl sm:text-3xl font-harry font-bold large-text spaced-text text-accent mb-6">
              Where Academia Meets Industry
            </h2>

            <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
              GLOBIZZ 2026 is an Institution–Industry Interface Summit designed
              to bridge the gap between academic excellence and real-world
              corporate dynamics. It brings together management students,
              industry professionals, entrepreneurs, and thought leaders under
              one transformative platform.
            </p>

            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              More than just an event, GLOBIZZ is a strategic ecosystem where
              ideas ignite, collaborations emerge, and leadership potential is
              refined.
            </p>
          </div>

          {/* Highlight Box */}
          <div className="bg-[#0B1120]/90 backdrop-blur-sm border border-accent/30 p-8 sm:p-10 rounded-2xl shadow-xl">
            <h3 className="text-xl sm:text-2xl font-harry font-bold large-text spaced-text text-accent mb-4">
              What Makes It Unique?
            </h3>
            <ul className="space-y-4 text-gray-300 text-sm sm:text-base">
              <li>• Real-time industry interaction</li>
              <li>• Strategic management simulations</li>
              <li>• Creative brand challenges</li>
              <li>• Social impact initiatives</li>
              <li>• Leadership development platforms</li>
            </ul>
          </div>

        </div>

        {/* Vision / Mission / Impact */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-24">

          <div className="bg-black/80 backdrop-blur-sm border border-accent/20 p-6 sm:p-8 rounded-xl hover:border-accent transition">
            <h3 className="text-xl sm:text-2xl font-harry font-bold large-text spaced-text text-accent mb-4">
              Vision
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              To cultivate globally competent management leaders equipped with
              innovation, integrity, and strategic foresight.
            </p>
          </div>

          <div className="bg-black/80 backdrop-blur-sm border border-accent/20 p-6 sm:p-8 rounded-xl hover:border-accent transition">
            <h3 className="text-xl sm:text-2xl font-harry font-bold large-text spaced-text text-accent mb-4">
              Mission
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              To provide a dynamic platform where knowledge converges with
              practical exposure through immersive competitions and dialogues.
            </p>
          </div>

          <div className="bg-black/80 backdrop-blur-sm border border-accent/20 p-6 sm:p-8 rounded-xl hover:border-accent transition">
            <h3 className="text-xl sm:text-2xl font-harry font-bold large-text spaced-text text-accent mb-4">
              Impact
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Empowering students to think critically, act ethically, and lead
              confidently in a rapidly evolving global business environment.
            </p>
          </div>

        </div>

        {/* Quote Section */}
        <div className="text-center border-t border-accent/20 pt-16">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 italic max-w-3xl mx-auto">
            “GLOBIZZ is not just a summit — it is a movement shaping the
            next generation of business leaders.”
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;