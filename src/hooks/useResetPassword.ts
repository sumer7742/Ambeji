
import apiClient from "../constant/apiclient";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}
export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}
export const resetPassword = async (
  data: ResetPasswordPayload
): Promise<ResetPasswordResponse> => {
  const response = await apiClient.put<ResetPasswordResponse>(
    "/forget-password",
    data
  );
  return response.data;
};
export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, AxiosError, ResetPasswordPayload>({
    mutationFn: resetPassword,
  });
};
