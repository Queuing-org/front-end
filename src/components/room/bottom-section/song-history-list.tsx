"use client";

import { useState } from "react";
import { History, Music2 } from "lucide-react";
import SongHistoryCard from "./song-history-card";
import type { HistoryItem } from "@/types/song-history";
import { cloneSongHistory } from "./song-history.dummy";

export default function SongHistoryList() {
  // 더미데이터 복사본으로 상태 초기화
  const [items, setItems] = useState<HistoryItem[]>(cloneSongHistory());

  const handleVote = (id: string, vote: "up" | "down") => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;

        let like = it.likeCount;
        let dislike = it.dislikeCount;
        let next: HistoryItem["myVote"] = it.myVote;

        if (it.myVote === vote) {
          if (vote === "up") like = Math.max(0, like - 1);
          else dislike = Math.max(0, dislike - 1);
          next = null;
        } else {
          if (vote === "up") {
            like += 1;
            if (it.myVote === "down") dislike = Math.max(0, dislike - 1);
          } else {
            dislike += 1;
            if (it.myVote === "up") like = Math.max(0, like - 1);
          }
          next = vote;
        }

        return { ...it, likeCount: like, dislikeCount: dislike, myVote: next };
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

      {/* 리스트 */}
      <div className="flex-1 min-h-0 overflow-auto p-3 sm:p-4 space-y-3">
        {items.map((it) => (
          <SongHistoryCard key={it.id} item={it} onVote={handleVote} />
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
