"use client";

import GoogleLoginButton from "@/src/features/auth/login-with-google/ui/googleLoginButton";
import { useMe } from "@/src/entities/user/hooks/useMe";
import LogoutButton from "@/src/features/auth/logout/ui/logoutButton";
import NicknameEditForm from "@/src/features/user-profile/ui/NicknameEditForm";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const { data: me, isError, error } = useMe();

  const router = useRouter();

  return (
    <div className="bg-white p-4 space-y-4">
      <GoogleLoginButton />
      <LogoutButton />
      <NicknameEditForm />

      <div className="border p-3">
        {isError && <div>me 실패: {String((error as Error)?.message)}</div>}
        {me && <pre>{JSON.stringify(me, null, 2)}</pre>}
        {me === null && <div>로그인 필요</div>}
      </div>
      <button onClick={() => router.push("/home")}>go to home page</button>
    </div>
  );
}
