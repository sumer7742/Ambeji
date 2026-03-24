// src/components/Wishlist.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";
import WishlistButton from "../screens/WishlistButton";


// ---- Define backend response types ----
interface Rating {
  average: number;
  count: number;
}

interface Size {
  sizeName: string;
  size: string;
  stock: number;
  sku: string;
  original_price: number;
  sell_price: number;
  isActive: boolean;
  highlights: string[];
  attributes: { name: string; value: string }[];
  _id: string;
}

interface Variant {
  _id: string;
  product_id: string;
  color: string;
  colorCode: string;
  sizes: Size[];
  images: string[];
  isActive: boolean;
  sell_price?: number;
  original_price?: number;
  highlights?: string[];
}

interface Product {
  _id: string;
  name: string;
  images: string[];
  brand?: { name?: string };
  ratings?: Rating;
  isWishlist?: boolean;
  description?: string;
}

export interface WishlistItemAPI {
  _id: string;
  productId: Product;
  variantId: Variant;
  createdAt: string;
  updatedAt: string;
}

// --------------------------------------

const Wishlist: React.FC = () => {
  const { data: wishlist = [], isLoading, isError } = useWishlist();

  if (isLoading) return <p className="p-4">Loading wishlist...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load wishlist.</p>;
  if (!wishlist.length) return <p className="p-4 text-gray-500">Your wishlist is empty.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {wishlist.map((item: WishlistItemAPI) => {
        const product = item.productId;
        const variant = item.variantId;

        // Use backend-provided data
        const img = variant?.images?.[0] || product?.images?.[0] || "";
        const highlights = variant?.highlights ?? [];

        const detailPath = `/product/detail/${product._id}?variant=${variant?._id}`;

        return (
          <div
            key={item._id}
            className="border rounded-lg shadow-sm hover:shadow-md p-3 relative"
          >
            {/* Wishlist toggle */}
            <WishlistButton
  productId={product._id}
  variantId={variant?._id}
  isInWishlist={!!product.isWishlist} // <-- force boolean
/>


            {/* Product link */}
            <Link to={detailPath} className="block">
              {img ? (
                <img
                  src={img}
                  alt={product.name}
                  className="w-full h-40 object-contain rounded-md"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md text-gray-500 text-sm">
                  No Image
                </div>
              )}

              <h3 className="text-sm font-semibold mt-2 truncate">
                {product.name}
              </h3>

              <div className="flex items-center space-x-2 text-sm mt-1">
                <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded-sm font-semibold">
                  <span>{product.ratings?.average?.toFixed(1) ?? "0.0"}</span>
                  <span className="material-symbols-outlined text-xs ml-1">
                    star
                  </span>
                </div>
                <span className="text-gray-500 font-medium">
                  {product.ratings?.count ?? 0} Ratings
                </span>
              </div>

              {highlights?.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-gray-700 text-sm space-y-1">
                  {highlights.slice(0, 3).map((h: string, i: number) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Wishlist;
