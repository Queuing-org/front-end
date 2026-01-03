import { axiosInstance } from "@/src/shared/api/axiosInstance";
import type { RoomTag } from "../model/types";

type ApiResponse<T> = { result: T };

export async function fetchRoomTags(): Promise<RoomTag[]> {
  const res = await axiosInstance.get<ApiResponse<{ tags: RoomTag[] }>>(
    "/api/v1/tags"
  );

  return res.data.result.tags;
}
