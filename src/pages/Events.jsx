import { useState } from "react";
import { eventTree } from "../data/eventsData";

const Events = () => {
  const [openSection, setOpenSection] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const toggleSection = (key) => {
    setOpenSection(openSection === key ? null : key);
  };

  const openEvent = async (eventName) => {
    try {
      const descriptionModule = await import(
        `../assets/eventDescription/${eventName}.txt?raw`
      );

      const posterModule = await import(
        `../assets/images/Posters/${eventName}.jpeg`
      );

      setSelectedEvent({
        name: eventName,
        description: descriptionModule.default,
        poster: posterModule.default,
      });
    } catch (error) {
      console.error("Error loading event:", error);
    }
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <section className="bg-primary text-white py-20 min-h-screen px-6">
      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-harry mb-16">
          Our <span className="text-accent">Events</span>
        </h1>

        {/* Mystiquity */}
        <div className="bg-[#0B1120] border border-accent/30 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl">

          <h2 className="text-2xl sm:text-3xl font-harry text-accent mb-8">
            Mystiquity Events
          </h2>

          <div className="mb-6 flex flex-col items-center">
            <button
              onClick={() => toggleSection("management")}
              className="w-full sm:w-3/4 bg-black border border-accent px-6 py-3 rounded-xl hover:bg-accent hover:text-black transition"
            >
              Management Events
            </button>

            {openSection === "management" && (
              <div className="mt-6 space-y-4 w-full sm:w-3/4">
                {eventTree.mystiquity.management.map((event) => (
                  <div
                    key={event}
                    onClick={() => openEvent(event)}
                    className="bg-black px-4 py-3 rounded-lg border border-accent/20 hover:border-accent transition cursor-pointer"
                  >
                    {event}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={() => toggleSection("fun")}
              className="w-full sm:w-3/4 bg-black border border-accent px-6 py-3 rounded-xl hover:bg-accent hover:text-black transition"
            >
              Fun Events
            </button>

            {openSection === "fun" && (
              <div className="mt-6 space-y-4 w-full sm:w-3/4">
                {eventTree.mystiquity.fun.map((event) => (
                  <div
                    key={event}
                    onClick={() => openEvent(event)}
                    className="bg-black px-4 py-3 rounded-lg border border-accent/20 hover:border-accent transition cursor-pointer"
                  >
                    {event}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Noble */}
        <div className="bg-[#0B1120] border border-accent/30 rounded-2xl p-6 sm:p-8 shadow-xl">

          <h2 className="text-2xl sm:text-3xl font-harry text-accent mb-8">
            Noble Events
          </h2>

          <div className="flex flex-col items-center">
            <button
              onClick={() => toggleSection("noble")}
              className="w-full sm:w-3/4 bg-black border border-accent px-6 py-3 rounded-xl hover:bg-accent hover:text-black transition"
            >
              Noble Events List
            </button>

            {openSection === "noble" && (
              <div className="mt-6 space-y-4 w-full sm:w-3/4">
                {eventTree.noble.map((event) => (
                  <div
                    key={event}
                    onClick={() => openEvent(event)}
                    className="bg-black px-4 py-3 rounded-lg border border-accent/20 hover:border-accent transition cursor-pointer"
                  >
                    {event}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">

          <div className="relative bg-[#0F172A] text-white w-4/5 max-w-5xl rounded-2xl shadow-2xl flex border border-accent/40 animate-fadeIn">

            <button
              onClick={closeModal}
              className="absolute -top-6 -right-6 bg-accent text-black w-12 h-12 rounded-full text-2xl font-bold shadow-xl hover:rotate-90 transition duration-300"
            >
              ✕
            </button>

            <div className="w-3/4 bg-black flex items-center justify-center p-6 border-r border-accent/20">
              <img
                src={selectedEvent.poster}
                alt={selectedEvent.name}
                className="max-h-[80vh] object-contain"
              />
            </div>

            <div className="w-2/3 p-10 flex flex-col justify-between ">

              <div>
                <h2 className="text-6xl font-harry text-accent mb-6 text-center">
                  {selectedEvent.name}
                </h2>

                <p className="text-gray-300 whitespace-pre-line leading-relaxed text-justify">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="mt-10 text-center">
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