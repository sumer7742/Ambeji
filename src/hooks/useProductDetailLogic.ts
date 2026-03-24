import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductDetail } from "./useProduct";
import {
  useCart,
  useCartActions,
  type addCart,
  type CartResponse,
} from "./useCart";
import { getToken } from "../utils/token";
import toast from "react-hot-toast";

export const useProductDetailLogic = (
  variantId?: string | null,
  sizeId?: string | null
) => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, refetch: refetchProduct } = useProductDetail(String(_id));
  const { addIteamMutation } = useCartActions();
  const { refetch } = useCart({ type: "through_cart" });

  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [zoom, setZoom] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const product = data;
  const variants = product?.productVariant ?? [];

  const [selectedVariantId, setSelectedVariantId] = useState<string>(variantId || "");
  const [selectedSizeId, setSelectedSizeId] = useState<string>(sizeId || "");
  useEffect(() => {
    if (variants.length > 0 || variantId) {
      setSelectedVariantId(variantId || variants[0]._id);
    }
  }, [variants, variantId]);

  const selectedVariant = useMemo(
    () => variants.find((v) => v._id === selectedVariantId),
    [selectedVariantId, variants, variantId]
  );

  // ✅ Initialize sizeId based on selected variant
  useEffect(() => {
    if (selectedVariant) {
      const availableSizes = selectedVariant.sizes || [];
      if (!selectedSizeId) {
        setSelectedSizeId(sizeId || (availableSizes[0]?._id ?? ""));
      } else if (
        availableSizes.length > 0 &&
        !availableSizes.some((s) => s._id === selectedSizeId)
      ) {
        setSelectedSizeId(availableSizes[0]?._id ?? "");
      }
    }
  }, [selectedVariant, sizeId]);
  const handleColorSelect = (variantId: string) => {
    setSelectedVariantId(variantId);
    const variant = variants.find((v) => v._id === variantId);

    // Reset size for new variant
    if (variant?.sizes?.length) {
      setSelectedSizeId(variant.sizes[0]._id);
    } else {
      setSelectedSizeId("");
    }

    // Reset image
    if (variant?.images?.length) {
      setSelectedImg(variant.images[0]);
    }
  };

  // ✅ Size selection
  const handleSizeSelect = (sizeId: string) => {
    setSelectedSizeId(sizeId);
  };

  // ✅ Zoom movement
  const handleMouseMove = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100 - 20;
    const y = ((e.clientY - top) / height) * 100 - 20;
    setMousePos({ x, y });
  };

  // ✅ Add to cart
  const handleAddtoCart = (data: addCart) => {
    if (!getToken()) {
      navigate("/login");
      return;
    }
    addIteamMutation.mutate(data, {
      onSuccess: (response: CartResponse) => {
        refetch();
        const { data } = response;
        if (data.type === "direct") {
          navigate(`/checkout?cart_id=${data._id}&&type=direct`);
          return;
        }
        toast.success("Item added to cart!");
      },
      onError: () => {
        toast.error("Failed to add item to cart.");
      },
    });
  };

  // ✅ Image selection
  const images =
    selectedVariant?.images?.length
      ? selectedVariant.images
      : product?.images || ["/placeholder.png"];

  return {
    product,
    isLoading,
    refetchProduct,
    selectedImg,
    setSelectedImg,
    zoom,
    setZoom,
    mousePos,
    handleMouseMove,
    selectedVariantId,
    selectedVariant,
    selectedSizeId,
    handleColorSelect,
    handleSizeSelect,
    handleAddtoCart,
    addIteamMutation,
    images,
  };
};
