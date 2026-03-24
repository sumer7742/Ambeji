import React, { useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import LoadingOverlay from "./Loading";
import NoDataFound from "../screens/NotDataFound";
import PaginationSelector from "../constant/PaginationSelecctor";
import PageHeadline from "../screens/PageHeadline";
import { usePagination } from "../hooks/usePagination";
import { useUserGalleries } from "../hooks/useUserGalleries";
import GalleryItem from "./GalleryItem";

const getImage = (g: any) => {
  if (Array.isArray(g.images) && g.images.length > 0) {
    return g.images[0];
  }
  return "/no-image.png";
};

const Gallery: React.FC = () => {
  const {
    pageNumber,
    pageSizeValue,
    handlePageChange,
    handlePageSizeChange,
  } = usePagination();

  const { data, total, loading, error } = useUserGalleries(
    pageNumber,
    pageSizeValue
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleView = (g: any) => {
    setSelectedImage(getImage(g));
  };

  const closeModal = () => setSelectedImage(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Sticky Header */}
        <div className="sticky top-20 sm:top-22 md:top-28 z-30 -mx-3 sm:-mx-6 lg:-mx-8 px-3 sm:px-6 lg:px-8 bg-gray-50/90 backdrop-blur supports-[backdrop-filter]:bg-gray-50/70 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3">
            <PageHeadline title="Gallery" />
          </div>
        </div>

        <div className="h-4" />

        {loading ? (
          <LoadingOverlay isNotFixed={true} h="h-[60vh]" />
        ) : error ? (
          <div className="p-4 border rounded-xl bg-red-50 text-red-700">
            {error}
          </div>
        ) : !data || data.length === 0 ? (
          <NoDataFound />
        ) : (
          <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((g: any) => (
                <div
                  key={g._id}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer"
                >
                  <GalleryItem item={g} />

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {g.description || "No description"}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <ImageIcon className="w-4 h-4" />
                        <span>{g.images?.length || 1} Photo</span>
                      </div>

                      <button
                        onClick={() => handleView(g)}
                        className="text-sm font-medium text-gray-900 hover:underline"
                      >
                        View →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <PaginationSelector
                handlePageChange={handlePageChange}
                handlePageSizeChange={handlePageSizeChange}
                currentPage={pageNumber}
                pageSize={pageSizeValue}
                totalCount={total}
              />
            </div>
          </>
        )}
      </div>

      {/* 🔥 FULL SCREEN IMAGE MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 bg-black/70 text-white p-2 rounded-full hover:bg-black"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Fullscreen Image */}
          <img
            src={selectedImage}
            alt="Full view"
            className="w-full h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
