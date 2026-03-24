import { useMutation } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";
import type { AxiosError } from "axios";

export interface signupdata {
  name: string;
  email: string;
  password: string;
}

const signupApi = (data: signupdata) =>
  apiClient.post("/register", data).then((res) => res.data); 

export const useSignupHook = () => {
  return useMutation<any, AxiosError, signupdata>({
    mutationFn: signupApi,
  });
};
