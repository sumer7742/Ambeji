import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import apiClient from "../constant/apiclient";
import type { UploadError, IUploadResponse } from "../common/types/types";
export const useUploadImages = () =>
    useMutation<IUploadResponse, UploadError, FormData>({
        mutationFn: async (files: FormData) => {
            const response: AxiosResponse<IUploadResponse> = await apiClient.post(
                "/uploads",
                files,
            );
            return response.data;
        },
    });
