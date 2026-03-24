import apiClient from "../constant/apiclient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  BuyCoinPayload,
  EliteCoinResponse,
  EliteCoinTransaction,
} from "../common/types/types";

// -------------------- API CALLS --------------------

const fetchEliteCoins = async () => {
  const res = await apiClient.get("/elite-coins");
  return res.data;
};

const fetchEliteCoinHistory = async () => {
  const res = await apiClient.get("/elite-coins-list");
  return res.data;
};

const addEliteCoins = async (payload: BuyCoinPayload) => {
  const res = await apiClient.post("/add-elite-coins", payload);
  return res.data;
};

// -------------------- HOOKS --------------------

export const useEliteCoins = () => {
  return useQuery<EliteCoinResponse, Error>({
    queryKey: ["elite-coins"],
    queryFn: fetchEliteCoins,
  });
};

export const useEliteCoinHistory = () => {
  return useQuery<
    { results: EliteCoinTransaction[] },
    Error
  >({
    queryKey: ["elite-coins-history"],
    queryFn: fetchEliteCoinHistory,
  });
};

export const useAddEliteCoins = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { url: string; order: string },
    Error,
    BuyCoinPayload
  >({
    mutationFn: addEliteCoins,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elite-coins"] });
      queryClient.invalidateQueries({ queryKey: ["elite-coins-history"] });
    },
  });
};
