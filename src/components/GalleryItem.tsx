import React, { useEffect, useMemo, useState } from "react";
import type { IUserGallery } from "../common/types/types";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

type Slide =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

const GalleryItem: React.FC<{ item: IUserGallery }> = ({ item }) => {
  const slides: Slide[] = useMemo(() => {
    const out: Slide[] = [];
    for (const src of item.images ?? []) {
      out.push({ type: isVideo(src) ? "video" : "image", src });
    }
    return out;
  }, [item.images]);

  const [idx, setIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const next = () => setIdx((i) => (i + 1) % slides.length);
  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);

  const current = slides[idx];
  const hasMedia = slides.length > 0;

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [slides]);

  return (
    <section className="rounded-2xl overflow-hidden border bg-white shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative bg-gray-100">
        {!hasMedia ? (
          <div className="w-full aspect-[4/3] grid place-items-center text-gray-400">
            <ImageIcon className="w-10 h-10" />
          </div>
        ) : (
          <div
            className="relative flex justify-center items-center overflow-hidden"
            style={{ minHeight: "40vh" }}
          >
            {current.type === "video" ? (
              <video
                src={current.src}
                className="max-h-[60vh] w-auto rounded-lg object-contain transition-all duration-300"
                controls
                playsInline
              />
            ) : (
              <img
                src={current.src}
                alt={item.title}
                className={`block w-auto h-auto max-h-[60vh] object-contain transition-opacity duration-500 ${
                  isLoading ? "opacity-50 blur-sm" : "opacity-100 blur-0"
                }`}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
              />
            )}

            {/* Title & Description Overlay */}
            {(item.title || item.description) && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="px-4 py-3 text-white text-center">
                  {item.title && (
                    <h3 className="text-lg font-semibold tracking-wide">
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p className="mt-1 text-sm opacity-90">{item.description}</p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {slides.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60 grid place-items-center backdrop-blur-sm transition"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60 grid place-items-center backdrop-blur-sm transition"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Thumbnail indicators */}
      {slides.length > 1 && (
        <div className="px-4 sm:px-6 py-4 border-t bg-gray-50">
          <div className="flex items-center justify-center gap-3 overflow-x-auto">
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`relative h-12 w-16 overflow-hidden rounded-md border transition-all duration-200 ${
                  i === idx
                    ? "border-blue-500 ring-2 ring-blue-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {slide.type === "video" ? (
                  <video
                    src={slide.src}
                    className="object-cover w-full h-full opacity-80"
                  />
                ) : (
                  <img
                    src={slide.src}
                    alt={`Thumbnail ${i + 1}`}
                    className="object-cover w-full h-full opacity-90"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryItem;
