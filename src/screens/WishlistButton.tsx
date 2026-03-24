// src/components/WishlistButton.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToggleWishlist } from "../hooks/useWishlist";
import { getToken } from "../utils/token";

interface WishlistButtonProps {
  productId: string;
  variantId?: string;
  isInWishlist: boolean;
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ productId, variantId, isInWishlist, className }) => {
  const [wishlist, setWishlist] = useState(isInWishlist);
  const toggleWishlist = useToggleWishlist();
  const navigate = useNavigate();

  // Sync state if prop changes
  useEffect(() => {
    setWishlist(isInWishlist);
  }, [isInWishlist]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!getToken()) return navigate("/login");

    // Optimistic toggle
    setWishlist((prev) => !prev);

    toggleWishlist.mutate({ productId, variantId });
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute top-2 right-2 text-2xl p-1 rounded-full ${
        wishlist ? "text-red-500" : "text-gray-400"
      } hover:scale-110 transition ${className || ""}`}
      aria-label="Toggle wishlist"
    >
      {wishlist ? "❤️" : "♡"}
    </button>
  );
};

export default WishlistButton;
