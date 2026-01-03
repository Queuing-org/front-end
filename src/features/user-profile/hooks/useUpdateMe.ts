"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../api/updateMe";
import type { UpdateMePayload } from "../model/types";
import type { ApiError } from "@/src/shared/api/api-error";
import type { User } from "@/src/entities/user/model/types"; // 너 프로젝트 User 타입 경로에 맞게

export function useUpdateMe() {
  const qc = useQueryClient();

  return useMutation<User, ApiError, UpdateMePayload>({
    mutationFn: (payload) => updateMe(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
