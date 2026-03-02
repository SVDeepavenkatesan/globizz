import { useRef, useState } from "react";
import flashmobVideo from "../assets/videos/Flashmob.mp4";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
const Gallery = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="text-white py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h1 className="text-4xl font-bold mb-12">
          Event <span className="text-accent">Gallery</span>
        </h1>

        <div className="relative max-w-4xl mx-auto">

          {/* Video Container */}
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl">

            <video
              ref={videoRef}
              src={flashmobVideo}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              muted
              loop
              autoPlay
              playsInline
            />

            {/* Hover Overlay Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent 
                            opacity-0 group-hover:opacity-100 
                            transition-opacity duration-500 
                            flex items-center justify-center px-6">

              <p className="text-lg md:text-xl font-medium text-gray-200">
                The GLOBIZZ Flashmob marked the energetic opening of our summit,
                symbolizing unity, ambition, and the unstoppable spirit of future
                business leaders.
              </p>
            </div>
          </div>

          {/* Control Buttons (Outside Video Frame) */}
         {/* Control Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-4">

            <button
              onClick={togglePlay}
              className="bg-accent text-black p-3 rounded-full shadow-lg hover:scale-110 transition"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={toggleMute}
              className="bg-white text-black p-3 rounded-full shadow-lg hover:scale-110 transition"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Gallery;