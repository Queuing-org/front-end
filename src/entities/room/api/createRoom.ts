import { axiosInstance } from "@/src/shared/api/axiosInstance";
import { CreateRoomPayload } from "./types";

type ApiResponse<T> = { result: T };

export async function createRoom(payload: CreateRoomPayload): Promise<boolean> {
  const res = await axiosInstance.post<ApiResponse<boolean>>(
    "/api/v1/rooms",
    payload
  );
  return res.data.result;
}
