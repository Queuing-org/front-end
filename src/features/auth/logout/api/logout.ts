import { ApiError } from "@/src/shared/api/api-error";
import { API_BASE_URL } from "@/src/shared/api/config";

export async function logoutApi(): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ApiError(res.status, text || res.statusText);
  }
}
