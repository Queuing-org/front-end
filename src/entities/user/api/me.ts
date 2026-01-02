// src/entities/user/api/me.ts
import { axiosInstance } from "@/src/shared/api/axiosInstance";
import type { User } from "../model/types";

type ApiResponse<T> = { result: T };

export async function fetchMe(): Promise<User> {
  const { data } = await axiosInstance.get<ApiResponse<User>>(
    "/api/v1/user-profiles/me"
  );
  return data.result;
}
