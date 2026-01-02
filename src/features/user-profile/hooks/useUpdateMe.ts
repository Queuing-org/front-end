"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../api/updateMe";
import { UpdateMePayload } from "../model/types";

export function useUpdateMe() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateMePayload) => updateMe(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["me"] }); // ✅ /me 재조회
    },
  });
}
