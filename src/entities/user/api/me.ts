import { ApiError } from "@/src/shared/api/api-error";
import { API_BASE_URL } from "@/src/shared/api/config";
import { User } from "../model/types";

/**
 * Retrieves the current authenticated user's profile from the API.
 *
 * @returns The fetched user profile as a `User` object.
 * @throws ApiError when the HTTP response status is not OK; the error contains the response status code and the response body or statusText.
 */
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