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

    const backendError = err?.response?.data?.error;
    const backendStatus = backendError?.statusCode;
    const backendCode = backendError?.code;
    const backendMessage = backendError?.message;

    const message =
      backendMessage ??
      err?.response?.data?.message ??
      err?.response?.data ??
      err?.message ??
      "Unknown error";

    const finalStatus = backendStatus ?? status;

    return Promise.reject(
      new ApiError({
        status: finalStatus,
        message: String(message),
        code: backendCode,
      })
    );
  }
);
