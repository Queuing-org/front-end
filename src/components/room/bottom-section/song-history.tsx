"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Clock, Music2, ThumbsUp, ThumbsDown, History } from "lucide-react";

/** 타입 */
type HistoryItem = {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string; // "3:42"
  playedAt: string; // "12:07"
  likeCount: number;
  dislikeCount: number;
  myVote?: "up" | "down" | null;
};

/** 가짜 데이터 */
function useDummyHistory() {
  return useMemo<HistoryItem[]>(
    () => [
      {
        id: "t1",
        title: "Ditto",
        artist: "NewJeans",
        thumbnail: "https://i.ytimg.com/vi/pSUydWEqKwE/hqdefault.jpg", // 예시
        duration: "3:05",
        playedAt: "12:21",
        likeCount: 128,
        dislikeCount: 4,
        myVote: "up",
      },
      {
        id: "t2",
        title: "Hype Boy",
        artist: "NewJeans",
        thumbnail: "https://i.ytimg.com/vi/11cta61wi0g/hqdefault.jpg",
        duration: "2:59",
        playedAt: "12:17",
        likeCount: 96,
        dislikeCount: 3,
        myVote: null,
      },
      {
        id: "t3",
        title: "Attention",
        artist: "NewJeans",
        thumbnail: "https://i.ytimg.com/vi/js1CtxSY38I/hqdefault.jpg",
        duration: "3:00",
        playedAt: "12:13",
        likeCount: 74,
        dislikeCount: 6,
        myVote: "down",
      },
      {
        id: "t4",
        title: "OMG",
        artist: "NewJeans",
        thumbnail: "https://i.ytimg.com/vi/sVTy_wmn5SU/hqdefault.jpg",
        duration: "3:33",
        playedAt: "12:08",
        likeCount: 51,
        dislikeCount: 1,
        myVote: null,
      },
      {
        id: "t5",
        title: "ASAP",
        artist: "NewJeans",
        thumbnail: "https://i.ytimg.com/vi/IkF6r2S7tU4/hqdefault.jpg",
        duration: "2:52",
        playedAt: "12:04",
        likeCount: 39,
        dislikeCount: 2,
        myVote: null,
      },
    ],
    []
  );
}

/** 히스토리 리스트 (UI-only) */
export default function SongHistory() {
  const initial = useDummyHistory();
  const [items, setItems] = useState<HistoryItem[]>(initial);

  const handleVote = (id: string, vote: "up" | "down") => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        // 토글/변경 로직 (로컬 UI 전용)
        let like = it.likeCount;
        let dislike = it.dislikeCount;
        let nextVote: HistoryItem["myVote"] = it.myVote;

        if (it.myVote === vote) {
          // 같은 버튼 한 번 더 누르면 취소
          if (vote === "up") like = Math.max(0, like - 1);
          else dislike = Math.max(0, dislike - 1);
          nextVote = null;
        } else {
          // 반대에서 전환 or 처음 투표
          if (vote === "up") {
            like += 1;
            if (it.myVote === "down") dislike = Math.max(0, dislike - 1);
          } else {
            dislike += 1;
            if (it.myVote === "up") like = Math.max(0, like - 1);
          }
          nextVote = vote;
        }

        return {
          ...it,
          likeCount: like,
          dislikeCount: dislike,
          myVote: nextVote,
        };
      })
    );
  };

  return (
    <div className="w-full h-full rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center gap-2 px-4 pt-3">
        <History className="h-4 w-4 text-[#17171B]" />
        <h3 className="text-sm font-semibold text-[#17171B]">최근 재생 목록</h3>
        <span className="ml-2 text-xs text-gray-500 hidden sm:inline">
          방에서 방금 들었던 노래들을 확인하고 👍/👎로 반응해보세요
        </span>
      </div>

      {/* 리스트 (전 height 차지) */}
      <div className="flex-1 min-h-0 overflow-auto p-3 sm:p-4 space-y-3">
        {items.map((it) => (
          <Row key={it.id} item={it} onVote={handleVote} />
        ))}
      </div>

      {/* 푸터 */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Music2 className="h-3.5 w-3.5" />
          <span>총 {items.length}곡</span>
        </div>
        <div className="text-xs text-gray-500 hidden sm:block">
          좋아요/싫어요는 데모 UI (로컬 상태)
        </div>
      </div>
    </div>
  );
}

/** 단일 행 (가로폭 넓은 레이아웃 대응) */
function Row({
  item,
  onVote,
}: {
  item: HistoryItem;
  onVote: (id: string, v: "up" | "down") => void;
}) {
  const isUp = item.myVote === "up";
  const isDown = item.myVote === "down";

  return (
    <div
      className={[
        "group relative rounded-xl border border-gray-200 bg-white",
        "hover:bg-gray-50 transition-colors",
      ].join(" ")}
    >
      <div className="grid grid-cols-[auto_1fr_auto] gap-3 sm:gap-4 px-3 py-2 sm:px-4 sm:py-3 items-center">
        {/* 썸네일 */}
        <div className="relative h-12 w-12 sm:h-[56px] sm:w-[56px] rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={item.thumbnail || "/default-thumb.png"}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

        {/* 타이틀/아티스트/메타 */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-medium text-[#17171B]">
              {item.title}
            </span>
            <span className="truncate text-xs text-gray-500">
              · {item.artist}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {item.playedAt}
            </span>
            <span className="tabular-nums">{item.duration}</span>
          </div>
        </div>

        {/* 우측 액션(넓은 화면에서 고정 정렬) */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <button
            type="button"
            onClick={() => onVote(item.id, "up")}
            className={[
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs",
              isUp
                ? "bg-[#17171B] border-[#17171B] text-white"
                : "border-gray-200 text-[#17171B] hover:bg-gray-100",
            ].join(" ")}
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="tabular-nums">{item.likeCount}</span>
          </button>

          <button
            type="button"
            onClick={() => onVote(item.id, "down")}
            className={[
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs",
              isDown
                ? "bg-[#17171B] border-[#17171B] text-white"
                : "border-gray-200 text-[#17171B] hover:bg-gray-100",
            ].join(" ")}
          >
            <ThumbsDown className="h-4 w-4" />
            <span className="tabular-nums">{item.dislikeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
