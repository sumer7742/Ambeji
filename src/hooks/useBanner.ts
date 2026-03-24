import { useQuery } from "@tanstack/react-query";
export interface BannerItem {
  name: string;
  image: string;
}

export const useBanners = () => {
  return useQuery<BannerItem[]>({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await fetch("/banners");
      if (!res.ok) throw new Error("Failed to fetch banners");
      return res.json();
    },
  });
};
