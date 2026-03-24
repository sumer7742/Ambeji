import { useQuery } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";
import { getToken } from "../utils/token";
const adminDetailsApi = async (): Promise<any> =>
    apiClient
        .get("/details",)
        .then((res) => res.data);;
export const useAdminDetails = () => {
    return useQuery({
        queryKey: ["admin-details"],
        queryFn: adminDetailsApi,
        enabled: !!getToken(),
    });
};
