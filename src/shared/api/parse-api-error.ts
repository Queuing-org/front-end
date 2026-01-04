import axios from "axios";
import { ApiError } from "./api-error";

type BackendErrorBody = {
  error: {
    statusCode: number;
    code: string;
    message: string;
  };
};

export function toApiError(err: unknown): ApiError {
  // axios 에러인 경우 (백엔드 응답 파싱)
  if (axios.isAxiosError(err)) {
    const status = err.response?.status ?? 0;
    const data = err.response?.data as BackendErrorBody | undefined;

    const backend = data?.error;

    // 백엔드 포맷이 있는 경우
    if (backend?.statusCode && backend?.message) {
      return new ApiError({
        status: backend.statusCode,
        code: backend.code,
        message: backend.message,
      });
    }

    // 백엔드 포맷이 없을 때 (nginx, html, 네트워크 등)
    return new ApiError({
      status,
      message: err.message || "요청 중 오류가 발생했어요.",
    });
  }

  // 그 외 알 수 없는 에러
  return new ApiError({
    status: 0,
    message: "알 수 없는 오류가 발생했어요.",
  });
}
