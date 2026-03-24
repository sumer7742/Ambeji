import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";
import { getToken } from "../utils/token";

export interface WishlistItemAPI {
  variantId: any;
  _id: string;
  userId: string;
  productId: any; // keep as-is from backend
  createdAt: string;
  updatedAt: string;
}

// ✅ Define the payload type
export interface WishlistPayload {
  productId: string;
  variantId?: string;
}

export const useWishlist = () => {
  return useQuery<WishlistItemAPI[]>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await apiClient.get<{ success: boolean; data: WishlistItemAPI[] }>("/wishlist");
      return data?.data || [];
    },
    enabled: !!getToken(),
  });
};

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, variantId }: WishlistPayload) => {
      const url = `/create-remove-wishlist/${productId}/${variantId || "null"}`;
      const { data } = await apiClient.post(url);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};
