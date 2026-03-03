import { useState } from "react";
import { eventTree } from "../data/eventsData";
import Brochure from "./Brochure";

const Events = () => {
  const [openSection, setOpenSection] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mobilePage, setMobilePage] = useState(1);

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

      setMobilePage(1);
    } catch (error) {
      console.error("Error loading event:", error);
    }
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setMobilePage(1);
  };

  return (
    <section className="text-white py-20 min-h-screen px-6">
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

        {/* INTERNAL EVENTS */}
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

        {/* NOBLE EVENTS */}
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

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:flex relative bg-[#0F172A] w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl border border-accent/40">

            <button
              onClick={closeModal}
              className="absolute -top-6 -right-6 bg-accent text-black w-12 h-12 rounded-full text-2xl font-bold"
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

            <div className="w-2/3 p-10 overflow-y-auto flex flex-col justify-between">
              <div>
                <h2 className="text-5xl font-harry text-accent mb-6 text-center">
                  {selectedEvent.name}
                </h2>

                {selectedEvent.shortDescription && (
                  <p className="text-gray-300 mb-4">
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

                <p className="text-gray-300 whitespace-pre-line">
                  {selectedEvent.description}
                </p>

                {selectedEvent.rules.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-accent font-harry text-4xl mb-2">
                      Rules
                    </h3>
                    <ul className="list-disc text-gray-300 pl-5">
                      {selectedEvent.rules.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

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
            </div>
          </div>

          {/* ================= MOBILE BOOK ================= */}
          <div className="md:hidden">

            {/* Close Button (fixed to screen) */}
            <button
              onClick={closeModal}
              className="fixed top-6 right-6 bg-accent text-black w-10 h-10 rounded-full text-xl font-bold z-50"
            >
              ✕
            </button>

            {/* Left Arrow (Page 2 only) */}
            {mobilePage === 2 && (
              <button
                onClick={() => setMobilePage(1)}
                className="fixed bottom-8 left-6 text-accent text-3xl font-bold z-50"
              >
                ←
              </button>
            )}

            {/* Right Arrow (Page 1 only) */}
            {mobilePage === 1 && (
              <button
                onClick={() => setMobilePage(2)}
                className="fixed bottom-8 right-6 text-accent text-3xl font-bold z-50"
              >
                →
              </button>
            )}

            {/* Smaller Popup Box */}
            <div className="relative w-[85%] max-w-xs h-[75vh] mx-auto backdrop-blur rounded-2xl shadow-2xl overflow-hidden items-center justify-center">

              {/* PAGE 1 — POSTER */}
              {mobilePage === 1 && (
                <div className="h-full w-full flex items-center justify-center p-4">
                  <img
                    src={selectedEvent.poster}
                    alt={selectedEvent.name}
                    className="max-h-full object-contain"
                  />
                </div>
              )}

              {/* PAGE 2 — DESCRIPTION */}
              {mobilePage === 2 && (
                <div className="h-full w-full overflow-y-auto p-5 text-sm">

                  <h2 className="text-xl font-harry text-accent mb-3 text-center">
                    {selectedEvent.name}
                  </h2>

                  {selectedEvent.shortDescription && (
                    <p className="text-gray-300 mb-3">
                      {selectedEvent.shortDescription}
                    </p>
                  )}

                  <p className="text-accent mb-3">
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

                  <p className="text-gray-300 whitespace-pre-line mb-4">
                    {selectedEvent.description}
                  </p>

                  {selectedEvent.rules.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-accent font-harry text-lg mb-2">
                        Rules
                      </h3>
                      <ul className="list-disc pl-4 text-gray-300">
                        {selectedEvent.rules.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedEvent.hasRegistration && (
                    <div className="text-center">
                      <a
                        href={selectedEvent.registrationLink}
                        className="bg-accent text-black px-4 py-2 rounded-lg text-sm font-semibold"
                      >
                        Register Now
                      </a>
                    </div>
                  )}

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