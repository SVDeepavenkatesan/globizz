import { useState } from "react";
import { eventTree } from "../data/eventsData";
import Brochure from "./Brochure";

const Events = () => {
  const [openSection, setOpenSection] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const toggleSection = (key) => {
    setOpenSection(openSection === key ? null : key);
  };

  const getText = (xmlDoc, nameVariants = []) => {
    for (const name of nameVariants) {
      const el = xmlDoc.getElementsByTagName(name)[0];
      if (el && el.textContent !== null) {
        return el.textContent.trim();
      }
    }
    return null;
  };

  const openEvent = async (eventName) => {
    try {
      const xmlModule = await import(
        `../assets/eventDescription/${eventName}.xml?raw`
      );
      const posterModule = await import(
        `../assets/images/Posters/${eventName}.jpeg`
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlModule.default, "text/xml");

      const name =
        getText(xmlDoc, ["name", "Name"]) || eventName || "Unnamed Event";
      const category =
        getText(xmlDoc, ["category", "Category"]) || "Unspecified";
      const hasRegistrationRaw =
        getText(xmlDoc, ["hasRegistration", "HasRegistration"]) || "false";
      const hasRegistration =
        String(hasRegistrationRaw).toLowerCase() === "true";
      const registrationLink =
        getText(xmlDoc, ["registrationLink", "RegistrationLink"]) ||
        "/register";

      const shortDescription =
        getText(xmlDoc, ["shortDescription", "ShortDescription"]) || "";
      const description =
        getText(xmlDoc, ["description", "Description"]) || "";
      const date = getText(xmlDoc, ["date", "Date"]) || "";
      const time = getText(xmlDoc, ["time", "Time"]) || "";
      const venue = getText(xmlDoc, ["Venue", "venue"]) || "";

      const ruleNodes = xmlDoc.getElementsByTagName("rule");
      const rules = [];
      for (let i = 0; i < ruleNodes.length; i++) {
        const txt = ruleNodes[i].textContent;
        if (txt && txt.trim()) rules.push(txt.trim());
      }

      setSelectedEvent({
        name,
        category,
        poster: posterModule.default,
        shortDescription,
        description,
        rules,
        date,
        time,
        venue,
        hasRegistration,
        registrationLink,
      });
    } catch (error) {
      console.error("Error loading event:", error);
    }
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <section className="text-white py-20 min-h-screen px-6">
      <div className="max-w-4xl mx-auto text-center">

        <h1>
          Events <span className="text-accent">Brochure</span>
        </h1>

        <Brochure />

        <h1>
          Our <span className="text-accent">Events</span>
        </h1>

        {/* ================= MYSTIQUITY ================= */}
        <div className="bg-[#0B1120] border border-accent/30 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl">

          <h2 className="text-2xl sm:text-5xl font-harry text-accent mb-8">
            Mystiquity Events
          </h2>

          {/* MANAGEMENT */}
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

          {/* FUN */}
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
        </div>

        {/* ================= NOBLE EVENTS ================= */}
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

      {/* MODAL (UNCHANGED) */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="relative bg-[#0F172A] text-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl flex border border-accent/40 animate-fadeIn">
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

            <div className="w-2/3 p-10 flex flex-col justify-between overflow-y-auto">
              <div>
                <h2 className="text-6xl font-harry text-accent mb-6 text-center">
                  {selectedEvent.name}
                </h2>

                {selectedEvent.shortDescription && (
                  <p className="text-gray-300 whitespace-pre-line leading-relaxed mb-4 text-justify">
                    {selectedEvent.shortDescription}
                  </p>
                )}

                <p className="text-accent mb-4">
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

                <p className="text-gray-300 whitespace-pre-line leading-relaxed text-justify">
                  {selectedEvent.description}
                </p>

                {selectedEvent.rules && selectedEvent.rules.length > 0 && (
                  <div className="mt-4 text-left">
                    <h3 className="text-accent font-harry text-5xl spaced-text mb-2">
                      Rules
                    </h3>
                    <ul className="list-disc text-gray-300 text-justify">
                      {selectedEvent.rules.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-10 text-center">
                {selectedEvent.hasRegistration && (
                  <a
                    href={selectedEvent.registrationLink}
                    className="bg-accent text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
                  >
                    Register Now
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;