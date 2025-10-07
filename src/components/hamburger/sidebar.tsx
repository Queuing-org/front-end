// src/components/hamburger/sidebar.tsx
"use client";

import { Users, Star, History } from "lucide-react";
import FriendsSection from "./friends-section";
import FavoritesSection from "./favorite-section";
import HistorySection from "./history-section";

export default function Sidebar({ open }: { open: boolean }) {
  const width = open ? 280 : 80;

  return (
    <aside style={{ width }} className="bg-whiteh-full">
      {/* 접힘: 아이콘 레일 */}
      {!open && (
        <div className="h-full flex flex-col items-center pt-6 gap-7 text-gray-600">
          <div className="flex flex-col items-center gap-1">
            <Users className="h-6 w-6" />
            <span className="text-[11px]">친구목록</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Star className="h-6 w-6" />
            <span className="text-[11px]">즐겨찾기</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <History className="h-6 w-6" />
            <span className="text-[11px]">기록</span>
          </div>
        </div>
      )}

      {/* 펼침: 섹션들 */}
      {open && (
        <div className="h-full overflow-y-auto pb-6">
          <nav className="py-2 space-y-4">
            <FriendsSection />
            <div className="h-px bg-gray-100" />
            <FavoritesSection />
            <div className="h-px bg-gray-100" />
            <HistorySection />
          </nav>
        </div>
      )}
    </aside>
  );
}
