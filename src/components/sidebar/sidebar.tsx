// src/components/hamburger/sidebar.tsx
"use client";

import { Users, Star, History, StoreIcon, TrophyIcon } from "lucide-react";
import FriendsSection from "./friends-section/friends-section";
import FavoritesSection from "./favorite-section/favorite-section";
import HistorySection from "./history-section/history-section";
import { useRouter, usePathname } from "next/navigation";
import GradientStrokeIcon from "@/components/icons/gradient-stroke-icon";

export default function Sidebar({ open }: { open: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const width = open ? 280 : 80;

  // /shop 또는 뒤에 /shop으로 끝나는 경로 강조
  const isShop = pathname === "/shop" || pathname?.endsWith("/shop");
  const isAchievements = pathname?.endsWith("/achievements");

  return (
    <aside style={{ width }} className="bg-white h-full">
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

          <button
            onClick={() => router.push("/main/achievements")}
            className="flex flex-col items-center gap-1"
          >
            {isAchievements ? (
              <TrophyIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <TrophyIcon className="h-6 w-6" />
            )}
            <span className="text-[11px]">업적</span>
          </button>

          <button
            onClick={() => router.push("/main/shop")}
            className="flex flex-col items-center gap-1 cursor-pointer"
            aria-current={isShop ? "page" : undefined}
            type="button"
            title="상점"
          >
            {isShop ? (
              <GradientStrokeIcon
                Icon={StoreIcon}
                className="h-6 w-6"
                strokeWidth={2}
              />
            ) : (
              <StoreIcon className="h-6 w-6" />
            )}
            <span
              className={["text-[11px]", isShop ? "font-semibold" : ""].join(
                " "
              )}
            >
              상점
            </span>
          </button>
        </div>
      )}

      {/* 펼침: 섹션들 */}
      {open && (
        <div className="h-full overflow-y-auto">
          <nav className="py-2">
            <div className="px-3">
              <FriendsSection />
            </div>
            <div className="h-px bg-gray-300 mx-5" />
            <div className="px-3">
              <FavoritesSection />
            </div>
            <div className="h-px bg-gray-300 mx-5" />
            <div className="px-3">
              <HistorySection />
            </div>
          </nav>
        </div>
      )}
    </aside>
  );
}
