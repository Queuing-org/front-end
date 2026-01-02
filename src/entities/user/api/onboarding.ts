import { API_BASE_URL } from "@/src/shared/api/config";
import { OnboardingPayload } from "../model/types";
import { ApiError } from "@/src/shared/api/api-error";

/**
 * Update the current user's onboarding state on the server.
 *
 * @param payload - Data to send to the onboarding endpoint
 * @returns The parsed JSON response body from the server
 * @throws ApiError when the HTTP response status is not in the 2xx range; contains the status and server message
 */
export async function completeOnboarding(payload: OnboardingPayload) {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/user-profiles/me/onboarding`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ApiError(res.status, text || res.statusText);
  }

  return res.json();
}