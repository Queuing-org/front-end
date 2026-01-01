import { API_BASE_URL } from "@/src/shared/api/config";

export function redirectToGoogleLogin() {
  const continueUrl = window.location.href; // 원래 보고 있던 페이지로 복귀
  window.location.href = `${API_BASE_URL}/api/auth/login/google?continue=${encodeURIComponent(
    continueUrl
  )}`;
}
