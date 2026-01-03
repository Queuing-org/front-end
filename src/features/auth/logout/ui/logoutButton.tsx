"use client";

import { useLogout } from "../model/useLogout";

export default function LogoutButton() {
  const { mutate: logout, isPending } = useLogout();

  return (
    <button
      className="border cursor-pointer"
      onClick={() => logout()}
      disabled={isPending}
    >
      {isPending ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}
