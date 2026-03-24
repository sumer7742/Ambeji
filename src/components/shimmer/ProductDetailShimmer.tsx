import React from "react";

const Shimmer = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const ProductDetailShimmer: React.FC = () => {
  return (
    <div className="p-2 sm:p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex gap-2 mb-4">
          <Shimmer className="h-4 w-16" />
          <Shimmer className="h-4 w-20" />
          <Shimmer className="h-4 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* LEFT: IMAGES */}
          <div className="md:col-span-6 space-y-4">
            {/* Main Image */}
            <Shimmer className="h-[65vh] w-full rounded-xl" />

            {/* Thumbnails */}
            <div className="hidden md:flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Shimmer key={i} className="h-20 w-20 rounded-md" />
              ))}
            </div>

            {/* Mobile swipe images */}
            <div className="flex md:hidden gap-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <Shimmer key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="md:col-span-6 space-y-4">

            {/* Title */}
            <Shimmer className="h-8 w-3/4" />

            {/* Brand + Assured */}
            <div className="flex gap-3 items-center">
              <Shimmer className="h-5 w-5 rounded-full" />
              <Shimmer className="h-4 w-32" />
            </div>

            {/* Rating */}
            <div className="flex gap-3">
              <Shimmer className="h-6 w-14 rounded-md" />
              <Shimmer className="h-4 w-24" />
            </div>

            {/* Price */}
            <div className="flex gap-4 items-end">
              <Shimmer className="h-10 w-32" />
              <Shimmer className="h-6 w-20" />
              <Shimmer className="h-5 w-16" />
            </div>

            {/* Offers */}
            <div className="space-y-2">
              <Shimmer className="h-5 w-40" />
              {Array.from({ length: 3 }).map((_, i) => (
                <Shimmer key={i} className="h-4 w-full" />
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Shimmer key={i} className="h-4 w-full" />
              ))}
            </div>

            {/* Colors */}
            <div>
              <Shimmer className="h-5 w-20 mb-2" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Shimmer key={i} className="h-9 w-24 rounded-full" />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <Shimmer className="h-5 w-16 mb-2" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Shimmer key={i} className="h-9 w-24 rounded-full" />
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-2">
              <Shimmer className="h-6 w-40" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Shimmer key={i} className="h-4 w-full" />
              ))}
            </div>

            {/* Buttons */}
            <div className="hidden md:flex gap-4 mt-4">
              <Shimmer className="h-12 w-full rounded-lg" />
              <Shimmer className="h-12 w-full rounded-lg" />
            </div>
          </div>
        </div>

        {/* Ratings Section */}
        <div className="mt-8 space-y-3">
          <Shimmer className="h-6 w-40" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Shimmer key={i} className="h-16 w-full rounded-md" />
          ))}
        </div>

        {/* Related Products */}
        <div className="mt-10 space-y-4">
          <Shimmer className="h-6 w-48" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <Shimmer key={i} className="h-72 w-56 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white p-3 flex gap-3 border-t">
          <Shimmer className="h-12 w-full rounded-lg" />
          <Shimmer className="h-12 w-full rounded-lg" />
        </div>

      </div>
    </div>
  );
};

export default ProductDetailShimmer;
