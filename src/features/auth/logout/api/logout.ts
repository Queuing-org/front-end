import { ApiError } from "@/src/shared/api/api-error";
import { API_BASE_URL } from "@/src/shared/api/config";

/**
 * Invalidates the current authenticated session on the server.
 *
 * Performs a logout request to the API and throws an ApiError if the response
 * has a non-success HTTP status.
 *
 * @throws {ApiError} When the server responds with a non-OK status; contains the HTTP status and message.
 */
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