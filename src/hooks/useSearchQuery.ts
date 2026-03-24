export type SuggestionType =  "brand" | "category" | "subcategory" | "slug";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";
export interface ISuggestion {
  _id: string;
  name: string;
  type: SuggestionType;
}
export interface SearchResponse {
  results: ISuggestion[];
  success: boolean;
}
const fetchProductSearch = async (searchQuery: string): Promise<SearchResponse> => {
  const { data } = await apiClient.get<SearchResponse>(`/product-search`, { params: { searchQuery } });
  return data;
};
export const useProductSearch = (searchQuery: string) => {
  return useQuery({
    queryKey: ["productSearch", searchQuery],
    queryFn: () => fetchProductSearch(searchQuery),
    enabled: !!searchQuery,
  });
};
