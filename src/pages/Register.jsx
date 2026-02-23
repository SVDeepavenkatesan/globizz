const Register = () => {
  return (
    <section className="bg-primary text-white py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-10 text-center">
          Register for <span className="text-accent">GLOBIZZ 2026</span>
        </h1>

        <form className="space-y-6">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

          <input
            type="text"
            placeholder="College Name"
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          />

          <button
            type="submit"
            className="w-full bg-accent text-black py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Submit Registration
          </button>

        </form>

      </div>
    </section>
  );
};

export default Register;