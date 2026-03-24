import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";
import type {
  OrderResponse,
  UseOrderStatusResponse,
} from "../common/types/types";

/* =========================
   CREATE ORDER
========================= */

export interface OrderItemPayload {
  product: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ShippingAddressPayload {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface CreateOrderPayload {
  items: OrderItemPayload[];
  totalAmount: number;
  shippingAddress: ShippingAddressPayload;
  paymentMethod: string;
}

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (orderData: CreateOrderPayload) => {
      const { data } = await apiClient.post("create-order", orderData);
      return data;
    },
  });
};

/* =========================
   ORDER STATUS
========================= */

interface UseOrderParams {
  orderId: string;
  item_id?: string;
  orderStatus? : string;
}

/* API call */
const fetchOrder = ({
  orderId,
  item_id,
}: UseOrderParams): Promise<UseOrderStatusResponse> =>
  apiClient
    .get<UseOrderStatusResponse>(`/order-status/${orderId}`, {
      params: item_id ? { item_id } : undefined,
    })
    .then((res) => res.data);

/* Hook */
export const useOrderStatus = ({
  orderId,
  item_id,
}: UseOrderParams) => {
  return useQuery<UseOrderStatusResponse, Error>({
    queryKey: ["orderStatus", orderId, item_id],
    queryFn: () => fetchOrder({ orderId, item_id }),
    enabled: !!orderId,
    retry: 1,
    refetchOnWindowFocus: false,

    // ✅ CORRECT refetchInterval SIGNATURE
    refetchInterval: (query) => {
      const data = query.state.data;

      if (!data?.result) return false;

      // ❌ NO polling for COD
      if (data.result.paymentMethod === "cod") {
        return false;
      }

      // ✅ Poll ONLY for online payment while pending
      if (data.result.paymentStatus === "Pending") {
        return 2000;
      }

      return false;
    },
  });
};


/* =========================
   ORDERS LIST
========================= */

export const useOrders = (pageNumber: number, pageSize: number) => {
  return useQuery<OrderResponse>({
    queryKey: ["orders", pageNumber, pageSize],
    queryFn: async () => {
      const { data } = await apiClient.get<OrderResponse>("/orders", {
        params: { pageNumber, pageSize },
      });
      return data;
    },
    staleTime: 0,
  });
};
