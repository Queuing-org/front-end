// features/user-profile/edit/api/updateMe.ts
import { ApiError } from "@/src/shared/api/api-error";
import { API_BASE_URL } from "@/src/shared/api/config";
import type { User } from "@/src/entities/user/model/types";
import { UpdateMePayload } from "../model/types";

export async function updateMe(payload: UpdateMePayload): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/api/v1/user-profiles/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ApiError(res.status, text || res.statusText);
  }

  return (await res.json()) as User;
}
