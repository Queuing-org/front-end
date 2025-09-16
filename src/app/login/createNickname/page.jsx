"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNicknamePage() {
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  return (
    <div className="bg-[#FDFDFD] h-screen flex flex-col justify-center items-center text-[#242424]">
      <header className="mb-6 text-xl font-bold">
        닉네임을 설정해주세요 ✍️
      </header>

      <div className="w-full max-w-xs">
        <form className="flex flex-col">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="ex) 큐돌이17"
            className="rounded-t-4xl border border-gray-300 py-2 text-center"
            disabled={loading}
          />
          <button
            type="submit"
            className="rounded-b-4xl border border-t-0 border-gray-300 bg-[#242424] px-3 py-2 text-[#FDFDFD] hover:bg-black transition cursor-pointer disabled:opacity-60"
            disabled={loading}
            onClick={() => router.push("/main")}
          >
            {loading ? "저장 중..." : "닉네임 저장하기"}
          </button>
        </form>

        {err && <p className="mt-3 text-center text-sm text-red-500">{err}</p>}
      </div>
    </div>
  );
}
