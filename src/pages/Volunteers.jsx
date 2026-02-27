import vol1 from "../assets/images/Volunteers/vol1.jpg";
import vol2 from "../assets/images/Volunteers/vol2.jpg";
import vol3 from "../assets/images/Volunteers/vol3.jpg";
import vol4 from "../assets/images/Volunteers/vol4.jpg";
import vol5 from "../assets/images/Volunteers/vol5.jpg";
import vol6 from "../assets/images/Volunteers/vol6.jpg";

const volunteers = [
  {
    id: 1,
    name: "Time management meet",
    image: vol1,
  },
  {
    id: 2,
    name: "Poster Preparation",
    image: vol2,
  },
  {
    id: 3,
    name: "Calling out sponsors",
    image: vol3,
  },
  {
    id: 4,
    name: "Flash mob Preparation",
    image: vol4,
  },
  {
    id: 5,
    name: "Resolution of internal affairs",
    image: vol5,
  },
  {
    id: 6,
    name: "Emergency meeting",
    image: vol6,
  },
];

const Volunteers = () => {
  return (
    <section className="bg-primary text-white py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl text-center mb-16 tracking-wider">
          Meet Our <span className="text-accent">Volunteers</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-10">

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
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent 
                              opacity-0 group-hover:opacity-100 
                              transition-opacity duration-500 
                              flex flex-col items-center justify-center text-center px-4">

                <h2 className="text-xl font-semibold text-accent">
                  {vol.name}
                </h2>
                <p className="mt-2 text-gray-300">
                  {vol.role}
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Volunteers;