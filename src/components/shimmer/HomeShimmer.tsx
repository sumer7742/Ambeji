import React from "react";

/* 🔹 Reusable shimmer block */
const ShimmerBlock = ({ className }: { className: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

/* 🔹 Home Page Shimmer (Banner + Products) */
const HomeShimmer: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 px-2 sm:px-8 py-4 bg-white">

      {/* ================= Banner Shimmer ================= */}
      <div className="w-full h-[260px] sm:h-[320px] rounded-xl overflow-hidden">
        <ShimmerBlock className="w-full h-full" />
      </div>

      {/* ================= Section Title ================= */}
      <div className="mt-2">
        <ShimmerBlock className="h-6 w-48" />
      </div>

      {/* ================= Product Cards ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-3 space-y-3"
          >
            {/* Product image */}
            <ShimmerBlock className="h-40 w-full rounded-lg" />

            {/* Brand / title */}
            <ShimmerBlock className="h-4 w-3/4" />

            {/* Subtitle */}
            <ShimmerBlock className="h-4 w-1/2" />

            {/* Price */}
            <ShimmerBlock className="h-6 w-24" />
          </div>
        ))}
      </div>

    </div>
  );
};

export default HomeShimmer;
