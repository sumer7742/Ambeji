// src/hooks/useCart.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";
import type { Pagination } from "../common/types/types";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { handleApiHookResponse } from "../common/utils/queryToast";
import { getToken } from "../utils/token";
export interface addCart {
  product_id: string, type: "through_cart" | "direct";
  size_Id:string,
  variant_id:string;
}
export interface CartResponse {
  success: boolean;
  data: CartItem;
}
export interface CartProduct {
  _id: string;
  name: string;
  inStock: boolean;
  stock: number;
  images?: string;
  total_original_price: number;
  total_sell_price: number;
  brand?: string
}
export interface CartItem {
  _id: string;
  user_id: string;
  product_id: CartProduct;
  quantity: number;
  type: "through_cart" | "direct";
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface TotalCarts {
  total_original_price: number;
  total_quantity: number;
  total_sell_price: number;
}

export interface CartListResponse {
  success: boolean;
  results: CartItem[];
  total_carts: TotalCarts;
  pagination: Pagination;
}
interface UseCartParams {
  cart_id?: string;
  type: "through_cart" | "direct";
}
const fetchCart = async (params: UseCartParams): Promise<CartListResponse> => {
  const res = await apiClient.get(`/cart-items`, {
    params,
  });
  return res.data || [];
};
export const useCart = ({ cart_id = "", type = "through_cart" }: UseCartParams) => {
  const params = {
    ...(cart_id && { cart_id }),
    type,
  };
  return useQuery<CartListResponse, AxiosError>({
    queryKey: ["cart", params],
    queryFn: () => fetchCart(params),
    enabled: !!getToken()
  });
};
export const addToCart = async (payload: addCart) => {
  const response = await apiClient.post("/add-to-cart", payload);
  return response.data;
};

export const useCartActions = () => {
  const queryClient = useQueryClient();
  const updateQuantity = useMutation({
    mutationFn: (payload: { cartId: string; quantity: number }) =>
      apiClient.put("/cart-update", { ...payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart",] });
    },
  });
  const addOrUpdateItem = useMutation<CartResponse, Error, addCart>({
    mutationFn: addToCart,
  });
  const removeItem = useMutation({
    mutationFn: (cartId: string) =>
      apiClient.delete(`/cart-delete/${cartId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return {
    updateQuantity: updateQuantity,
    addIteamMutation: addOrUpdateItem,
    removeItem: removeItem,
  };
};
export const useCardActionFunction = (refech: () => void) => {
  const { updateQuantity, removeItem } = useCartActions();
  const handleIncrease = (item: CartItem) => {
    if (item.quantity < (item.product_id as CartProduct).stock) {
      return updateQuantity.mutate({
        cartId: item._id,
        quantity: item.quantity + 1,
      }, handleApiHookResponse(refech));
    }
    toast.error("Out Of Stock")
  };
  const handleDecrease = (item: CartItem) => {
    if (item.quantity > 1) {
      return updateQuantity.mutate({
        cartId: item._id,
        quantity: item.quantity - 1,
      }, handleApiHookResponse(refech));
    }
    toast.error("Out Of Stock")
  };
  const handleRemove = (item: CartItem) => {
    return removeItem.mutate(item._id, handleApiHookResponse(refech));
  };
  return { handleRemove, handleIncrease, handleDecrease, isPending: updateQuantity.isPending || removeItem.isPending }
}