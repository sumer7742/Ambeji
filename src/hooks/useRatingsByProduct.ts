import { useQuery } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";
import type { RatingResponse } from "../common/types/types";

const fetchRatingsByProduct = async (productId: string): Promise<RatingResponse> => {
  const res = await apiClient.get(`/rating-list/${productId}`);
  return res.data as RatingResponse;
};

export function useRatingsByProduct(productId: string | undefined) {
  return useQuery<RatingResponse, Error>({
    queryKey: ["ratings", productId],
    queryFn: () => fetchRatingsByProduct(productId!),
    enabled: !!productId,
  });
}
