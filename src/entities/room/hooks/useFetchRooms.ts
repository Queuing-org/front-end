"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRooms } from "../api/fetchRooms";
import type { RoomsResponse } from "../model/types";
import type { ApiError } from "@/src/shared/api/api-error";

export function useRoomsQuery() {
  return useQuery<RoomsResponse, ApiError>({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
    retry: false,
  });
}
