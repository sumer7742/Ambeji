import { useQuery } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";

const fetchBudgetItems = async () => {
  const res = await apiClient.get("/budget");
  return res.data.data;
};

export const useBudgetItems = () => {
  return useQuery({
    queryKey: ["budgetItems"],
    queryFn: fetchBudgetItems,
  });
};
