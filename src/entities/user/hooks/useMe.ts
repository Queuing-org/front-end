"use client";

import { useQuery } from "@tanstack/react-query";
import { User } from "../model/types";
import { fetchMe } from "../api/me";

export function useMe() {
  return useQuery<User | null>({
    queryKey: ["me"],
    queryFn: fetchMe,
    staleTime: 0,
    retry: false,
  });
}
