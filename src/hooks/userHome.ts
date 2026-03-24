// src/hooks/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";

export interface SubCategory {
  SubCategory: string;
  FileURL?: string;
}

export interface Category {
  Category: string;
  FileURL: string;
  SubCategories?: SubCategory[];
}

export interface CategoryApiResponse {
  success: boolean;
  data: Category[];
}

export const useCategories = () => {
  return useQuery<CategoryApiResponse>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await apiClient.get<CategoryApiResponse>(
        "/category-fileurl"
      );
      return data;
    },
  });
};
