import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOnboarding } from "../api/onboarding";

/**
 * Exposes a react-query mutation that completes the current user's onboarding and refreshes the cached "me" data.
 *
 * @returns A mutation object configured to call `completeOnboarding`; on success it invalidates the `["me"]` query so the current user's data is refetched.
 */
export function useCompleteOnboarding() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: completeOnboarding,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}