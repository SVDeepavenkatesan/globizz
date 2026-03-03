import Hero from "../components/home/Hero";
import Highlights from "../components/home/Highlights";
import Brochure from "./Brochure";
const Home = () => {
  return (
      <div className="relative z-10">
        <Hero />
        <Brochure />
        <Highlights />
      </div>
  );
};

export default Home;