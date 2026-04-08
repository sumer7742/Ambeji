import React, { useMemo } from "react";
import useModal from "../hooks/useModal";
import RatingModal from "../screens/RatingModal";
import { useProductDetailLogic } from "../hooks/useProductDetailLogic";
import { Link, useSearchParams } from "react-router-dom";
import ManufacturingDetails from "./ManufacturingDetails";
import Specifications from "./Specifications";
import RatingList from "../screens/RatingList";
import { useUser } from "../constant/UserProvider";
import { useRatingsByProduct } from "../hooks/useRatingAction";
import ProductList from "./Product";
import WishlistButton from "../screens/WishlistButton";

// import { Ambeji, assuredImg } from "../assets";
import NoDataFound from "../screens/NotDataFound";
import ProductDetailShimmer from "./shimmer/ProductDetailShimmer";

const ProductDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const variantId = searchParams.get("variant");
  const sizeId    = searchParams.get("size");
  const { user }  = useUser();

  const {
    product, isLoading, refetchProduct,
    selectedImg, setSelectedImg,
    zoom, setZoom, mousePos, handleMouseMove,
    selectedVariantId, selectedVariant, selectedSizeId,
    handleColorSelect, handleSizeSelect,
    handleAddtoCart, addIteamMutation, images,
  } = useProductDetailLogic(variantId, sizeId);

  const { openModal, closeModal, isModalOpen } = useModal();

  const { data: ratingData, isLoading: ratingsLoading, isError: ratingError } =
    useRatingsByProduct({ productId: product?._id || "" });

   const hasUserRated = ratingData?.ratings && ratingData?.ratings.length > 0;

  const { selectedPrice, originalPrice, discount } = useMemo(() => {
    const sz = selectedVariant?.sizes.find((s) => s._id === selectedSizeId);
    const selectedPrice  = sz?.sell_price     || 0;
    const originalPrice  = sz?.original_price || 0;
    const discount = originalPrice
      ? Math.round(((originalPrice - selectedPrice) / originalPrice) * 100)
      : 0;
    return { selectedPrice, originalPrice, discount };
  }, [selectedVariant, selectedSizeId]);

  if (isLoading)  return <ProductDetailShimmer />;
  if (!product)   return <NoDataFound message="Product Not Found" />;

  return (
    <div className="bg-[#f7f7f7] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">

        {/* ── Breadcrumb ── */}
        <nav className="text-xs text-[#888] flex flex-wrap items-center gap-1 mb-5">
          <Link to="/"        className="hover:text-[#dd3333] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/product" className="hover:text-[#dd3333] transition-colors">Products</Link>
          {product.category?.name && (
            <>
              <span>/</span>
              <Link to={`/product?category_id=${product.category._id}`} className="hover:text-[#dd3333] transition-colors">
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-[#1c1c1c] font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* ── LEFT: Images ── */}
          <div className="md:col-span-6 space-y-4 min-w-0">
            <div className="md:sticky md:top-24 md:self-start">

              {/* Mobile images */}
              <div className="md:hidden w-full overflow-x-auto flex gap-3 snap-x snap-mandatory">
                {images.map((img, i) => (
                  <div key={i} className="relative w-full flex-shrink-0 h-72">
                    <img
                      src={img}
                      alt={product.name}
                      className="w-full h-72 object-contain bg-white border border-[#e0e0e0] snap-center"
                    />
                    <WishlistButton
                      productId={product._id}
                      variantId={selectedVariantId}
                      isInWishlist={product.isInWishlist}
                      className="absolute top-2 right-2"
                    />
                  </div>
                ))}
              </div>
 
              {/* Desktop images */}
              <div className="hidden md:flex gap-3 min-w-0">
                {/* Thumbnails */}
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[70vh]">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImg(img)}
                      className={`w-16 h-16 border cursor-pointer transition-all shrink-0 ${
                        selectedImg === img
                          ? "border-[#dd3333] ring-1 ring-[#dd3333]"
                          : "border-[#e0e0e0] hover:border-[#dd3333]"
                      }`}
                    >
                      <img src={img} alt={`view ${i + 1}`} className="w-full h-full object-contain bg-white p-1" />
                    </div>
                  ))}
                </div>

                {/* Main image */}
                <div className="flex-1 flex flex-col gap-3">
                  <div className="relative overflow-hidden border border-[#e0e0e0] bg-white h-[55vh]">
                    {discount > 0 && (
                      <div className="absolute top-3 left-3 z-10 bg-[#dd3333] text-white text-xs font-bold px-2 py-0.5">
                        {discount}% OFF
                      </div>
                    )}
                    <WishlistButton
                      productId={product._id}
                      variantId={selectedVariantId}
                      isInWishlist={product.isInWishlist}
                      className="absolute top-3 right-3 z-20"
                    />
                    <img
                      onMouseEnter={() => setZoom(true)}
                      onMouseLeave={() => setZoom(false)}
                      onMouseMove={handleMouseMove}
                      src={selectedImg || images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain cursor-zoom-in"
                    />
                  </div>

                  {/* Desktop CTA */}
                  {selectedSizeId && selectedVariant && (
                    <div className="flex gap-3">
                      <button
                        disabled={addIteamMutation.isPending}
                        onClick={() => handleAddtoCart({ product_id: product._id, size_Id: selectedSizeId, variant_id: selectedVariantId, type: "through_cart" })}
                        className="flex-1 py-3 bg-[#f0c14b] hover:bg-[#e8b73a] text-[#111] font-semibold text-sm border border-[#a88734] transition disabled:opacity-60"
                      >
                        Add to Cart
                      </button>
                      <button
                        disabled={addIteamMutation.isPending}
                        onClick={() => handleAddtoCart({ product_id: product._id, size_Id: selectedSizeId, variant_id: selectedVariantId, type: "direct" })}
                        className="flex-1 py-3 bg-[#dd3333] hover:bg-[#bb2222] text-white font-semibold text-sm transition disabled:opacity-60"
                      >
                        Buy Now
                      </button>
                    </div>
                  )}
                </div>
              </div>

               <ManufacturingDetails
              manufacturingInfo={product.manufacturingInfo}
              attributes={product.attributes}
            />
            </div>
          </div>

          {/* ── RIGHT: Details ── */}
          <div className="md:col-span-6 flex flex-col gap-4 bg-white border border-[#e0e0e0] p-5">

            {/* Brand */}
            <p className="text-xs font-bold text-[#dd3333] uppercase tracking-widest">
              {product.brand?.name}
            </p>

            {/* Product Name */}
            <h1 className="text-xl sm:text-2xl font-bold text-[#1c1c1c] leading-snug">
              {product.name}
            </h1>

            {/* Assured + Category */}
            <div className="flex items-center gap-2 text-sm">
              {/* <img src={Ambeji} alt="Assured" className="w-4 h-4 object-contain mix-blend-multiply" />
              <span className="text-xs font-semibold text-[#dd3333]">Assured</span> */}
              {/* <span className="text-[#ccc]">|</span> */}
              <span className="text-xs text-[#888]">{product.category?.name}</span>
            </div>

            {/* Rating */}
            {product?.ratings?.average > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 bg-[#dd3333] text-white text-xs font-bold px-2 py-0.5">
                  <span>{product.ratings.average.toFixed(1)}</span>
                  <span className="material-symbols-outlined text-[11px]">star</span>
                </div>
                <span className="text-xs text-[#888]">{product.ratings.count} Ratings</span>
              </div>
            )}

            <div className="border-t border-[#e0e0e0]" />

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-bold text-[#1c1c1c]">
                ₹{selectedPrice.toLocaleString("en-IN")}
              </span>
              {originalPrice > selectedPrice && (
                <>
                  <span className="text-lg line-through text-[#aaa]">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="bg-[#fff0f0] text-[#dd3333] text-xs font-bold px-2 py-0.5 border border-[#dd3333]">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>
            {originalPrice > selectedPrice && (
              <p className="text-xs text-[#dd3333] font-semibold -mt-2">
                You save ₹{(originalPrice - selectedPrice).toLocaleString("en-IN")}
              </p>
            )}

            {/* Offers */}
            {product.offers?.length > 0 && (
              <div className="bg-[#f7f7f7] border border-[#e0e0e0] p-3">
                <h3 className="text-xs font-bold text-[#1c1c1c] uppercase tracking-wide mb-2">Available Offers</h3>
                <ul className="space-y-1.5">
                  {product.offers.slice(0, 3).map((offer, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#444]">
                      <span className="text-[#dd3333] font-bold shrink-0">✔</span>
                      {offer}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Highlights */}
            {/* Highlights */}
            {selectedVariant && selectedVariant.sizes.length > 0 && (
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {(selectedVariant.sizes[0].highlights || []).map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}

            {/* Color */}
            <div>
              <p className="text-sm font-semibold text-[#1c1c1c] mb-2">Colour</p>
              <div className="flex gap-2 flex-wrap">
                {product.productVariant.map((variant) => (
                  <button
                    key={variant._id}
                    onClick={() => handleColorSelect(variant._id)}
                    className={`px-4 py-1.5 text-sm border transition-all ${
                      selectedVariantId === variant._id
                        ? "border-[#dd3333] bg-[#fff0f0] text-[#dd3333] font-semibold"
                        : "border-[#e0e0e0] text-[#555] hover:border-[#dd3333]"
                    }`}
                  >
                    {variant.color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            {selectedVariant && (
              <div>
                <p className="text-sm font-semibold text-[#1c1c1c] mb-2">Size</p>
                <div className="flex gap-2 flex-wrap">
                  {selectedVariant.sizes.map((size) => {
                    const storage = size.attributes.find((a) => a.name === "Storage")?.value;
                    return (
                      <button
                        key={size._id}
                        onClick={() => handleSizeSelect(size._id)}
                        className={`px-4 py-1.5 text-sm border transition-all ${
                          selectedSizeId === size._id
                            ? "border-[#dd3333] bg-[#fff0f0] text-[#dd3333] font-semibold"
                            : "border-[#e0e0e0] text-[#555] hover:border-[#dd3333]"
                        }`}
                      >
                        {size.size}{storage && ` / ${storage}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Specs */}
            <Specifications
              attributes={product.attributes}
              productVariants={product.productVariant}
              selectedVariantId={selectedVariantId}
              selectedSizeId={selectedSizeId}
            />
            {/* <ManufacturingDetails
              manufacturingInfo={product.manufacturingInfo}
              attributes={product.attributes}
            /> */}

            {/* Rate button */}
            {user && !hasUserRated && (
              <button
                onClick={() => openModal({ isRating: true })}
                className="px-6 py-2.5 bg-[#1c1c1c] text-white text-sm font-semibold hover:bg-[#dd3333] transition-colors"
              >
                Rate this Product
              </button>
            )}

            <RatingList
              data={ratingData}
              isError={ratingError}
              isLoading={ratingsLoading}
              product_id={product._id}
            />
          </div>
        </div>

        {/* Zoom overlay */}
        {zoom && (
          <div className="fixed right-16 top-24 z-50 w-[520px] h-[420px] overflow-hidden border border-[#e0e0e0] bg-white shadow-xl">
            <img
              src={selectedImg || images[0]}
              alt="Zoomed"
              className="w-full h-full object-contain"
              style={{
                transform: `scale(2.2) translate(-${mousePos.x}%, -${mousePos.y}%)`,
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
              }}
            />
          </div>
        )}

        {/* Mobile sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e0e0e0] flex md:hidden gap-0 z-10">
          <button
            disabled={addIteamMutation.isPending}
            onClick={() => handleAddtoCart({ product_id: product._id, type: "through_cart", size_Id: selectedSizeId, variant_id: selectedVariantId })}
            className="flex-1 py-3.5 bg-[#f0c14b] hover:bg-[#e8b73a] text-[#111] font-semibold text-sm border-r border-[#a88734] transition disabled:opacity-60"
          >
            Add to Cart
          </button>
          <button
            disabled={addIteamMutation.isPending}
            onClick={() => handleAddtoCart({ product_id: product._id, type: "direct", size_Id: selectedSizeId, variant_id: selectedVariantId })}
            className="flex-1 py-3.5 bg-[#dd3333] hover:bg-[#bb2222] text-white font-semibold text-sm transition disabled:opacity-60"
          >
            Buy Now
          </button>
        </div>

        {/* Related + Recent */}
        <div className="mt-8 flex flex-col gap-6">
          <ProductList category={product.category?._id} title="Related Products" exclude={product._id} horizontal={true} />
          <ProductList horizontal={true} title="Recent View" productType="recent_look" />
        </div>

        <RatingModal
          show={isModalOpen?.isRating || false}
          handleClose={() => closeModal({ isRating: false })}
          isAdd
          productId={product._id}
          refetch={refetchProduct}
        />
      </div>
    </div>
  );
};

export default ProductDetail;