import React, { useEffect, useState } from "react";

interface Testimonial {
  message: string;
  name: string;
}

const testimonials: Testimonial[] = [
  {
    message: "The outfits are super stylish and the quality is amazing. Totally worth it!",
    name: "Aarav Sharma",
  },
  {
    message: "Loved the shirts collection! Perfect fitting and premium feel.",
    name: "Rohan Mehta",
  },
  {
    message: "Fashion at its best! Unique designs you won’t find anywhere else.",
    name: "Kavya Bansal",
  },
  {
    message: "Amazing experience. Trendy styles and fast delivery!",
    name: "Yash Rajput",
  },
];

const Testimonial: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => handleNext(), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
      setFade(true);
    }, 200);
  };

  const t = testimonials[current];

  return (
    <div className="bg-gradient-to-b from-white to-red-50">

      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-xs font-semibold tracking-[4px] uppercase text-[#dd3333] mb-2">
          Reviews
        </p>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Why People Love <span className="text-[#dd3333]">Ambeji Fashion</span> ❤️
        </h2>

        <div className="mt-3 mx-auto w-16 h-[3px] bg-[#dd3333] rounded-full" />

        <p className="mt-4 text-gray-600 text-sm max-w-xl mx-auto">
          Discover what our customers say about our trendy collections, premium quality, and style.
        </p>
      </section>

      {/* CARD */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="relative">

          

          <div className={`bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl px-10 py-10 text-center transition-all duration-500 ${fade ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            
            <p className="text-lg italic text-gray-700 leading-relaxed min-h-[80px]">
              "{t.message}"
            </p>

            <div className="mt-6 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#dd3333] text-white flex items-center justify-center font-bold">
                {t.name.charAt(0)}
              </div>

              <p className="mt-2 font-semibold text-gray-900">
                {t.name}
              </p>

              {/* Stars */}
              <div className="flex gap-1 mt-1 text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>

          {/* DOTS */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`transition-all duration-300 rounded-full ${
                  current === idx
                    ? "w-8 h-2.5 bg-[#dd3333]"
                    : "w-2.5 h-2.5 bg-gray-300 hover:bg-[#dd3333]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          {[
            { title: "Premium Quality", desc: "High-quality fabrics & materials." },
            { title: "Latest Trends", desc: "Stay ahead in fashion." },
            { title: "Fast Delivery", desc: "Quick & reliable shipping." },
            { title: "Happy Customers", desc: "Loved by fashion lovers." },
          ].map((item) => (
            <div key={item.title} className="group">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-50 border flex items-center justify-center mb-3 group-hover:bg-[#dd3333] transition">
                <span className="text-[#dd3333] group-hover:text-white text-xl font-bold">
                  ✓
                </span>
              </div>

              <p className="font-semibold text-gray-900 text-sm">
                {item.title}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
};

export default Testimonial;