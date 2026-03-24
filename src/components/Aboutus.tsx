import { Link } from "react-router-dom";
import ShopNowSection from "../screens/ShopNowSection";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white text-black font-[Helvetica]">

      {/* ───── HERO SECTION (Fashion Model) ───── */}
      <section className="relative h-screen flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1600&q=80"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center text-white px-6">
          <p className="uppercase tracking-[6px] text-sm mb-6">New Collection 2026</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Wear Confidence
          </h1>
          <p className="mt-6 text-gray-200 text-lg max-w-xl mx-auto">
            Modern clothing designed for comfort, style, and everyday elegance.
          </p>

          <div className="mt-10">
            <Link to="/">
              <button className="px-12 py-4 bg-white text-black hover:bg-gray-200 transition">
                Explore Collection
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ───── CATEGORY GRID (Men / Women / Accessories) ───── */}
      <section className="px-6 py-20 max-w-7xl mx-auto grid md:grid-cols-3 gap-6">

        {[
          {
            name: "Men",
            img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=80",
            path: "/",
          },
          {
            name: "Women",
            img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
            path: "/",
          },
          {
            name: "Accessories",
            img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
            path: "/",
          },
        ].map((item) => (
          <Link key={item.name} to={item.path}>
            <div className="relative h-[400px] overflow-hidden group rounded-xl shadow-lg">
              <img
                src={item.img}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <h2 className="absolute bottom-6 left-6 text-white text-2xl font-semibold">
                {item.name}
              </h2>
            </div>
          </Link>
        ))}

      </section>

      {/* ───── BRAND STORY (Lifestyle Section) ───── */}
      <section className="py-24 px-6 grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
          className="w-full h-[500px] object-cover rounded-xl"
        />

        <div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Designed for the modern generation
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Our clothing blends comfort with statement design. Every piece is crafted to elevate
            your everyday style — from minimal essentials to bold fashion statements.
          </p>
        </div>
      </section>

      {/* ───── FEATURE STRIP ───── */}
      <section className="border-t border-b py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 text-center gap-6 text-sm tracking-wide">
          <p>Free Shipping Worldwide</p>
          <p>Premium Quality Fabric</p>
          <p>Easy 7-Day Returns</p>
        </div>
      </section>

      {/* ───── COLLECTION HIGHLIGHTS (Editorial Cards) ───── */}
      <section className="px-6 py-20 max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {[
          {
    title: "Streetwear",
    img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?", // urban streetwear
  },
  {
    title: "Formal Wear",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80", // formal office outfit
  },
  {
    title: "Casual",
    img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?", // casual everyday look
  },
        ].map((item) => (
          <div key={item.title} className="relative group h-[400px] rounded-xl overflow-hidden">
            <img
              src={item.img}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/25"></div>
            <h3 className="absolute bottom-6 left-6 text-white text-2xl font-semibold">
              {item.title}
            </h3>
          </div>
        ))}
      </section>

     
      <ShopNowSection />
    </div>
  );
};

export default AboutUs;