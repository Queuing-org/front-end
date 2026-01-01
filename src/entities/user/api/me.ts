import { ApiError } from "@/src/shared/api/api-error";
import { API_BASE_URL } from "@/src/shared/api/config";
import { User } from "../model/types";

export async function fetchMe(): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/api/v1/user-profiles/me`, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ApiError(res.status, text || res.statusText);
  }

  return (await res.json()) as User;
}
