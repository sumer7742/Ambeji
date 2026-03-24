// hooks/useFilters.ts
import { useQuery } from '@tanstack/react-query';
import apiClient from '../constant/apiclient';
import type { AxiosError } from 'axios';
interface FilterItem {
    _id?: string;
    name: string;
};
interface FilterData {
    name: string;
    value: FilterItem[];
    queryName: string
};
interface FilterResponse {
    results: FilterData[]
}
interface FilterQueryParams {
    subcategory?: string
    category?: string
    brand?: string;
    slug?: string;
}
const fetchFilter = async (params: FilterQueryParams): Promise<FilterResponse> => {
    const { data } = await apiClient.get('/filters', { params });
    return data;
};
export const useFilter = ({ category = "", subcategory = "", brand = "", slug = "" }: FilterQueryParams) => {
    const params: FilterQueryParams = {
        ...category && { category },
        ...subcategory && { subcategory },
        ...brand && { brand },
        ...(slug && { slug })
    };
    return useQuery<FilterResponse, AxiosError>({
        queryKey: ['filters', params],
        queryFn: () => fetchFilter(params),
        staleTime: 5 * 60 * 1000,
    });
};
