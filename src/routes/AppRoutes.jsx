import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Events from "../pages/Events";
import Speakers from "../pages/Speakers";
import Sponsors from "../pages/Sponsors";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";
import Volunteers from "../pages/Volunteers";

const AppRoutes = () => {
  return (
    <div className="md:top-112px"> 
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/volunteers" element={<Volunteers />} />
        </Routes>
      </Layout>
      </div>
  );
};

export default AppRoutes;