import { useQuery } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";
export interface Gift {
  _id: string;
  name: string;
  image: string;
  hoverImage: string;
}

const fetchGifts = async (): Promise<Gift[]> => {
  const res = await apiClient.get("/gift");
  return res.data.data;
};

export const useGift = () => {
  return useQuery<Gift[], Error>({
    queryKey: ["giftElegance"],
    queryFn: fetchGifts,
  });
};
