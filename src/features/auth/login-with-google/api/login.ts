import { API_BASE_URL } from "@/src/shared/api/config";

export function redirectToGoogleLogin() {
  //   const next = window.location.href;

  //   const callbackUrl = `${
  //     window.location.origin
  //   }/auth/callback?next=${encodeURIComponent(next)}`;

  const nextPath = window.location.pathname + window.location.search;
  const callbackUrl = `${
    window.location.origin
  }/auth/callback?next=${encodeURIComponent(nextPath)}`;

  window.location.href = `${API_BASE_URL}/api/auth/login/google?continue=${encodeURIComponent(
    callbackUrl
  )}`;
}
