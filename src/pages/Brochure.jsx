import { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import brochureFile from "../assets/brochure/EventsBrochure.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PAGE_RATIO = 15.6 / 22.01; // width / height

const Brochure = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageSize, setPageSize] = useState({ width: 400, height: 600 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      const containerWidth = containerRef.current?.offsetWidth || 1200;

      // Allow full spread width
      const maxSpreadWidth = containerWidth * 0.7;

      const singlePageWidth = maxSpreadWidth / 2;
      const singlePageHeight = singlePageWidth / PAGE_RATIO;

      setPageSize({
        width: singlePageWidth,
        height: singlePageHeight,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="py-12 text-center w-full">

      <h2 className="text-3xl sm:text-4xl font-harry text-accent mb-10">
        Event Brochure
      </h2>

      <div
        ref={containerRef}
        className="w-full flex justify-center"
      >
        <Document
          file={brochureFile}
          onLoadSuccess={onLoadSuccess}
        >
          {numPages && (
            <HTMLFlipBook
              width={pageSize.width}
              height={pageSize.height}
              size="fixed"           // 🔥 IMPORTANT
              showCover
              usePortrait={false}    // 🔥 FORCE landscape spread
              drawShadow
              flippingTime={900}
              className="shadow-2xl"
            >
              {Array.from({ length: numPages }, (_, index) => (
                <div
                  key={index}
                  className="bg-white flex justify-center items-center"
                >
                  <Page
                    pageNumber={index + 1}
                    width={pageSize.width}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>

      <div className="mt-10">
        <a
          href={brochureFile}
          download
          className="bg-accent text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Download Brochure
        </a>
      </div>

    </div>
  );
};

export default Brochure;