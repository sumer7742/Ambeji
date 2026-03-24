// hooks/useNavbar.ts
import { useQuery } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";
// types/navbar.ts
export interface NavbarChild {
    name: string;
    path: string;
    image:string;
}

export interface NavbarItem {
    name: string;
    path: string;
    image:string;
    children: NavbarChild[];
}

export interface NavbarResponse {
    success: boolean;
    results: NavbarItem[];
}
const fetchNavbar = async (): Promise<NavbarResponse> => apiClient.get("/navbar").then(res => res.data)
export const useNavbar = () => {
    return useQuery<NavbarResponse>({
        queryKey: ["navbar"],
        queryFn: fetchNavbar,
        staleTime: 5 * 60 * 1000, // cache 5 min
        refetchOnWindowFocus: false,
    });
};
