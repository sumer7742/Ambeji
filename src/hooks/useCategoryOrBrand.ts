// src/hooks/useMeta.ts
import { useQuery } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";
import type { Brand, Category, Pagination } from "../common/types/types";
export interface CategoryResponse {
  success: boolean;
  results: Category[];
  pagination: Pagination;
}
export interface BrandResponse {
  success: boolean;
  results: Brand[];
  pagination: Pagination;
}
const fetchCategories = async (): Promise<CategoryResponse> => {
  const { data } = await apiClient.get<CategoryResponse>("/get-categories");
  return data;
};

// fetch brands
const fetchBrands = async (): Promise<BrandResponse> => {
  const { data } = await apiClient.get<BrandResponse>("/get-brands");
  return data;
};

export const useCategories = () => {
  return useQuery<CategoryResponse, Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });
};

export const useBrands = () => {
  return useQuery<BrandResponse, Error>({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    staleTime: 1000 * 60 * 5,
  });
};
