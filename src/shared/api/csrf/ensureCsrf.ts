import { axiosInstance } from "@/src/shared/api/axiosInstance";

let bootPromise: Promise<void> | null = null;

/**
 * 서버가 XSRF-TOKEN 쿠키를 내려주도록 1회 호출
 * - 중복 호출되어도 네트워크는 1번만 나가게 막음
 */
export function ensureCsrf(): Promise<void> {
  if (!bootPromise) {
    bootPromise = axiosInstance.get("/api/auth/csrf").then(() => undefined);
  }
  return bootPromise;
}
