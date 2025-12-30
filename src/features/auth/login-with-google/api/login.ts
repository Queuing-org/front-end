import { API_BASE_URL } from "@/src/shared/api/config";

export function redirectToGoogleLogin() {
  window.location.href = `${API_BASE_URL}/api/auth/login/google`;
}
