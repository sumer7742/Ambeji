// src/hooks/useCarouselQuery.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";
import type { Carousel } from "../common/types/types";


export const useCarousels = () => {
  return useQuery<Carousel[], Error>({
    queryKey: ["carousels"],
    queryFn: async () => {
      const res = await apiClient.get("/carousel");
      return res.data.data as Carousel[];
    },
    staleTime: 1000 * 60, 
    refetchOnWindowFocus: false,
  });
};


export const useCreateCarousel = () => {
  const queryClient = useQueryClient();

  return useMutation<Carousel[], Error, FormData>({
    mutationFn: async (formData: FormData) => {
      const res = await apiClient.post("/carousel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data as Carousel[];
    },
    onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["carousels"] });
}

  });
};

export const useUpdateCarousel = () => {
  const queryClient = useQueryClient();

  return useMutation<Carousel, Error, { id: string; formData: FormData }>({
    mutationFn: async ({ id, formData }) => {
      const res = await apiClient.put(`/carousel/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data as Carousel;
    },
   onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["carousels"] });


    },
  });
};


export const useDeleteCarousel = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/carousel/${id}`);
    },
   onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["carousels"] });
}

  });
};
