import { API_BASE_URL } from "@/src/shared/api/config";

export async function logout() {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`logout failed: ${res.status} ${text}`);
  }
}
