import React, { useMemo } from "react";

type Props = {
    currentPage: number;
    handlePageChange: (page: number, totalPages: number) => void;
    pageSize: number;
    totalCount: number;
};

const CarouselSelector: React.FC<Props> = ({
    currentPage,
    handlePageChange,
    pageSize,
    totalCount,
}) => {
    const totalPages = useMemo(
        () => Math.ceil(totalCount / pageSize),
        [totalCount, pageSize]
    );

    return (
        <div className="flex items-center justify-center gap-3 mt-4">
            {/* Prev Arrow */}
            <button
                onClick={() => handlePageChange(currentPage - 1, totalPages)}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 bg-white text-gray-700 
                   hover:bg-emerald-100 hover:text-emerald-700 
                   disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                <span className="material-symbols-outlined text-lg">
                    arrow_back_ios
                </span>
            </button>

            {/* Page Indicator */}
            <span className="text-sm text-gray-700 font-medium select-none px-3">
                {currentPage} / {totalPages}
            </span>

            {/* Next Arrow */}
            <button
                onClick={() => handlePageChange(currentPage + 1, totalPages)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 bg-white text-gray-700 
                   hover:bg-emerald-100 hover:text-emerald-700 
                   disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                <span className="material-symbols-outlined text-lg">
                    arrow_forward_ios
                </span>
            </button>
        </div>
    );
};

export default CarouselSelector;
