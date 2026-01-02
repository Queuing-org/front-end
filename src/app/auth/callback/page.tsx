"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMe } from "@/src/entities/user/hooks/useMe";
import { ApiError } from "@/src/shared/api/api-error";

/**
 * Handles the authentication callback by resolving the current user state and redirecting the browser.
 *
 * On mount it revalidates the current user; if the user fetch fails with a 401 or 403 `ApiError` the
 * component redirects to the onboarding flow with the original `next` path encoded, for other errors
 * it redirects to `/error`. If the user fetch succeeds and a user exists, it redirects to the `next`
 * path (defaults to `/`).
 *
 * @returns `null` — this component does not render any UI
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/";

  const { data: me, isError, error, refetch, isSuccess } = useMe();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    // 초기 사용자 설정 안돼있으면 온보딩 페이지로 이동
    if (isError) {
      if (
        error instanceof ApiError &&
        (error.status === 401 || error.status === 403)
      ) {
        router.replace(`/onboarding?next=${encodeURIComponent(next)}`);
        return;
      }
      router.replace("/error");
      return;
    }

    // 200 -> 원래 페이지로 복귀
    if (isSuccess && me) {
      router.replace(next);
    }
  }, [isError, error, isSuccess, me, next, router]);

  return null;
}