import { useMutation } from "@tanstack/react-query";
import apiClient from "../constant/apiclient";
import type { AxiosError } from "axios";
export interface logindata {
    email: string;
    password: string;
}
const loginApi = (data: logindata) => apiClient.post("/login", data).then(res => res.data);
export const useLoginHook = () => {
    return useMutation<any, AxiosError, logindata>({
        mutationFn: loginApi
    })
}