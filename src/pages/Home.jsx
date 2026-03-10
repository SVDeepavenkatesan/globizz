import Hero from "../components/home/Hero";
import Highlights from "../components/home/Highlights";
import Invitation from "./Invitation";
import Brochure from "./Brochure";
const Home = () => {
  return (
      <div className="relative z-10">
        <Hero />
        <Invitation />
        <Brochure />
        <Highlights />
      </div>
  );
};

export default Home;