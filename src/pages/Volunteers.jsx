import { useEffect, useState } from "react";
import { Maximize } from "lucide-react";

const images = import.meta.glob(
  "../assets/images/Volunteers/*.jpeg",
  { eager: true }
);

const Volunteers = () => {

  const [volunteers, setVolunteers] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {

    const loaded = Object.entries(images).map(([path, module], index) => {

      const name = path
        .split("/")
        .pop()
        .replace(".jpeg", "");

      return {
        id: index,
        name: name,
        image: module.default
      };

    });

    setVolunteers(loaded);

  }, []);

  const closeModal = () => {
    setFullscreenImage(null);
  };

  return (
    <section className="text-white py-20 min-h-screen">

      <div className="max-w-6xl mx-auto px-6">

        <h1>
          Meet Our <span className="text-accent">Volunteers</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">

          {volunteers.map((vol) => (

            <div
              key={vol.id}
              className="relative group rounded-2xl overflow-hidden shadow-xl"
            >

              <img
                src={vol.image}
                alt={vol.name}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <button
                onClick={() => setFullscreenImage(vol.image)}
                className="absolute bottom-4 right-4 bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <Maximize size={18} />
              </button>

            </div>

          ))}

        </div>

      </div>

      {fullscreenImage && (

        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-6">

          <div className="relative w-full max-w-6xl max-h-[90vh]">

            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 bg-accent text-black w-12 h-12 rounded-full text-2xl font-bold"
            >
              ✕
            </button>

            <div className="bg-black rounded-2xl overflow-hidden">

              <img
                src={fullscreenImage}
                alt="Volunteer"
                className="w-full max-h-[80vh] object-contain"
              />

            </div>

          </div>

        </div>

      )}

    </section>
  );
};

export default Volunteers;