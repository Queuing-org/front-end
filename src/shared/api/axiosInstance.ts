import axios from "axios";
import { API_BASE_URL } from "./config";
import { ApiError } from "./api-error";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { Accept: "application/json" },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  withXSRFToken: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status ?? 0;
    const message =
      err?.response?.data?.message ??
      err?.response?.data ??
      err?.message ??
      "Unknown error";
    return Promise.reject(new ApiError(status, String(message)));
  }
);
