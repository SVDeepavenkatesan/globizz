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
              fullscreenItem={fullscreenItem}
              setFullscreenItem={setFullscreenItem}
            />
          ))}
        </div>
      </div>

      {fullscreenItem && (
        <FullscreenModal
          item={fullscreenItem}
          setFullscreenItem={setFullscreenItem}
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
  fullscreenItem,
  setFullscreenItem,
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const isMuted =
    fullscreenItem ? true : activeAudioIndex !== index;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (!fullscreenItem && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [fullscreenItem]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    isMuted
      ? setActiveAudioIndex(index)
      : setActiveAudioIndex(null);
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-2xl">

      {/* Media */}
      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          className="w-full h-full object-cover"
          loop
          autoPlay
          playsInline
        />
      ) : (
        <img
          src={item.src}
          alt={item.eventName}
          className="w-full h-full object-cover"
        />
      )}

      {/* Hover Overlay */}
      <div
        className="absolute inset-0 z-10
                   bg-black/80 from-black/90 via-black/70 to-transparent
                   opacity-0 group-hover:opacity-100
                   transition-opacity duration-500
                   flex items-center justify-center
                   px-4 sm:px-6 text-center"
      >
        <div className="sm:max-h-[80%] sm:overflow-y-auto">

          <h2 className="text-sm sm:text-l font-harry text-bold text-accent">
            {item.eventName}
          </h2>

          <p className="text-xs sm:text-sm text-gray-200">
            {item.shortDescription}
          </p>

          <p className="text-xs sm:text-sm text-accent">
            {item.date} {item.time && `| ${item.time}`}
            <br />
            {item.location}
          </p>

        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex gap-2 sm:gap-3">

        {item.type === "video" && (
          <>
            <button
              onClick={togglePlay}
              className="bg-accent text-black p-2 sm:p-3 rounded-full"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              onClick={toggleMute}
              className="bg-white text-black p-2 sm:p-3 rounded-full"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </>
        )}

        <button
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.muted = true;
            }
            setFullscreenItem({ ...item, index });
          }}
          className="bg-black text-white p-2 sm:p-3 rounded-full"
        >
          <Maximize size={16} />
        </button>

      </div>
    </div>
  );
};

const FullscreenModal = ({ item, setFullscreenItem }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
    }

    const esc = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setFullscreenItem(null);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-6">

      <div className="relative w-full max-w-5xl max-h-[90vh]">

        <button
          onClick={closeModal}
          className="absolute -top-12 right-0 bg-accent text-black w-12 h-12 rounded-full text-2xl font-bold"
        >
          ✕
        </button>

        <div className="bg-black rounded-2xl overflow-hidden relative">

          {item.type === "video" ? (
            <video
              ref={videoRef}
              src={item.src}
              className="w-full max-h-[80vh] object-contain"
              loop
              playsInline
            />
          ) : (
            <img
              src={item.src}
              alt={item.eventName}
              className="w-full max-h-[80vh] object-contain"
            />
          )}

          {item.type === "video" && (
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex gap-3 sm:gap-4">

              <button
                onClick={togglePlay}
                className="bg-accent text-black p-3 sm:p-4 rounded-full"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <button
                onClick={toggleMute}
                className="bg-white text-black p-3 sm:p-4 rounded-full"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Gallery;