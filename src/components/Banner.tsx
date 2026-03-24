import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousels } from "../hooks/useCarousel";
import type { Carousel } from "../common/types/types";
import { useIsMobile } from "../hooks/useMobile";
import LoadingOverlay from "./Loading";
const Banner: React.FC = () => {
  const { data: carousels, isLoading } = useCarousels();
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState<number>(0);
  const [delay, setDelay] = useState<number>(5000);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<any>(null);
  const navigate = useNavigate();
  // Auto slide
  useEffect(() => {
    if (!carousels || carousels.length === 0) return;
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setDirection("right");
      setCurrent((prev) => (prev + 1) % carousels.length);
    }, delay);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [carousels, delay, current]);

  // Play/pause videos
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === current) {
          video.currentTime = 0;
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      }
    });
  }, [current]);

  const prevSlide = () => {
    if (!carousels) return;
    setDirection("left");
    setCurrent((prev) => (prev - 1 + carousels.length) % carousels.length);
    setDelay(8000);
  };

  const nextSlide = () => {
    if (!carousels) return;
    setDirection("right");
    setCurrent((prev) => (prev + 1) % carousels.length);
    setDelay(8000);
  };

  const isVideo = (url: string) =>
    url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg");

  if (isLoading) <LoadingOverlay isNotFixed={true} />
  return (
    <div
      className="
        relative w-full 
        h-[200px] sm:h-[280px] md:h-[35vh] lg:h-[60vh] xl:h-[50vh] 
        overflow-hidden shadow-lg
        transition-all duration-500 ease-in-out  
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        {carousels?.map((item: Carousel, index: number) =>
          index === current ? (
            <motion.div
  key={item._id}
  className="absolute w-full h-full cursor-pointer"
  onClick={() => navigate("/product?offer=high")}

              custom={direction}
              initial={{ opacity: 0, x: direction === "right" ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "right" ? -100 : 100 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              {isVideo(item.image) ? (
                <video
                  ref={(el: HTMLVideoElement | null) => {
                    videoRefs.current[index] = el;
                  }}
                  src={item.image}
                  className="w-full h-full "
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={!isMobile ? item.image : item?.mobileImage}
                  alt={item.title}
                  className="w-full h-full "
                />
              )}
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Left Arrow */}
      <motion.button
        onClick={prevSlide}
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : -20,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{
          scale: 1.15,
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white w-11 h-11 flex items-center justify-center rounded-full z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      {/* Right Arrow */}
      <motion.button
        onClick={nextSlide}
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{
          scale: 1.15,
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white w-11 h-11 flex items-center justify-center rounded-full z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {carousels?.map((_, index) => (
          <div
            key={index}
            onClick={() => {
              if (index > current) setDirection("right");
              else setDirection("left");
              setCurrent(index);
              setDelay(8000);
            }}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${index === current ? "bg-white" : "bg-gray-400"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
