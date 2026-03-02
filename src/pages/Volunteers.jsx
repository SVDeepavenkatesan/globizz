import { useEffect, useState } from "react";
import { volunteersList } from "../data/volunteers";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const loadVolunteers = async () => {
      const loaded = await Promise.all(
        volunteersList.map(async (name, index) => {
          try {
            const imageModule = await import(
              `../assets/images/Volunteers/${name}.jpg`
            );

            return {
              id: index,
              name: name, // show filename as name
              image: imageModule.default,
            };
          } catch (err) {
            console.error("Error loading volunteer image:", err);
            return null;
          }
        })
      );

      setVolunteers(loaded.filter(Boolean));
    };

    loadVolunteers();
  }, []);

  return (
    <section className="text-white py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">

        <h1>
          Meet Our <span className="text-accent">Volunteers</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-10 mt-16">

          {volunteers.map((vol) => (
            <div
              key={vol.id}
              className="relative group rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={vol.image}
                alt={vol.name}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/70 
                              opacity-0 group-hover:opacity-100 
                              transition-opacity duration-500 
                              flex items-center justify-center text-center px-4">

                <h2 className="text-xl font-semibold text-accent">
                  {vol.name}
                </h2>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Volunteers;