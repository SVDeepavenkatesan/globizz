const stats = [
  {
    number: "1000+",
    label: "Students Participating",
  },
  {
    number: "30+",
    label: "Industry Leaders",
  },
  {
    number: "15+",
    label: "Management Events",
  },
  {
    number: "10+",
    label: "Corporate Partners",
  },
];

const Highlights = () => {
  return (
    <section className="text-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <h2 className="font-harry spaced-text text-3xl md:text-4xl font-bold mb-12  ">
          The Scale of <span className="text-accent">GLOBIZZ</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-primary p-8 rounded-2xl hover:scale-105 transition duration-300 shadow-lg"
            >
              <h3 className="text-3xl md:text-4xl font-extrabold text-accent">
                {stat.number}
              </h3>
              <p className="mt-4 text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Highlights;