import React, { lazy, Suspense } from "react";
import InfiniteModeProductList from "./InfiniteProductPage";
import ProductCardShimmer from "./shimmer/ProductCardShimmer";

const Banner = lazy(() => import("./Banner"));
const ProductList = lazy(() => import("./Product"));
const Testimonial = lazy(() => import("./Testimonimal"));

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl sm:text-3xl font-light tracking-wide text-gray-900">
      {title}
    </h2>
  
  </div>
);

const categories = [
  {
    title: "Men",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
  },
  {
    title: "Women",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  },
  {
    title: "Streetwear",
    img: "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
 
];

const Home: React.FC = () => {
  return (
    <div className="bg-[#f8f8f8] min-h-screen flex flex-col">

      {/* 🔥 HERO BANNER */}
      <Suspense
        fallback={
          <div className="h-[420px] bg-gray-200 animate-pulse rounded-3xl" />
        }
      >
        <div className="">
          <Banner />
        </div>
      </Suspense>

      {/* 🔥 CATEGORY SECTION */}
      <section className="mt-10 px-6 grid grid-cols-2 md:grid-cols-3 gap-6 w-full ">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="relative h-[200px] rounded-2xl overflow-hidden group cursor-pointer"
          >
            <img
              src={`${cat.img}?auto=format&fit=crop&w=800&q=80`}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute bottom-4 left-4 text-white text-lg font-medium">
              {cat.title}
            </div>
          </div>
        ))}
      </section>

      {/* 🔥 SUGGESTION */}
      <section className="mt-14 px-6">
        <SectionHeader title="New Season Picks" />

        <Suspense
          fallback={
            <div className="flex gap-6 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="min-w-[240px]">
                  <ProductCardShimmer />
                </div>
              ))}
            </div>
          }
        >
          <ProductList horizontal title="" productType="suggestion" />
        </Suspense>
      </section>

      {/* 🔥 PREMIUM STRIP */}
      <div className="mx-6 mt-14 rounded-3xl bg-gradient-to-r from-black to-gray-800 text-white p-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-light mb-2">
            Premium Collection 2026
          </h2>
          <p className="text-gray-300 text-sm">
            Exclusive drops available now
          </p>
        </div>

        {/* <button className="px-5 py-2 bg-white text-black rounded-full text-sm">
          Explore
        </button> */}
      </div>

      {/* 🔥 TRENDING GRID */}
      <section className="mt-16 px-6">
        <SectionHeader title="Trending Collection" />

        <Suspense
          fallback={
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardShimmer key={i} />
              ))}
            </div>
          }
        >
          <InfiniteModeProductList />
        </Suspense>
      </section>

      {/* 🔥 RECENT */}
      <section className="mt-16 px-6">
        <SectionHeader title="Recently Viewed" />

        <Suspense
          fallback={
            <div className="flex gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="min-w-[240px]">
                  <ProductCardShimmer />
                </div>
              ))}
            </div>
          }
        >
          <ProductList horizontal title="" productType="recent_look" />
        </Suspense>
      </section>

      {/* 🔥 TESTIMONIAL */}
      <section className="mt-20 mb-16 px-6">
        <SectionHeader title="Client Stories" />

        <Suspense
          fallback={
            <div className="h-[220px] bg-gray-200 animate-pulse rounded-3xl" />
          }
        >
          <Testimonial />
        </Suspense>
      </section>

    </div>
  );
};

export default Home;