import Hero from "../components/home/Hero";
import Highlights from "../components/home/Highlights";
import Invitation from "./Invitation";
const Home = () => {
  return (
      <div className="relative z-10">
        <Hero />
        <Invitation />
        <Highlights />
      </div>
  );
};

export default Home;