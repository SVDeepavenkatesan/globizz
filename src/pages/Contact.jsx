import { useEffect, useState } from "react";
import contactXML from "../data/contact.xml?raw";

const Contact = () => {

  const [sections, setSections] = useState([]);

  useEffect(() => {

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(contactXML, "text/xml");

    const sectionNodes = Array.from(xmlDoc.getElementsByTagName("section"));

    const parsedSections = sectionNodes.map((section) => {

      const title =
        section.getElementsByTagName("title")[0]?.textContent || "";

      const persons = Array.from(
        section.getElementsByTagName("person")
      ).map((person) => ({
        name: person.getElementsByTagName("name")[0]?.textContent || "",
        designation:
          person.getElementsByTagName("designation")[0]?.textContent || "",
        department:
          person.getElementsByTagName("department")[0]?.textContent || "",
        school:
          person.getElementsByTagName("school")[0]?.textContent || "",
        university:
          person.getElementsByTagName("university")[0]?.textContent || "",
        location:
          person.getElementsByTagName("location")[0]?.textContent || "",
        phone:
          person.getElementsByTagName("phone")[0]?.textContent || "",
      }));

      return {
        title,
        persons,
      };
    });

    setSections(parsedSections);

  }, []);

  return (
    <section className="text-white py-20 min-h-screen">

      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-center">
          Contact <span className="text-accent">Us</span>
        </h1>

        <div className="space-y-12 mt-16 justify-items-center">

          {sections.map((section, index) => (

            <div
              key={index}
              className="bg-[#0B1120] border border-accent/30 rounded-2xl p-8 shadow-xl "
            >

              <h2 className="text-3xl font-harry text-accent mb-8 text-center ">
                {section.title}
              </h2>

              <div className="grid md:grid-cols-1 gap-8 text-center justify-items-center">

                {section.persons.map((person, i) => (

                  <div
                    key={i}
                    className="bg-black border border-accent/20 rounded-xl p-6 hover:border-accent transition"
                  >

                    <h3 className="text-xl text-accent font-semibold mb-2">
                      {person.name}
                    </h3>

                    {person.designation && (
                      <p className="text-gray-300">
                        {person.designation}
                      </p>
                    )}

                    {person.department && (
                      <p className="text-gray-400">
                        {person.department}
                      </p>
                    )}

                    {person.school && (
                      <p className="text-gray-400">
                        {person.school}
                      </p>
                    )}

                    {person.university && (
                      <p className="text-gray-400">
                        {person.university}
                      </p>
                    )}

                    {person.location && (
                      <p className="text-gray-400 mb-4">
                        {person.location}
                      </p>
                    )}

                    <a
                      href={`tel:${person.phone}`}
                      className="inline-block bg-accent text-black px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
                    >
                      📞 {person.phone}
                    </a>

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

export default Contact;