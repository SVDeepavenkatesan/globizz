import Hero from "../components/home/Hero";
import Highlights from "../components/home/Highlights";
import heroBG from "../assets/images/heroBG.jpg";

const Home = () => {
  return (
    <div className="relative overflow-hidden">

      <img
        src={heroBG}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-primary/80 to-black/95"></div>

      <div className="relative z-10">
        <Hero />
        <Highlights />
      </div>

    </div>
  );
};

export default Home;