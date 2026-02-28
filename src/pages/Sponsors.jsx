import sponsorPoster from "../../public/images/Posters/Call for Sponsors.jpeg";

const Sponsors = () => {
  return (
    <section className="bg-black text-white py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h1 className="text-4xl font-harry mb-12 tracking-wider">
          Call for <span className="text-accent">Sponsors</span>
        </h1>

        <div className="flex justify-center">
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl max-w-xl">

            {/* Poster Image */}
            <img
              src={sponsorPoster}
              alt="Call for Sponsors"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/80 
                            opacity-0 group-hover:opacity-100 
                            transition-opacity duration-500 
                            flex items-center justify-center px-6">

              <div className="text-center select-text">
                <h2 className="text-2xl font-semibold text-accent mb-4">
                  Contact for Sponsorship
                </h2>

                <p className="text-lg">
                  <strong>Pravin:</strong> +91 9080423299
                </p>

                <p className="text-lg mt-2">
                  <strong>Somesh:</strong> +91 9361479653
                </p>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Sponsors;