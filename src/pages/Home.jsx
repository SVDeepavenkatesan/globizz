import Hero from "../components/home/Hero";
import Highlights from "../components/home/Highlights";

const Home = () => {
  return (
      <div className="relative z-10">
        <Hero />
        <Highlights />
      </div>
  );
};

export default Home;