"use client";

import Image from "next/image";
import { Clock, ThumbsUp, ThumbsDown } from "lucide-react";
import type { HistoryItem } from "@/types/song-history";

export default function SongHistoryCard({
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

        {/* 제목/아티스트/메타 */}
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

        {/* 우측 액션 */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <button
            type="button"
            onClick={() => onVote(item.id, "up")}
            className={[
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs",
              isUp
                ? "bg-[#10B981] border-[#10B981] text-white"
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
                ? "bg-[#F43F5E] border-[#F43F5E] text-white"
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
