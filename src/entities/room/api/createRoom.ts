import { axiosInstance } from "@/src/shared/api/axiosInstance";
import type { ApiResponse } from "@/src/shared/api/types";
import { ApiError } from "@/src/shared/api/api-error";
import type { CreateRoomPayload, CreateRoomResult } from "./types";

export async function createRoom(
  payload: CreateRoomPayload
): Promise<CreateRoomResult> {
  const res = await axiosInstance.post<ApiResponse<boolean>>(
    "/api/v1/rooms",
    payload
  );

  const slug = (res.headers?.location as string | undefined) ?? undefined;

  if (!slug) {
    throw new ApiError({
      status: res.status,
      message: "Location 헤더가 없어 방으로 이동할 수 없습니다.",
    });
  }

  return { slug };
}
