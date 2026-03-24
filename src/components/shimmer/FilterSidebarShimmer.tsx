import React from "react";

const FilterSidebarShimmer: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      
      {/* Section title */}
      <div className="h-5 w-32 bg-gray-200 rounded shimmer" />

      {/* Checkbox list */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-4 h-4 bg-gray-200 rounded shimmer" />
          <div className="h-4 w-32 bg-gray-200 rounded shimmer" />
        </div>
      ))}

      {/* Divider */}
      <div className="h-px bg-gray-200 my-4" />

      {/* Another filter section */}
      <div className="h-5 w-28 bg-gray-200 rounded shimmer" />

      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-4 h-4 bg-gray-200 rounded shimmer" />
          <div className="h-4 w-24 bg-gray-200 rounded shimmer" />
        </div>
      ))}

      {/* Price range */}
      <div className="mt-6 space-y-3">
        <div className="h-5 w-24 bg-gray-200 rounded shimmer" />
        <div className="h-2 w-full bg-gray-200 rounded shimmer" />
        <div className="flex justify-between">
          <div className="h-4 w-10 bg-gray-200 rounded shimmer" />
          <div className="h-4 w-10 bg-gray-200 rounded shimmer" />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebarShimmer;
