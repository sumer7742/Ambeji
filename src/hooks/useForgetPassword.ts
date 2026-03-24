// hooks/useSendOtp.ts
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import apiClient from "../constant/apiclient";

interface SendOtpInput {
  email: string;
}
interface SendOtpResponse {
  success: boolean;
  message: string;
  otp?: string;
}

const sendOtpApi = (data: SendOtpInput): Promise<SendOtpResponse> =>
  apiClient.post("/send-otp", data).then(res => res.data);

export const useSendOtp = () => {
  return useMutation<SendOtpResponse, AxiosError, SendOtpInput>({
    mutationFn: sendOtpApi,
  });
};
