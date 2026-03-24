import {  useQuery } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";

export interface Travel {
    _id: string;
    name: string;
    image: string;
    category?: string;
}
const fetchTravels = async (category?:string ,search?:string) => {
    const {data} = await apiClient.get("/travel",{
        params: {category, search},
    });
    return data.data as string[];
};
export const useTravels = (Category?: string, search?: string) =>{
    return useQuery({
        queryKey:["travels", Category, search],
        queryFn: () => fetchTravels(Category ,search),
    });
};