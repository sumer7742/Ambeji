import React from 'react';

interface CarouselProps {
  component: React.ReactElement; // single component, e.g., a slide or page component
  currentPage: number;
  pageSize: number;
  totalCount: number;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (size: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  component,
  currentPage,
  pageSize,
  totalCount,
  handlePageChange,
  handlePageSizeChange,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const goToPrev = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const pageSizes = [5, 10, 20, 50]; // Example page sizes

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="mb-4">
        {/* Render the single component passed */}
        {component}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4">
        {/* Prev Button */}
        <button
          onClick={goToPrev}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
          aria-label="Previous"
        >
          &lt;
        </button>

        {/* Pagination Dots */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <span
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                currentPage === idx + 1 ? 'bg-black' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
          aria-label="Next"
        >
          &gt;
        </button>
      </div>
      {/* Page Size Selector */}
      <div className="mt-4">
        <label htmlFor="pageSize" className="mr-2 font-medium">
          Items per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="border rounded p-1"
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Carousel;
