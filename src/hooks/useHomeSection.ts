import { useQuery } from "@tanstack/react-query";

import apiClient from "../constant/apiclient";

export interface SectionItem {
  name: string;
  img?: string;
  user?: string;
  comment?: string;
}

export interface HomeData {
  match: SectionItem[];
  school: SectionItem[];
  giftelegance: SectionItem[];
  testimonial: SectionItem[];
  occasion: SectionItem[];
  //budget: SectionItem[];
  travel: SectionItem[];
}

const fetchHomeData = async (): Promise<HomeData> => {
  const res = await apiClient.get("/api/home");
  return res.data;
};

export const useHomeSections = () => {
  return useQuery<HomeData>({
    queryKey: ["homeSections"],
    queryFn: fetchHomeData,
  });
};
