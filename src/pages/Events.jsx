import { useState } from "react";
import { eventCategories } from "../data/eventsData";

const categoryLabels = {
  management: "Management Events",
  fun: "Fun Events",
  noble: "Noble Events",
};

const Events = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openEvent = async (eventName) => {
    const description = await fetch(
      `/src/assets/eventDescription/${eventName}.txt`
    ).then((res) => res.text());

    setSelectedEvent({
      name: eventName,
      description,
      poster: `/src/assets/images/Posters/${eventName}.jpeg`,
    });
  };

  return (
    <section className="bg-primary text-white py-20 min-h-screen relative">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h1 className="text-4xl font-harry mb-16 tracking-wider">
          Our <span className="text-accent">Events</span>
        </h1>

        {/* CATEGORY ROW */}
        <div className="flex justify-center gap-10 mb-16">

          {Object.keys(eventCategories).map((key) => (
            <div key={key} className="relative">
              <button
                onClick={() =>
                  setActiveCategory(activeCategory === key ? null : key)
                }
                className="bg-accent text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                {categoryLabels[key]}
              </button>

              {/* Dropdown */}
              {activeCategory === key && (
                <div className="absolute mt-2 bg-black rounded-xl shadow-xl w-56 text-left z-40">
                  {eventCategories[key].map((event) => (
                    <div
                      key={event}
                      onClick={() => openEvent(event)}
                      className="px-4 py-3 hover:bg-accent hover:text-black cursor-pointer transition"
                    >
                      {event}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">

          <div className="relative bg-[#0F172A] text-white w-4/5 max-w-5xl rounded-2xl shadow-2xl flex border border-accent/40 animate-fadeIn">

            {/* CLOSE BUTTON OUTSIDE */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute -top-6 -right-6 bg-accent text-black w-12 h-12 rounded-full text-2xl font-bold shadow-xl hover:rotate-90 transition duration-300"            >
              ✕
            </button>

            {/* LEFT 1/3 POSTER */}
            <div className="w-1/3 bg-black flex items-center justify-center p-4 border-r border-accent/20">
              <img
                src={selectedEvent.poster}
                alt={selectedEvent.name}
                className="h-full object-contain"
              />
            </div>

            {/* RIGHT 2/3 DESCRIPTION + REGISTER */}
            <div className="w-2/3 p-8 flex flex-col justify-between">

              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {selectedEvent.name}
                </h2>

                <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Registration Section */}
              <div className="mt-6">
                <a
                  href="/register"
                  className="bg-accent text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
                >
                  Register Now
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default Events;