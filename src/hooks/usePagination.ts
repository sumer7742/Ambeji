import { useState } from "react";
export const usePagination = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSizeValue, setPageSizeValue] = useState<number>(10);
  const startItem = (pageNumber - 1) * pageSizeValue + 1;
  const handlePageChange = (page: number, totalPages: number) => {
    if (page >= 1 && page <= totalPages && page !== pageNumber) {
      setPageNumber(page);
    }
  };
  const handlePageSizeChange = (size: number) => {
    if (size > 0 && size !== pageSizeValue) {
      setPageSizeValue(size);
    }
  };
  return {
    startItem,
    handlePageChange,
    handlePageSizeChange,
    pageNumber,
    pageSizeValue,
  };
};
