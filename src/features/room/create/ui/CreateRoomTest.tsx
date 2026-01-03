"use client";

import { useState } from "react";
import { useCreateRoom } from "@/src/features/room/create/model/useCreateRoom";

export default function CreateRoomTest() {
  const { mutate, isPending, error, data } = useCreateRoom();

  const [title, setTitle] = useState("");
  const [password, setPassword] = useState(""); // optional
  const [tagSlug, setTagSlug] = useState("lo-fi"); // tags: ["lo-fi"]

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const t = title.trim();
    if (!t) return;

    mutate({
      title: t,
      password: password.trim() ? password.trim() : undefined,
      tags: tagSlug.trim() ? [tagSlug.trim()] : [],
    });
  };

  return (
    <div className="border p-4 space-y-3 text-black">
      <div className="text-sm font-semibold">방 생성 테스트</div>

      <form onSubmit={onSubmit} className="space-y-2">
        <div className="space-y-1">
          <label className="block text-xs">title</label>
          <input
            className="border px-2 py-1 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="새벽 코딩 달리실 분"
            disabled={isPending}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs">password (optional)</label>
          <input
            className="border px-2 py-1 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="1234"
            disabled={isPending}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs">tag slug</label>
          <input
            className="border px-2 py-1 w-full"
            value={tagSlug}
            onChange={(e) => setTagSlug(e.target.value)}
            placeholder="lo-fi"
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          className="border px-3 py-1 cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "생성 중..." : "방 생성"}
        </button>
      </form>

      {error && (
        <div className="text-sm text-red-600">
          생성 실패: ({error.status}) {error.message}
        </div>
      )}

      {/* createRoom이 boolean을 반환한다는 전제 */}
      {data !== undefined && (
        <div className="text-sm">결과: {String(data)}</div>
      )}
    </div>
  );
}
