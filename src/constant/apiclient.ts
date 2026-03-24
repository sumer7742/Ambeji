import axios from "axios";
import { getToken, removeToken } from "../utils/token";
import { getOrCreateDeviceId } from "../utils/device_id.utils";
export const apiClient = axios.create({
  baseURL: "https://api.unibcomp.in/api/user",
//  baseURL: "http://localhost:3500/api/user",
  headers: {
    "Cache-Control": "no-cache",
  },
});
const serverHeaders = (config: any) => {
  const token = getToken()
  const device_id = getOrCreateDeviceId();
  if (token && config.url !== "login/" && config.url !== "verify-otp/") {
    config.headers["Authorization"] = `Bearer ${token}`;
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
  };
  if (device_id) {
    config.headers["DeviceId"] = device_id;
  }
  return config;
};
const handle401Error = (error: any) => {
  if (error.response && error.response.status === 401) {
    removeToken()
  }
  return Promise.reject(error);
};
apiClient.interceptors.request.use(serverHeaders);
apiClient.interceptors.response.use(
  (response) => response,
  handle401Error
);
export default apiClient;