import { axiosInstance } from "@/src/shared/api/axiosInstance";
import type { RoomsResponse } from "../model/types";

type ApiResponse<T> = { result: T };

export async function fetchRooms(): Promise<RoomsResponse> {
  const res = await axiosInstance.get<ApiResponse<RoomsResponse>>(
    "/api/v1/rooms"
  );
  return res.data.result;
}
