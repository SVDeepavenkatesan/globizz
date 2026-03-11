import { useEffect, useState } from "react";

import day1XML from "../assets/speakerInfo/Day1.xml?raw";
import day2XML from "../assets/speakerInfo/Day2.xml?raw";
import day3XML from "../assets/speakerInfo/Day3.xml?raw";
const Speakers = () => {

  const [days, setDays] = useState({});
  const [activeDay, setActiveDay] = useState("day1");
  const [direction, setDirection] = useState("left");

  useEffect(() => {

    const parseXML = (xmlString) => {

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");

      const events = Array.from(xmlDoc.getElementsByTagName("Event"));

      return events.map((event) => {

        const topic =
          event.getElementsByTagName("Topic")[0]?.textContent || "";

        const date =
          event.getElementsByTagName("date")[0]?.textContent || "";

        const time =
          event.getElementsByTagName("time")[0]?.textContent || "";

        const speakers = Array.from(
          event.getElementsByTagName("speaker")
        ).map((sp) => ({
          name: sp.getElementsByTagName("name")[0]?.textContent || "",
          designation:
            sp.getElementsByTagName("designation")[0]?.textContent || "",
          company:
            sp.getElementsByTagName("company")[0]?.textContent || "",
        }));

        return {
          topic,
          date,
          time,
          speakers,
        };
      });
    };

    setDays({
      day1: parseXML(day1XML),
      day2: parseXML(day2XML),
      day3: parseXML(day3XML),
    });

  }, []);

  const changeDay = (day) => {

    if (day === activeDay) return;

    setDirection(day === "day1" ? "right" : "left");
    setActiveDay(day);
  };

  const events = days[activeDay] || [];

  return (
    <section className="text-white py-20 min-h-screen px-6">

      <div className="max-w-6xl mx-auto text-center">

        <h1>
          Our <span className="text-accent">Speakers</span>
        </h1>

        {/* Toggle Buttons */}

        <div className="flex justify-center gap-6 mt-10">

          <button
            onClick={() => changeDay("day1")}
            className={`px-8 py-3 rounded-lg border transition ${
              activeDay === "day1"
                ? "bg-accent text-black border-accent"
                : "border-accent text-accent hover:bg-accent hover:text-black"
            }`}
          >
            Day 1
          </button>

          <button
            onClick={() => changeDay("day2")}
            className={`px-8 py-3 rounded-lg border transition ${
              activeDay === "day2"
                ? "bg-accent text-black border-accent"
                : "border-accent text-accent hover:bg-accent hover:text-black"
            }`}
          >
            Day 2
          </button>

          <button
            onClick={() => changeDay("day3")}
            className={`px-8 py-3 rounded-lg border transition ${
              activeDay === "day3"
                ? "bg-accent text-black border-accent"
                : "border-accent text-accent hover:bg-accent hover:text-black"
            }`}
          >
            Day 2
          </button>
        </div>

        {/* Animated Container */}

        <div
          key={activeDay}
          className={`mt-16 transition-all duration-500 ${
            direction === "left"
              ? "animate-slideLeft"
              : "animate-slideRight"
          }`}
        >

          {events.map((event, i) => (

            <div
              key={i}
              className="mb-16 bg-[#0B1120] border border-accent/30 rounded-2xl p-8 shadow-xl"
            >

              <h3 className="text-5xl font-harry text-accent mb-3">
                {event.topic}
              </h3>

              <p className=" text-xl italic text-accent mb-8">
                {event.date} | {event.time}
              </p>

              <div className="grid md:grid-cols-2 gap-8">

                {event.speakers.map((sp, j) => (

                  <div
                    key={j}
                    className="bg-black border border-accent/20 rounded-xl p-6 hover:border-accent transition"
                  >

                    <h4 className="text-2xl font-semibold text-accent mb-2">
                      {sp.name}
                    </h4>

                    {sp.designation && (
                      <p className="text-gray-300">
                        {sp.designation}
                      </p>
                    )}

                    {sp.company && (
                      <p className="text-gray-400 mb-4">
                        {sp.company}
                      </p>
                    )}

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Speakers;