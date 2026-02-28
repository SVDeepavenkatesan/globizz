import Hero from "../components/home/Hero";
import Highlights from "../components/home/Highlights";
import heroBG from "../assets/images/heroBG.jpg";

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBG})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-primary/80 to-black/95"></div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <Highlights />
      </div>
    </div>
  );
};

export default Home;