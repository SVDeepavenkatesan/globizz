import { useEffect, useState, useRef } from "react";
import { galleryItems } from "../data/Gallery";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [activeAudioIndex, setActiveAudioIndex] = useState(null);
  const [fullscreenItem, setFullscreenItem] = useState(null);

  useEffect(() => {
    const loadGallery = async () => {
      const loaded = await Promise.all(
        galleryItems.map(async (item) => {
          try {
            const mediaModule = await import(
              `../assets/Gallery/${item.name}.${item.type === "video" ? "mp4" : "jpeg"}`
            );

            const xmlModule = await import(
              `../assets/GalleryDescription/${item.name}.xml?raw`
            );

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(
              xmlModule.default,
              "text/xml"
            );

            const getText = (tag) =>
              xmlDoc.getElementsByTagName(tag)[0]?.textContent || "";

            return {
              ...item,
              src: mediaModule.default,
              eventName: getText("eventName"),
              shortDescription: getText("shortDescription"),
              date: getText("date"),
              time: getText("time"),
              location: getText("location"),
            };
          } catch (err) {
            console.error(err);
            return null;
          }
        })
      );

      setItems(loaded.filter(Boolean));
    };

    loadGallery();
  }, []);

  return (
    <section className="text-white py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h1>
          Event <span className="text-accent">Gallery</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-10 mt-16">

          {items.map((item, index) => (
            <GalleryCard
              key={index}
              item={item}
              index={index}
              activeAudioIndex={activeAudioIndex}
              setActiveAudioIndex={setActiveAudioIndex}
              setFullscreenItem={setFullscreenItem}
            />
          ))}

        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      {fullscreenItem && (
        <FullscreenModal
          item={fullscreenItem}
          activeAudioIndex={activeAudioIndex}
          setActiveAudioIndex={setActiveAudioIndex}
          onClose={() => setFullscreenItem(null)}
        />
      )}
    </section>
  );
};

const GalleryCard = ({
  item,
  index,
  activeAudioIndex,
  setActiveAudioIndex,
  setFullscreenItem,
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const isMuted = activeAudioIndex !== index;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    isMuted ? setActiveAudioIndex(index) : setActiveAudioIndex(null);
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-2xl">

      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          muted
          loop
          autoPlay
          playsInline
        />
      ) : (
        <img
          src={item.src}
          alt={item.eventName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Hover Info */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center text-center px-6">
        <div>
          <h2 className="text-2xl font-harry text-accent mb-2">
            {item.eventName}
          </h2>
          <p>{item.shortDescription}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex gap-3">

        {item.type === "video" && (
          <>
            <button
              onClick={togglePlay}
              className="bg-accent text-black p-3 rounded-full"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button
              onClick={toggleMute}
              className="bg-white text-black p-3 rounded-full"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </>
        )}

        <button
          onClick={() => setFullscreenItem({ ...item, index })}
          className="bg-black text-white p-3 rounded-full"
        >
          <Maximize size={18} />
        </button>

      </div>
    </div>
  );
};

const FullscreenModal = ({
  item,
  activeAudioIndex,
  setActiveAudioIndex,
  onClose,
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const isMuted = activeAudioIndex !== item.index;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    isMuted ? setActiveAudioIndex(item.index) : setActiveAudioIndex(null);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-6">

      <div className="relative w-full max-w-5xl max-h-[90vh]">

        {/* Close Button OUTSIDE */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 bg-accent text-black w-12 h-12 rounded-full text-2xl font-bold"
        >
          ✕
        </button>

        <div className="bg-black rounded-2xl overflow-hidden">

          {item.type === "video" ? (
            <video
              ref={videoRef}
              src={item.src}
              className="w-full max-h-[80vh] object-contain"
              autoPlay
              loop
              muted
            />
          ) : (
            <img
              src={item.src}
              alt={item.eventName}
              className="w-full max-h-[80vh] object-contain"
            />
          )}

          {/* Controls in popup */}
          {item.type === "video" && (
            <div className="absolute bottom-6 right-6 flex gap-4">

              <button
                onClick={togglePlay}
                className="bg-accent text-black p-4 rounded-full"
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} />}
              </button>

              <button
                onClick={toggleMute}
                className="bg-white text-black p-4 rounded-full"
              >
                {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;