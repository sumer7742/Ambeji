import { Link } from "react-router-dom";
import type { IProduct } from "../common/types/types";
import WishlistButton from "./WishlistButton";
// import { assuredImg } from "../assets";

interface ProductCardProps {
  product: IProduct;
  isFullDetail?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isFullDetail }) => {
  const img = product.variant?.images?.[0];

  const detailPath = `/product/detail/${product._id}?variant=${product.variant?._id}&size=${product.variant?.size?._id}`;

  const altText =
    product?.name?.length > 60
      ? `${product.name.slice(0, 57)}...`
      : product?.name;

  
  const sellPrice = Number(product?.variant?.size?.sell_price || 0);
  const originalPrice = Number(product?.variant?.size?.original_price || 0);

  const discountPercent =
    originalPrice > sellPrice
      ? Math.round(((originalPrice - sellPrice) / originalPrice) * 100)
      : 0;

  return (
    <div className="relative flex flex-col h-full border  border-white hover:border-gray-300 transition-all duration-300 overflow-hidden group">
      <div className="absolute top-2 right-2 z-10">
        <WishlistButton
          productId={product._id}
          variantId={product.variant?._id}
          isInWishlist={product.isInWishlist}
        />
      </div>

      <Link to={detailPath} className="flex flex-col flex-grow p-3 relative">

        
        {discountPercent > 0 && (
          <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {discountPercent}% OFF
          </div>
        )}

        {img ? (
          <img
            src={img}
            alt={altText}
            loading="lazy"
            className="w-full h-44 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-44 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400 text-sm">
            No Image
          </div>
        )}

        <div className="mt-3 flex flex-col flex-grow justify-between">

          <div className="flex items-center gap-3">
            
            {/* <div className="flex items-center gap-1 flex-col">
              <img
                src={assuredImg}
                alt="Assured Logo"
                className="w-5 h-5 object-contain mix-blend-multiply rounded-full"
              />
              <i className="text-xs font-medium text-red-600">Assured</i>
            </div> */}

          
            <div className="flex flex-col">
              <h3
                className="text-sm font-semibold text-gray-900 truncate max-w-[160px]"
                title={product?.name}
              >
                {product?.name}
              </h3>
              <p className="text-xs text-gray-500 font-medium truncate">
                {product?.brand?.name}
              </p>
            </div>
          </div>

          
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <p className="text-base font-bold text-gray-900">
                ₹ {sellPrice.toFixed(2)}
              </p>

              {discountPercent > 0 && (
                <p className="text-gray-400 text-xs line-through">
                  ₹ {originalPrice.toFixed(2)}
                </p>
              )}
            </div>

            {discountPercent > 0 && (
              <p className="text-xs text-red-600 font-medium mt-0.5">
                You save ₹ {(originalPrice - sellPrice).toFixed(2)}
              </p>
            )}
          </div>

          
          {product?.ratings?.average > 0 && (
            <div className="flex items-center space-x-2 text-sm mt-2">
              <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded-md font-semibold">
                <span>{product.ratings.average.toFixed(1)}</span>
                <span className="material-symbols-outlined text-xs ml-1">
                  star
                </span>
              </div>
              <span className="text-gray-500 font-medium">
                {product?.ratings?.count || 0} Ratings
              </span>
            </div>
          )}

          {isFullDetail && (
            <div className="mt-3 border-t border-gray-100 pt-2">
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-xs">
                {product?.variant?.size?.highlights?.map(
                  (highlight, index) => (
                    <li key={index} className="truncate" title={highlight}>
                      {highlight}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
