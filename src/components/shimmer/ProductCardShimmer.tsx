import React from "react";

interface ProductCardShimmerProps {
  isFullDetail?: boolean;
}

const ProductCardShimmer: React.FC<ProductCardShimmerProps> = ({
  isFullDetail = false,
}) => {
  return (
    <div className="relative flex flex-col h-full border border-gray-200 bg-white shadow-sm overflow-hidden">
      
      {/* Wishlist icon */}
      <div className="absolute top-2 right-2 w-8 h-8 bg-gray-200 rounded-full shimmer" />

      <div className="flex flex-col flex-grow p-3 relative">

        {/* Discount badge */}
        <div className="absolute top-4 left-4 w-16 h-5 bg-gray-200 rounded shimmer" />

        {/* Image */}
        <div className="w-full h-44 bg-gray-200 rounded-lg shimmer" />

        <div className="mt-3 flex flex-col flex-grow justify-between">

          {/* Assured + title */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <div className="w-5 h-5 bg-gray-200 rounded-full shimmer" />
              <div className="w-12 h-3 bg-gray-200 rounded shimmer" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="w-40 h-4 bg-gray-200 rounded shimmer" />
              <div className="w-28 h-3 bg-gray-200 rounded shimmer" />
            </div>
          </div>

          {/* Price */}
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <div className="w-20 h-5 bg-gray-200 rounded shimmer" />
              <div className="w-16 h-4 bg-gray-200 rounded shimmer" />
            </div>
            <div className="w-24 h-3 bg-gray-200 rounded mt-2 shimmer" />
          </div>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <div className="w-12 h-5 bg-gray-200 rounded shimmer" />
            <div className="w-20 h-4 bg-gray-200 rounded shimmer" />
          </div>

          {/* Highlights (only for full detail) */}
          {isFullDetail && (
            <div className="mt-3 border-t border-gray-100 pt-2 space-y-2">
              <div className="w-full h-3 bg-gray-200 rounded shimmer" />
              <div className="w-5/6 h-3 bg-gray-200 rounded shimmer" />
              <div className="w-4/6 h-3 bg-gray-200 rounded shimmer" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardShimmer;
