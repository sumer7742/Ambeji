// src/hooks/usePincode.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// API response type (you can adjust if needed)
export interface PostOffice {
  Name: string;
  Description: string | null;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
}

export interface PincodeResponse {
  Message: string;
  Status: string;
  PostOffice: PostOffice[];
}
const fetchPincodeData = async (pincode: string): Promise<PincodeResponse[]> => {
  const response = await axios.get<PincodeResponse[]>(
    `https://api.postalpincode.in/pincode/${pincode}`
  );
  return response.data;
};
export const usePincode = (pincode: string) => {
  return useQuery<PincodeResponse[], Error>({
    queryKey: ["pincodeData", pincode],
    queryFn: () => fetchPincodeData(pincode),
    enabled: !!(pincode.length === 6),
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};
