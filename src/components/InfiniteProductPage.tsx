import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProduct";
import ProductCard from "../screens/ProductCard";
import { usePagination } from "../hooks/usePagination";
import NoDataFound from "../screens/NotDataFound";
import type { IProduct, ProductProps } from "../common/types/types";
import PageHeadline from "../screens/PageHeadline";
import { useFilters } from "../hooks/useFilters";
import useModal from "../hooks/useModal";
import FilterModel from "../screens/FilterModel";
import SortModel from "../screens/SortModel";
import ButtonBar from "../screens/ButtonBar";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterSidebar, { SortOptions } from "./FilterSidebar";
import CarouselSelector from "../constant/CarsouelSelector";
import FilterSidebarShimmer from "./shimmer/FilterSidebarShimmer";
import ProductCardShimmer from "./shimmer/ProductCardShimmer";
const InfiniteModeProductList: React.FC<ProductProps> = ({
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
    const { openModal, closeModal, isModalOpen } = useModal()
    const { filters, setFilters, sorts, setSorts } = useFilters()
    const [items, setItems] = React.useState<{ items: IProduct[], hasMore: boolean }>({
        items: [],
        hasMore: true
    });

    const { handlePageChange, pageNumber, pageSizeValue } =
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
        productType: productType
    });
    const fetchMoreData = () => {
        if (isLoading) return;
        if (!data?.pagination?.next) {
            setItems(prev => ({ ...prev, hasMore: false }));
            return;
        }

        handlePageChange(pageNumber + 1, data.pagination.totalPages);
    };

    useEffect(() => {
        if (!data?.results) return;

        setItems(prev => ({
            items:
                pageNumber === 1
                    ? data.results
                    : [...prev.items, ...data.results],
            hasMore: Boolean(data.pagination?.next),
        }));
    }, [data?.results, pageNumber]);



    useEffect(() => {
        handlePageChange(1, 1);
    }, [filters, category_params, subcategory_params, brand_params]);


    const showLayout = isError || ((items.items.length ?? 0) < 1 && !productType);
    return (
        <div className={`${!horizontal && 'min-h-screen'} bg-white relative`}
            key={[
                category_params || "",
                subcategory_params || "",
                brand_params || ""
            ].join("-")}
        >
            <div className="mx-auto sm:px-8 py-2 grid grid-cols-1 md:grid-cols-4 gap-6 w-full h-auto">
                {showFilters && (
                    <aside className="hidden md:flex md:flex-col md:col-span-1 md:sticky md:bottom-36 space-y-4 self-start">
                        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col space-y-4">
                            {isLoading && items.items.length === 0 ? (
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
                    {isLoading && items.items.length === 0 ? (
                        <div
                            className={
                                horizontal
                                    ? "flex space-x-4 pb-2"
                                    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
                            }
                        >
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className={horizontal ? "w-[300px] flex-shrink-0" : ""}>
                                    <ProductCardShimmer isFullDetail={isFullDetail} />
                                </div>
                            ))}
                        </div>
                    ) : showLayout ? (
                        <NoDataFound />
                    ) : items?.items && items.items.length > 0 && (
                        <main
                            className={`col-span-1 ${showFilters ? "md:col-span-3" : "md:col-span-4"
                                }`}
                        >
                            {title && horizontal && <PageHeadline title={title} component={productType ? <></> : <ButtonBar buttons={[
                                {
                                    label: "View All",
                                    onClick: () => {
                                        const query = [
                                            category ? `category=${category}` : "",
                                            exclude ? `exclude=${exclude}` : ""
                                        ].filter(Boolean).join("&");

                                        navigate(`/product${query ? `?${query}` : ""}`);
                                    },
                                    colorClass: "bg-blue-600 text-white hover:bg-blue-700",
                                },
                            ]} />} />}
                            <InfiniteScroll
                                dataLength={items.items.length}
                                next={fetchMoreData}
                                hasMore={items.hasMore}
                                scrollThreshold={0.5}
                                loader={
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <ProductCardShimmer key={i} isFullDetail={isFullDetail} />
                                        ))}
                                    </div>
                                }
                            >

                                <ProductBody
                                    data={items.items}
                                    horizontal={horizontal}
                                    isFullDetail={isFullDetail}
                                />
                            </InfiniteScroll>
                            {
                                data?.pagination && pageNumber % 10 === 0 && <CarouselSelector
                                    handlePageChange={handlePageChange}
                                    currentPage={pageNumber / 10}
                                    totalCount={data?.pagination.total / 10}
                                    pageSize={pageSizeValue}

                                />
                            }

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
export default InfiniteModeProductList;
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
                    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6"
            }
        >
            {data.map((e) => (
                <div
                    key={e._id}
                    className={horizontal ? "w-[300px] flex-shrink-0" : ""}
                >
                    <ProductCard product={e} isFullDetail={isFullDetail} />
                </div>
            ))}
        </div>
    );
};
