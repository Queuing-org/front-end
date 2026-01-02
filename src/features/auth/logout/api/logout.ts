import { axiosInstance } from "@/src/shared/api/axiosInstance";

export async function logoutApi(): Promise<void> {
  await axiosInstance.post("/api/auth/logout");
}
