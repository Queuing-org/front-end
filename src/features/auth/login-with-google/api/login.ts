import { API_BASE_URL } from "@/src/shared/api/config";

/**
 * Initiates OAuth login with Google by navigating the browser to the backend's Google login endpoint.
 *
 * The current page URL is appended as the `next` query parameter of a callback URL at `/auth/callback`, and that callback URL is passed to the backend as the `continue` parameter.
 */
export function redirectToGoogleLogin() {
  const next = window.location.href;

  const callbackUrl = `${
    window.location.origin
  }/auth/callback?next=${encodeURIComponent(next)}`;

  window.location.href = `${API_BASE_URL}/api/auth/login/google?continue=${encodeURIComponent(
    callbackUrl
  )}`;
}