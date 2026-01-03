// features/auth/logout/model/useLogout.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../api/logout";

export function useLogout() {
  const qc = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      qc.setQueryData(["me"], null);
    },
  });
}
