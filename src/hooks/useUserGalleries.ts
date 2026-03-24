import { useEffect, useState } from "react";
import api from "../constant/apiclient";
import type {
  IUserGallery,
  IUserGalleryListResponse,
} from "../common/types/types";
export const useUserGalleries = (pageNumber = 1, pageSize = 30) => {
  const [data, setData] = useState<IUserGallery[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { data: json } = await api.get<IUserGalleryListResponse>("/gallery", {
          params: { pageNumber, pageSize },
          headers: { Accept: "application/json" },
        });
        if (!alive) return;
        setData(json.results || []);
        setTotal(json.pagination?.total || 0);
        setPages(json.pagination?.totalPages || 1);
      } catch (e: any) {
        if (alive) setError(e?.message || "Failed to load galleries");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [pageNumber, pageSize]);
  return { data, total, pages, loading, error };
};
