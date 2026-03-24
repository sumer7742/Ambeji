import {  useGift } from "../hooks/useGift";
import { useState, useEffect } from "react";

const GiftElegance: React.FC = () => {
  const { data, isLoading, error } = useGift();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const handleCardClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!data) return;
    const interval = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % data.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [data]);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching data</p>;

  return (
    <div className="my-10 px-4 relative">
      <h2 className="text-2xl font-bold text-center mb-6">Gift Elegance</h2>
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${scrollIndex * 270}px)` }}
        >
          {data?.map((item: any, index: number) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={item._id}
                className="min-w-[250px] max-w-[250px] flex-shrink-0 text-center cursor-pointer"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => handleCardClick(index)}
              >
                <img
                  src={isActive ? item.hoverImage : item.image}
                  alt={item.name}
                  className="w-full h-64 rounded-xl object-cover transition-all duration-300"
                />
                <p className="mt-2 text-base font-medium">{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GiftElegance;
