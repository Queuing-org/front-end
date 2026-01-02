// features/user-profile/edit/model/useUpdateMe.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../api/updateMe";
import { UpdateMePayload } from "../model/types";

/**
 * Creates a React Query mutation for updating the current user's profile.
 *
 * @returns A mutation object that accepts an `UpdateMePayload`, calls `updateMe` to apply the update, and invalidates the `"me"` query on success to refetch current user data.
 */
export function useUpdateMe() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateMePayload) => updateMe(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["me"] }); // ✅ /me 재조회
    },
  });
}