// features/auth/logout/model/useLogout.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../api/logout";

/**
 * Create a mutation hook that triggers a logout and removes the cached "me" query before the mutation completes.
 *
 * @returns A React Query mutation object configured to call the logout API; invoking it performs the logout.
 */
export function useLogout() {
  const qc = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => logoutApi(),
    onMutate: () => {
      qc.removeQueries({ queryKey: ["me"] });
    },
  });
}