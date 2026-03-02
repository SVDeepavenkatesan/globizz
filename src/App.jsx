import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import desktopBG from "./assets/images/heroBG.jpg";
import mobileBG from "./assets/images/heroBG-mobile.jpg";

function App() {
  return (
    <div className="relative min-h-screen text-white">

      {/* Fixed Background Layer */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: `url(${desktopBG})` }}
      />

      <div
        className="fixed inset-0 -z-20 bg-cover bg-center md:hidden"
        style={{ backgroundImage: `url(${mobileBG})` }}
      />

      {/* Dark Overlay */}
      <div className="fixed inset-0 -z-10 bg-black/80" />

      {/* NORMAL FLOW CONTENT */}
      <Navbar />

      <AppRoutes />

    </div>
  );
}

export default App;