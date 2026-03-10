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
              `../assets/Gallery/${item.name}.${item.type === "video" ? "mp4" : "jpg"}`
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

  const videos = items.filter((i) => i.type === "video");
  const photos = items.filter((i) => i.type !== "video");

  return (
    <section className="text-white py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h1>
          Event <span className="text-accent">Gallery</span>
        </h1>

        {/* ================= VIDEOS ================= */}

        <div className="space-y-12 mt-16">
          {videos.map((item, index) => (
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

        {/* ================= PHOTO GALLERY ================= */}

        {photos.length > 0 && (
          <div className="mt-20">

            <h2 className="text-3xl font-harry text-accent mb-10">
              Photo Gallery
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

              {photos.map((item, index) => (
                <PhotoCard
                  key={index}
                  item={item}
                  setFullscreenItem={setFullscreenItem}
                />
              ))}

            </div>

          </div>
        )}

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

  const isMuted = fullscreenItem ? true : activeAudioIndex !== index;

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    isMuted
      ? setActiveAudioIndex(index)
      : setActiveAudioIndex(null);
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-2xl">

      <video
        ref={videoRef}
        src={item.src}
        className="w-full object-cover"
        loop
        autoPlay
        playsInline
      />

      {/* Overlay */}

      <div className="backdrop-blur-md  absolute inset-0 z-10 bg-black/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-center px-6">

        <div>
          <h2 className="text-3xl md:text-6xl font-harry text-accent mb-4">
            {item.eventName}
          </h2>

          <p className="text-gray-200 mb-2">
            {item.shortDescription}
          </p>

          <p className="text-accent">
            {item.date} {item.time && `| ${item.time}`}
            <br />
            {item.location}
          </p>
        </div>

      </div>

      {/* Controls */}

      <div className="absolute bottom-4 right-4 z-20 flex gap-3">

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

        <button
          onClick={() => setFullscreenItem(item)}
          className="bg-black text-white p-3 rounded-full"
        >
          <Maximize size={18} />
        </button>

      </div>

    </div>
  );
};

const PhotoCard = ({ item, setFullscreenItem }) => {

  return (
    <div className="relative group rounded-xl overflow-hidden shadow-xl">

      <img
        src={item.src}
        alt={item.eventName}
        className="w-full h-72 object-cover"
      />

      <button
        onClick={() => setFullscreenItem(item)}
        className="absolute bottom-3 right-3 bg-black text-white p-2 rounded-full"
      >
        <Maximize size={18} />
      </button>

    </div>
  );
};

const FullscreenModal = ({ item, setFullscreenItem }) => {

  const closeModal = () => setFullscreenItem(null);

  return (
    <div className="backdrop-blur-md fixed inset-0 flex items-center justify-center z-50 p-6">

      <div className="relative w-full max-w-6xl">

        <button
          onClick={closeModal}
          className="absolute -top-12 right-0 bg-accent text-black w-12 h-12 rounded-full text-2xl font-bold"
        >
          ✕
        </button>

        <div className="rounded-2xl overflow-hidden">

          {item.type === "video" ? (
            <video
              src={item.src}
              className="w-full max-h-[85vh] object-contain"
              controls
              autoPlay
            />
          ) : (
            <img
              src={item.src}
              alt={item.eventName}
              className="w-full max-h-[85vh] object-contain"
            />
          )}

        </div>

      </div>

    </div>
  );
};

export default Gallery;