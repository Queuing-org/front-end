import { axiosInstance } from "@/src/shared/api/axiosInstance";

export async function createRoom() {
  const res = await axiosInstance.post("/api/v1/rooms");
}
