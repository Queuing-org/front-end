"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/logout";

export function useLogout() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      qc.removeQueries({ queryKey: ["me"] });
    },
  });
}
