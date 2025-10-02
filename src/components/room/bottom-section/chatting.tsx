// components/room/chat/Chatting.tsx
"use client";

import { useMemo } from "react";
import { Send } from "lucide-react";
import Image from "next/image";

type ChatMessage =
  | {
      id: string;
      type?: "message";
      userId: string;
      nickname: string;
      avatarUrl?: string | null;
      text: string;
      time: string;
    }
  | { id: string; type: "date"; text: string };

export default function Chatting() {
  const data = useMemo(
    () => ({
      meId: "me",
      messages: [
        { id: "d0", type: "date", text: "오늘" } as ChatMessage,
        {
          id: "m1",
          userId: "u1",
          nickname: "DJ-Host",
          avatarUrl: "/default-avatar.jpg",
          text: "어서와요! 신청곡은 오른쪽 + 버튼으로 🙌",
          time: "12:10",
        } as ChatMessage,
        {
          id: "m2",
          userId: "me",
          nickname: "나",
          avatarUrl: "/default-avatar.jpg",
          text: "안녕하세요~ 지금 곡 짱좋네요 🔥",
          time: "12:11",
        } as ChatMessage,
        {
          id: "m3",
          userId: "u2",
          nickname: "guest-1",
          avatarUrl: "/default-avatar.jpg",
          text: "다음에 뉴진스 어떠세요?",
          time: "12:12",
        } as ChatMessage,
      ] as ChatMessage[],
      typing: ["guest-2"],
    }),
    []
  );

  return (
    <div className="w-full h-full rounded-2xl border border-gray-200 bg-white flex flex-col overflow-hidden">
      {/* 메시지 리스트 */}
      <div className="flex-1 min-h-0 overflow-auto px-3 py-3 space-y-6">
        {data.messages.map((m) =>
          m.type === "date" ? (
            <div key={m.id} className="flex items-center justify-center">
              <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] text-gray-500 bg-white">
                {m.text}
              </span>
            </div>
          ) : (
            <MessageBubble
              key={m.id}
              mine={m.userId === data.meId}
              nickname={m.nickname}
              avatarUrl={m.avatarUrl}
              text={m.text}
              time={m.time}
            />
          )
        )}
      </div>

      {/* 입력 바 (동작 없음, UI 전용) */}
      <div className="border-t border-gray-200 p-2">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            disabled
            placeholder="메시지를 입력하세요 (데모 UI)"
            className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm outline-none disabled:bg-gray-50"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-[#17171B] text-white px-4 py-2 text-sm hover:opacity-90 disabled:opacity-50"
            disabled
          >
            <Send className="h-4 w-4" />
            전송
          </button>
        </form>
      </div>
    </div>
  );
}

function MessageBubble({
  mine,
  nickname,
  avatarUrl,
  text,
  time,
}: {
  mine?: boolean;
  nickname: string;
  avatarUrl?: string | null;
  text: string;
  time?: string;
}) {
  const timeEl = (
    <span className="text-[10px] text-gray-400 tabular-nums leading-none mb-0.5 shrink-0">
      {time}
    </span>
  );

  const bubbleEl = (
    <div
      className={[
        "inline-block rounded-2xl px-3 py-2 text-sm",
        mine
          ? "bg-[#17171B] text-white rounded-br-md"
          : "bg-gray-100 text-[#17171B] rounded-bl-md",
      ].join(" ")}
    >
      {text}
    </div>
  );

  return (
    <div
      className={[
        "flex w-full gap-2 px-1",
        mine ? "justify-end" : "justify-start",
      ].join(" ")}
    >
      {/* 상대방 */}
      {!mine && (
        <div className="grid grid-cols-[auto_1fr] gap-x-2 px-1">
          <Image
            src={avatarUrl || "/default-avatar.jpg"}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover bg-gray-200 row-span-2 self-end"
            alt=""
          />
          <span className="text-xs text-gray-500 self-end mb-1">
            {nickname}
          </span>
          <div className="flex items-end gap-2 max-w-[72vw] sm:max-w-[60vw] md:max-w-[40vw]">
            {bubbleEl}
            {timeEl}
          </div>
        </div>
      )}

      {/* 내 메시지 */}
      {mine && (
        <>
          <div className="flex items-end gap-2 max-w-[72vw] sm:max-w-[60vw] md:max-w-[40vw]">
            {timeEl}
            {bubbleEl}
          </div>
          <Image
            src={avatarUrl || "/default-avatar.jpg"}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover bg-gray-200"
            alt=""
          />
        </>
      )}
    </div>
  );
}
