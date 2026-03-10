import { useState } from "react";
import { eventTree } from "../data/eventsData";
import Brochure from "./Brochure";
import eventsPoster from "../assets/images/Posters/Overall Poster.jpg"

const Events = () => {

  const [openSection, setOpenSection] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mobilePage, setMobilePage] = useState(1);

  const toggleSection = (key) => {
    setOpenSection(openSection === key ? null : key);
  };

  const getText = (xmlDoc, names = []) => {
    for (const n of names) {
      const el = xmlDoc.getElementsByTagName(n)[0];
      if (el && el.textContent) return el.textContent.trim();
    }
    return "";
  };

  const openEvent = async (eventName) => {

    try {

      const xmlModule = await import(
        `../assets/eventDescription/${eventName}.xml?raw`
      );

      let poster = null;

      try {
        const posterModule = await import(
          `../assets/images/Posters/${eventName}.jpeg`
        );
        poster = posterModule.default;
      } catch {
        poster = null;
      }

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlModule.default, "text/xml");

      const ruleNodes = xmlDoc.getElementsByTagName("rule");
      const rules = [];

      for (let i = 0; i < ruleNodes.length; i++) {
        const txt = ruleNodes[i].textContent;
        if (txt && txt.trim()) rules.push(txt.trim());
      }

      setSelectedEvent({
        name: getText(xmlDoc, ["name", "Name"]) || eventName,
        poster,
        shortDescription: getText(xmlDoc, ["shortDescription","ShortDescription"]),
        description: getText(xmlDoc, ["description","Description"]),
        date: getText(xmlDoc, ["date","Date"]),
        time: getText(xmlDoc, ["time","Time"]),
        venue: getText(xmlDoc, ["venue","Venue","VENUE"]),
        rules,
        hasRegistration:
          getText(xmlDoc, ["hasRegistration","HasRegistration"]).toLowerCase() === "true",
        registrationLink:
          getText(xmlDoc, ["registrationLink","RegistrationLink"]) || "/register",
      });

      setMobilePage(1);

    } catch (error) {
      console.error("Error loading event:", error);
    }

  };

  const closeModal = () => {
    setSelectedEvent(null);
    setMobilePage(1);
  };

  const renderText = () => (
    <>
      <h2 className="text-5xl font-harry text-accent mb-6 text-center">
        {selectedEvent.name}
      </h2>

      {selectedEvent.shortDescription && (
        <p className="text-gray-300 mb-4 text-center">
          {selectedEvent.shortDescription}
        </p>
      )}

      <p className="text-accent mb-4 text-center">
        {selectedEvent.date && (
          <span><strong>Date:</strong> {selectedEvent.date}</span>
        )}
        {selectedEvent.time && (
          <span><br /><strong>Time:</strong> {selectedEvent.time}</span>
        )}
        {selectedEvent.venue && (
          <span><br /><strong>Venue:</strong> {selectedEvent.venue}</span>
        )}
      </p>

      <p className="text-gray-300 whitespace-pre-line text-center">
        {selectedEvent.description}
      </p>

      {selectedEvent.rules.length > 0 && (
        <div className="mt-4 text-center">
          <h3 className="text-accent font-harry text-3xl mb-2">
            Rules
          </h3>

          <ul className="list-disc inline-block text-left text-gray-300">
            {selectedEvent.rules.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {selectedEvent.hasRegistration && (
        <div className="mt-6 text-center">
          <a
            href={selectedEvent.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-black px-6 py-3 rounded-lg font-semibold"
          >
            Register Now
          </a>
        </div>
      )}
    </>
  );

  return (

    <section className="text-white py-20 min-h-screen px-6">
      <div className="h-full flex items-center justify-center p-4">
        <img
          src={eventsPoster}
          className="max-h-full object-contain"
        />
      </div>
      <div className="max-w-4xl mx-auto text-center">

        <Brochure />

        <h1>
          Our <span className="text-accent">Events</span>
        </h1>

        {/* ================= MYSTIQUITY ================= */}

        <div className="bg-[#0B1120] border border-accent/30 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl">

          <h2 className="text-2xl sm:text-5xl font-harry text-accent mb-8">
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
        {/* ================= INTERNAL EVENTS ================= */}

        <div className="bg-[#0B1120] border border-accent/30 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl">

          <h2 className="text-2xl sm:text-5xl font-harry text-accent mb-8">
            Internal Events
          </h2>

          <div className="flex flex-col items-center">

            <button
              onClick={() => toggleSection("internal")}
              className="w-full sm:w-3/4 bg-black border border-accent px-6 py-3 rounded-xl hover:bg-accent hover:text-black transition"
            >
              Internal Events List
            </button>

            {openSection === "internal" && (
              <div className="mt-6 space-y-4 w-full sm:w-3/4">

                {eventTree.Internal.map((event) => (
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

        </div>{/* ================= NOBLE EVENTS ================= */}

        <div className="bg-[#0B1120] border border-accent/30 rounded-2xl p-6 sm:p-8 shadow-xl">

          <h2 className="text-2xl sm:text-6xl font-harry text-accent mb-8">
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

      {/* ================= MODAL ================= */}

      {selectedEvent && (

        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">

          {/* DESKTOP */}

          <div className="hidden md:flex relative bg-[#0F172A] w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl border border-accent/40">

            <button
              onClick={closeModal}
              className="absolute -top-6 -right-6 bg-accent text-black w-12 h-12 rounded-full text-2xl font-bold"
            >
              ✕
            </button>

            {selectedEvent.poster ? (

              <>
                <div className="w-1/2 bg-black flex items-center justify-center p-6 border-r border-accent/20">
                  <img
                    src={selectedEvent.poster}
                    alt={selectedEvent.name}
                    className="max-h-[80vh] object-contain"
                  />
                </div>

                <div className="w-1/2 p-10 overflow-y-auto">
                  {renderText()}
                </div>
              </>

            ) : (

              <div className="w-full p-12 flex flex-col justify-center items-center overflow-y-auto">
                {renderText()}
              </div>

            )}

          </div>

          {/* MOBILE */}

          <div className="md:hidden">

            <button
              onClick={closeModal}
              className="fixed top-6 right-6 bg-accent text-black w-10 h-10 rounded-full text-xl font-bold z-50"
            >
              ✕
            </button>

            {selectedEvent.poster && mobilePage === 2 && (
              <button
                onClick={() => setMobilePage(1)}
                className="fixed bottom-8 left-6 text-accent text-3xl z-50"
              >
                ←
              </button>
            )}

            {selectedEvent.poster && mobilePage === 1 && (
              <button
                onClick={() => setMobilePage(2)}
                className="fixed bottom-8 right-6 text-accent text-3xl z-50"
              >
                →
              </button>
            )}

            <div className="relative w-[85%] max-w-xs h-[75vh] mx-auto backdrop-blur rounded-2xl shadow-2xl overflow-hidden">

              {selectedEvent.poster ? (

                mobilePage === 1 ? (

                  <div className="h-full flex items-center justify-center p-4">
                    <img
                      src={selectedEvent.poster}
                      alt={selectedEvent.name}
                      className="max-h-full object-contain"
                    />
                  </div>

                ) : (

                  <div className="h-full overflow-y-auto p-5 text-sm">
                    {renderText()}
                  </div>

                )

              ) : (

                <div className="h-full overflow-y-auto p-5 text-sm flex flex-col justify-center">
                  {renderText()}
                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </section>
  );

};

export default Events;