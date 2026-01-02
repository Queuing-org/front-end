"use client";

import { FormEvent, useState } from "react";

type Props = {
  defaultValue?: string;
  submitting?: boolean;
  onNext: (nickname: string) => void;
};

export default function NicknameStep({
  defaultValue = "",
  submitting = false,
  onNext,
}: Props) {
  const [nickname, setNickname] = useState(defaultValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const v = nickname.trim();
    if (!v) return;
    onNext(v);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        닉네임
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력하세요"
          disabled={submitting}
        />
      </label>

      <button type="submit" disabled={submitting || !nickname.trim()}>
        다음
      </button>
    </form>
  );
}
