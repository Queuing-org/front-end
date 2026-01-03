"use client";

import { useState } from "react";
import { useUpdateMe } from "../hooks/useUpdateMe";

export default function NicknameEditForm() {
  const { mutate, isPending, error } = useUpdateMe();
  const [nickname, setNickname] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = nickname.trim();
    if (!trimmed) return;

    mutate({ nickname: trimmed });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <label className="block text-sm">변경할 닉네임 입력</label>

      <input
        className="border px-2 py-1 text-black"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="새 닉네임"
        disabled={isPending}
      />

      <button type="submit" className="border px-3 py-1" disabled={isPending}>
        {isPending ? "변경 중..." : "변경하기"}
      </button>

      {error && (
        <p className="text-sm text-red-600">
          닉네임 변경: ({error.status}) {error.message}
        </p>
      )}
    </form>
  );
}
