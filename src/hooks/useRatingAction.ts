// src/hooks/useRatingAction.ts
import type { RatingResponse } from "../common/types/types";
import apiClient from "../constant/apiclient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Payload types (already good)
export type AddRatingPayload = {
    productId: string;
    rating: number;
    title?: string;
    description?: string;
    images?: string[];
};

export type UpdateRatingPayload = {
    ratingId: string;
    data: {
        rating?: number;
        title?: string;
        description?: string;
        images?: string[];
    };
};

interface RatingsParams {
    productId?: string;
}

// ---- API calls ----
const postAddRating = async (payload: AddRatingPayload) => {
    const res = await apiClient.post(`/add-rating`, payload);
    return res.data;
};

const putUpdateRating = async (
    ratingId: string,
    data: UpdateRatingPayload["data"]
) => {
    const res = await apiClient.put(`/rating/${ratingId}`, data);
    return res.data;
};

const postLikeRating = async (ratingId: string) => {
    const res = await apiClient.post(`/like/${ratingId}`);
    return res.data;
};
const fetchRatingsByProduct = async (
    { productId, ...rem }: RatingsParams
): Promise<RatingResponse> => {
    const res = await apiClient.get(`/rating-list/${productId}`, rem);
    return res.data as RatingResponse;
};
// ---------------- QUERIES ----------------
export function useRatingsByProduct({ productId = '' }: RatingsParams) {
    const params: RatingsParams = {
        ...(productId && { productId }),
    };

    return useQuery<RatingResponse, Error>({
        queryKey: ["ratings", params],
        queryFn: () => fetchRatingsByProduct(params),
        enabled: !!params?.productId,
    });
}

// ---- Hooks (mutations) ----
export function useAddRatingAction() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: AddRatingPayload) => postAddRating(payload),
        onSuccess: (_data, variables) => {
            qc.invalidateQueries({ queryKey: ["ratings", {productId:variables.productId}] });
            qc.invalidateQueries({ queryKey: ["product", variables.productId] });
        },
    });
}

export function useUpdateRatingAction() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ ratingId, data }: UpdateRatingPayload) => putUpdateRating(ratingId, data),
        onSuccess: (_data, variables) => {
            qc.invalidateQueries({ queryKey: ["rating", variables.ratingId] });
            qc.invalidateQueries({ predicate: (q) => q.queryKey[0] === "ratings", });
        },
    });
}

export function useLikeRatingAction(productId?: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (ratingId: string) => postLikeRating(ratingId),
        onSuccess: (res, ratingId) => {
            const updatedRating = res._doc ?? res;
           qc.setQueryData<RatingResponse>(["ratings", { productId }], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          ratings: oldData.ratings.map((r) =>
            r._id === ratingId
              ? {
                  ...r,
                  likes: updatedRating.likes ?? r.likes,
                  likes_by: updatedRating.likes_by ?? r.likes_by,
                }
              : r
          ),
        };
      });
    },
    });
}

