import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProduct";
import ProductCard from "../screens/ProductCard";
import PaginationSelector from "../constant/PaginationSelecctor";
import { usePagination } from "../hooks/usePagination";
import NoDataFound from "../screens/NotDataFound";
import type { IProduct, ProductProps } from "../common/types/types";
import PageHeadline from "../screens/PageHeadline";
import { useFilters } from "../hooks/useFilters";
import useModal from "../hooks/useModal";
import FilterModel from "../screens/FilterModel";
import SortModel from "../screens/SortModel";
import FilterSidebar, { SortOptions } from "./FilterSidebar";
import ButtonBar from "../screens/ButtonBar";
import CarouselSelector from "../constant/CarsouelSelector";
import FilterSidebarShimmer from "./shimmer/FilterSidebarShimmer";
import ProductCardShimmer from "./shimmer/ProductCardShimmer";

const ProductList: React.FC<ProductProps> = ({
  category,
  subcategory,
  title,
  horizontal = false,
  brand,
  showFilters = false,
  isFullDetail = false,
  exclude,
  productType
}) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const category_params = searchParams.get("category");
  const subcategory_params = searchParams.get("subcategory");
  const productSlug = searchParams.get("slug");
  const brand_params = searchParams.get("brand");
  const exclude_params = searchParams.get("exclude");
  const offer_param = searchParams.get("offer");

  const { openModal, closeModal, isModalOpen } = useModal()
  const { filters, setFilters, sorts, setSorts } = useFilters()
  const { handlePageChange, handlePageSizeChange, pageNumber, pageSizeValue } =
    usePagination();
  const { data, isLoading, isError } = useProducts({
    category: category_params ? category_params : category,
    subcategory: subcategory_params ? subcategory_params : subcategory,
    brand: brand_params ? brand_params : brand,
    pageNumber,
    pageSize: pageSizeValue,
    ...filters,
    slug: productSlug ? String(productSlug) : undefined,
    sort: sorts,
    exclude: exclude_params ? exclude_params : exclude,
    productType: productType,
    offer: offer_param || undefined,
  });
  useEffect(() => {
  window.scrollTo(0, 0);
}, [filters, pageNumber]);
  const showLayout = isError || ((data?.results?.length ?? 0) < 1 && !productType);
  return (
    <div className={`${!horizontal && 'min-h-screen'} bg-white relative`}
      key={[
        category_params || "",
        subcategory_params || "",
        brand_params || ""
      ].join("-")}
    >
      <div className={
        showFilters
          ? "mx-auto sm:px-8 py-2 w-full h-auto md:flex md:gap-6"
          : "mx-auto sm:px-8 py-2 grid grid-cols-1 md:grid-cols-4 gap-6 w-full h-auto"
      }>
        {showFilters && (
          <aside className="hidden md:flex md:flex-col w-[260px] xl:w-[300px] md:sticky md:top-20 lg:top-32 space-y-4 self-start">
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <FilterSidebarShimmer />
                  <div className="h-5 w-24 bg-gray-200 rounded shimmer" />
                </>
              ) : (
                <>
                  <FilterSidebar
                    filters={filters}
                    setFilters={setFilters}
                    category={category_params || category}
                    subcategory={subcategory_params || subcategory}
                    brand={brand_params || brand}
                    slug={productSlug || ""}
                  />
                  <SortOptions sort={sorts} setSort={setSorts} />
                </>
              )}
            </div>
          </aside>
        )}

        <div className={showFilters ? "md:col-span-3" : "md:col-span-4"}>
          {isLoading ? (
            <div
              className={
                horizontal
                  ? "flex space-x-4 pb-2"
                  : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
              }
            >

              {Array.from({ length: horizontal ? 4 : 8 }).map((_, index) => (
                <div
                  key={index}
                  className={horizontal ? "w-[300px] flex-shrink-0" : ""}
                >
                  <ProductCardShimmer isFullDetail={isFullDetail} />
                </div>
              ))}

            </div>
          ) : showLayout ? (
            <NoDataFound />
          ) : (
            <main
              className={`col-span-1 ${showFilters ? "md:col-span-3" : "md:col-span-4"
                }`}
            >
              {/* existing code stays same */}
              {title && horizontal && (
                <PageHeadline
                  title={title}
                  component={
                    productType ? null : (
                      <ButtonBar
                        buttons={[
                          {
                            label: "View All",
                            onClick: () => {
                              const query = [
                                category ? `category=${category}` : "",
                                exclude ? `exclude=${exclude}` : "",
                              ]
                                .filter(Boolean)
                                .join("&");

                              navigate(`/product${query ? `?${query}` : ""}`);
                            },
                            colorClass:
                              "bg-blue-600 text-white hover:bg-blue-700",
                          },
                        ]}
                      />
                    )
                  }
                />
              )}

              <ProductBody
                data={data?.results || []}
                horizontal={horizontal}
                isFullDetail={isFullDetail}
              />

              {!horizontal ? (
                <PaginationSelector
                  handlePageChange={handlePageChange}
                  handlePageSizeChange={handlePageSizeChange}
                  currentPage={pageNumber}
                  pageSize={pageSizeValue}
                  totalCount={data?.pagination?.total || 0}
                />
              ) : (
                <CarouselSelector
                  handlePageChange={handlePageChange}
                  currentPage={pageNumber}
                  pageSize={pageSizeValue}
                  totalCount={data?.pagination?.total || 0}
                />
              )}
            </main>
          )}

        </div>
      </div>
      {showFilters && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200 flex justify-between items-center px-4 py-3">
          <>
            <button
              className="flex-1 mr-2 bg-gray-100 text-gray-800 font-semibold py-2 rounded-md flex items-center justify-center gap-1"
              onClick={() => openModal({ isSort: true })}
            >
              <span className="material-symbols-outlined">sort</span> Sort
            </button>
            <button
              className="flex-1 bg-gray-100 text-gray-800 font-semibold py-2 rounded-md flex items-center justify-center gap-1"
              onClick={() => openModal({ isFilter: true }, {})}
            >
              <span className="material-symbols-outlined">filter_list</span> Filter
            </button>
          </>
        </div>
      )}
      <FilterModel show={isModalOpen?.isFilter || false} handleClose={() => { closeModal({ isFilter: false }) }} filters={filters} setFilters={setFilters} category={category_params ? category_params : category}
        subcategory={subcategory_params ? subcategory_params : subcategory} key={isModalOpen?.isFilter + ""} brand={brand_params ? brand_params : brand}
        slug={productSlug ? productSlug : ""} />
      <SortModel show={isModalOpen.isSort || false} setSort={setSorts} sort={sorts} handleClose={() => closeModal({ isSort: false })} />
    </div >
  );
};
export default ProductList;
interface ProductBodyProps {
  data: IProduct[];
  horizontal?: boolean;
  isFullDetail?: boolean;
}
const ProductBody: React.FC<ProductBodyProps> = ({
  data,
  horizontal = false,
  isFullDetail = false
}) => {
  return (
    <div
      className={
        horizontal
          ? "flex custom-scroll space-x-4 pb-2"
          : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
      }
    >
      {data.map((e) => (
        <div
          key={e?._id}
          className={horizontal ? "w-[300px] flex-shrink-0" : ""}
        >
          <ProductCard product={e} isFullDetail={isFullDetail} />
        </div>
      ))}

    </div>
  );
};
