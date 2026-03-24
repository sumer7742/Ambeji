import type { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

interface QueryToastHandlers<T = any> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

export const handleQueryToast = <T extends { message?: string }>({
  onSuccess,
  onError,
}: QueryToastHandlers<T>) => ({
  onSuccess: (data: T) => {
    if (data?.message) {
      toast.success(data.message);
    } else {
      toast.success("successful!");
    }
    onSuccess?.(data);
  },
  onError: (error: any) => {
    console.log(error)
    const message =
      error?.response?.data?.error || error?.response?.data?.message || error?.message || error?.error || "Something went wrong";
    toast.error(message);
    onError?.(error);
  },
});
export const handleApiHookResponse = (...callbacks: Array<() => unknown>) => {
  return {
    onSuccess: (response: AxiosResponse<{ message?: string }> | any) => {
      const message = response.data?.message ?? "Successful!";
      toast.success(message);
      callbacks.forEach((fn) => { if (typeof fn === "function") fn(); });
    },
    onError: (
      error: AxiosError<{ message?: string; error?: string; err?: string }> | Error
    ) => {
      const errorData =
        (error as AxiosError<{ message?: string; error?: string; err?: string }>)?.response?.data ??
        (error as Error);

      const message =
        (errorData as any).message ||
        (errorData as any).error ||
        (errorData as any).err ||
        "Something went wrong";

      toast.error(message);
    },
  };
};





// for example

// {
//       ...handleQueryToast({
//         onSuccess: (res: any) => {
//           const token = res?.token || res?.data?.token;
//           if (token) {
//             setToken(token);
//             navigate("/");
//           }
//         },
//         onError: (err: any) => {
//           console.error("Login failed:", err);
//         },
//       }),
//     }˝