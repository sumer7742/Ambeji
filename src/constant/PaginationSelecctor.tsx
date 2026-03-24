import React, { useMemo } from "react";
const DOTS = "...";
type Props = {
  siblingCount?: number;
  currentPage: number;
  handlePageChange: (page: number, totalPages: number) => void;
  pageSize: number;
  handlePageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
  totalCount: number;
};

const PaginationSelector: React.FC<Props> = ({
  currentPage,
  handlePageChange,
  pageSize,
  handlePageSizeChange,
  pageSizeOptions = [5, 10, 20, 50, 100, 200],
  siblingCount = 1,
  totalCount,
}) => {
  const totalPages = useMemo(
    () => Math.ceil(totalCount / pageSize),
    [totalCount]
  );
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSibling > 2;
    const shouldShowRightDots = rightSibling < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = Array.from(
        { length: 3 + 2 * siblingCount },
        (_, i) => i + 1
      );
      return [...leftRange, DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = Array.from(
        { length: 3 + 2 * siblingCount },
        (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1
      );
      return [1, DOTS, ...rightRange];
    }

    const middleRange = Array.from(
      { length: rightSibling - leftSibling + 1 },
      (_, i) => leftSibling + i
    );
    return [1, DOTS, ...middleRange, DOTS, totalPages];
  }, [totalCount, currentPage, pageSize]);
  return (
    <div className="bg-gray-100 text-gray-800 mt-2 px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-xl shadow-sm border border-gray-300" key={currentPage + pageSize}>
      {/* Page size selector */}
      <div className="sm:flex items-center gap-2 hidden">
        <label className="text-gray-600 text-sm">Rows per page:</label>
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="bg-white text-sm text-gray-800 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size} className="bg-white text-gray-800">
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-1 flex-wrap justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1, Number(totalPages))}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md text-sm border border-gray-300 bg-white text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Prev
        </button>

        {paginationRange.map((page, idx) =>
          page === "..." ? (
            <span key={idx} className="px-3 text-gray-400 text-sm">...</span>
          ) : (
            <button
              key={idx}
              onClick={() => handlePageChange(Number(page), Number(totalPages))}
              className={`px-3 py-2 rounded-md text-sm border transition ${currentPage === page
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 border-gray-300"
                }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1, Number(totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md text-sm border border-gray-300 bg-white text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationSelector;
