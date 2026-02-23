import { events } from "../data/eventsData";

const Events = () => {
  return (
    <section className="bg-black text-white py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-12">
          Management <span className="text-accent">Events</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-primary p-6 rounded-2xl shadow-lg hover:scale-105 transition"
            >
              <h2 className="text-xl font-bold text-accent">
                {event.title}
              </h2>
              <p className="text-gray-300 mt-4">
                {event.description}
              </p>
              <p className="mt-4 font-semibold">
                Prize: {event.prize}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Events;