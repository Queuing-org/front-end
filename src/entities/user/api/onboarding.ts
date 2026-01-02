import { API_BASE_URL } from "@/src/shared/api/config";
import { OnboardingPayload } from "../model/types";
import { ApiError } from "@/src/shared/api/api-error";

type ApiResponse<T> = { result: T };

export async function completeOnboarding(
  payload: OnboardingPayload
): Promise<boolean> {
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

  const data = (await res.json()) as ApiResponse<boolean>;
  return data.result;
}
