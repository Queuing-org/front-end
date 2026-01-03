"use client";

import { createRoom } from "@/src/entities/room/api/createRoom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiError } from "@/src/shared/api/api-error";
import type { CreateRoomPayload } from "@/src/entities/room/api/types";

export function useCreateRoom() {
  const qc = useQueryClient();

  return useMutation<boolean, ApiError, CreateRoomPayload>({
    mutationFn: createRoom,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["rooms"] });
      // TODO: room으로 이동
    },
  });
}
