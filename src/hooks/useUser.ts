import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "../constant/apiclient";

export type RegisterPayload = {
  fullName: string;
  email?: string;
  mobile?: string;
};

export type VerifyPayload = {
  id: string;
  otp: string;
  password: string;
  confirmPassword : string;
};

export type LoginPayload = {
  email?: string;
  mobile?: string;
  password: string;
};


interface RequestOtpPayload {
  email?: string;
  mobile?: string;
}

interface RequestOtpResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    mobile: string;
    otp?: string;
  };
}

type LoginRequest = {
  data?: LoginPayload; 
  headers?: Record<string, string>; 
};
type RegisterRequest = {
  data?: RegisterPayload;
  headers?: Record<string, string>;
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async ({ data, headers }: RegisterRequest) => {
      const res = await apiClient.post("/register", data ?? {}, {
        headers,
      });
      return res.data;
    },
  });
};


export const useVerifyUser = () => {
  return useMutation({
    mutationFn: async (data: VerifyPayload) => {
      const res = await apiClient.post("/verify-user", data);
      return res.data;
    },
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: async ({ data, headers }: LoginRequest) => {
      const res = await apiClient.post("/login", data ?? {}, {
        headers,
      });
      return res.data;
    },
  });
};

export const useUserDetails = () => {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const res = await apiClient.get("/details");
      return res.data;
    },
  });
};


export const useRequestOtp = () => {
  return useMutation<RequestOtpResponse, Error, RequestOtpPayload>({
    mutationFn: async (payload: RequestOtpPayload) => {
      const { data } = await apiClient.post("/request-otp", payload);
      return data;
    },
  });
};