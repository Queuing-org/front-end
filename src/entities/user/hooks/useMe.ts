"use client";

import { useQuery } from "@tanstack/react-query";
import { User } from "../model/types";
import { fetchMe } from "../api/me";

export function useMe() {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: fetchMe,
    staleTime: 1000 * 60,
    retry: false,
  });
}
