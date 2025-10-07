// src/components/topbar/tag-bar.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TAG_META, tagClasses, tagLabel } from "@/constants/tags";
import { SlidersHorizontal, X, ChevronRight } from "lucide-react";

type TagKey = keyof typeof TAG_META;

type TagBarProps = {
  onChange?: (selected: TagKey[]) => void; // 선택된 태그 키 목록만 부모로
};

export default function TagBar({ onChange }: TagBarProps) {
  // 내부 고정값 (필요하면 나중에 props로 열 수 있음)
  const INITIAL_VISIBLE = 7;
  const MAX_FAVORITES = 7;

  const allTags = useMemo(() => Object.keys(TAG_META) as TagKey[], []);
  const initial = useMemo(() => allTags.slice(0, INITIAL_VISIBLE), [allTags]);

  const [favorites, setFavorites] = useState<TagKey[]>(initial);
  const [openEdit, setOpenEdit] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // ▼ 추가: 전체/필터 모드 & 인라인 확장
  const [mode, setMode] = useState<"all" | "filtered">("all");
  const [showInline, setShowInline] = useState(false);

  const atLimit = favorites.length >= MAX_FAVORITES;

  useEffect(() => {
    onChange?.(favorites);
  }, [favorites, onChange]);

  useEffect(() => {
    if (!openEdit) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpenEdit(false);
      }
    };
    const onEsc = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpenEdit(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [openEdit]);

  // mode가 all로 바뀌면 인라인 펼침 닫기
  useEffect(() => {
    if (mode === "all") setShowInline(false);
  }, [mode]);

  const addFavorite = (t: TagKey) => {
    if (atLimit || favorites.includes(t)) return;
    setFavorites((prev) => [...prev, t]);
  };
  const removeFavorite = (t: TagKey) => {
    setFavorites((prev) => prev.filter((x) => x !== t));
  };
  const toggleFavorite = (t: TagKey) => {
    favorites.includes(t) ? removeFavorite(t) : addFavorite(t);
  };
  const clearFavorites = () => setFavorites([]);

  // 버튼 공통 스타일
  const pillBase =
    "shrink-0 whitespace-nowrap rounded-full px-4 py-1 text-[14px] font-medium transition cursor-pointer";
  const neutralPill =
    "border border-gray-200 bg-white text-[#17171B] hover:bg-gray-50";
  const activePill =
    "bg-[#17171B] text-white border border-[#17171B] hover:opacity-90";

  return (
    <div ref={rootRef} className="relative w-full bg-white">
      {/* 상단 바 */}
      <div className="flex items-center justify-between gap-2 px-4 pt-5">
        {/* 좌측: 전체 방 / 필터링된 방 + (선택 태그 인라인 펼침) */}
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
          {/* 전체 방 버튼 */}
          <button
            type="button"
            onClick={() => setMode("all")}
            aria-pressed={mode === "all"}
            className={[
              pillBase,
              mode === "all" ? activePill : neutralPill,
            ].join(" ")}
            title="전체 방 보기"
          >
            전체 방
          </button>

          {/* 필터링된 방 버튼 */}
          <button
            type="button"
            onClick={() => {
              setMode("filtered");
              setShowInline((v) => !v);
            }}
            aria-pressed={mode === "filtered"}
            className={[
              pillBase,
              mode === "filtered" ? activePill : neutralPill,
              "inline-flex items-center gap-1.5",
            ].join(" ")}
            title="필터링된 방"
          >
            필터링된 방
            <ChevronRight
              className={`h-3.5 w-3.5 transition-transform ${
                showInline && mode === "filtered" ? "rotate-90" : ""
              }`}
            />
          </button>

          {/* 선택된 태그들 인라인 표시(필터링된 방 + 펼침 상태일 때만) */}
          {mode === "filtered" && showInline && (
            <div className="flex min-w-0 items-center gap-2 overflow-x-auto pl-1">
              {favorites.length ? (
                favorites.map((t) => (
                  <span
                    key={`inline-${t}`}
                    className={[
                      "shrink-0 whitespace-nowrap rounded-full px-4 py-1 text-xs",
                      tagClasses(t),
                    ].join(" ")}
                    title={tagLabel(t)}
                  >
                    {tagLabel(t)}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-500">선택된 태그 없음</span>
              )}
            </div>
          )}
        </div>

        {/* 편집 버튼 */}
        <button
          type="button"
          onClick={() => setOpenEdit((v) => !v)}
          aria-expanded={openEdit}
          className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-[#17171B] hover:bg-gray-50 cursor-pointer"
          title="필터 편집"
        >
          <SlidersHorizontal className="h-4 w-4" />
          필터 편집
        </button>
      </div>

      {/* 편집 패널 */}
      {openEdit && (
        <div className="absolute left-4 right-4 top-full z-40 mt-2 rounded-2xl border border-gray-100 bg-white/98 p-3 px-5 shadow-xl">
          {/* 즐겨찾기 칩 */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {favorites.length ? (
                favorites.map((t) => (
                  <span
                    key={`fav-${t}`}
                    className="inline-flex items-center gap-1 rounded-full bg-[#17171B]/5 px-2.5 py-1 text-xs text-[#17171B] border border-gray-200"
                  >
                    {tagLabel(t)}
                    <button
                      type="button"
                      onClick={() => removeFavorite(t)}
                      className="inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-gray-200/80 cursor-pointer"
                      aria-label={`${tagLabel(t)} 제거`}
                      title="제거"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-500">즐겨찾기 없음</span>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span
                className={`text-xs ${
                  atLimit ? "text-red-600 font-medium" : "text-gray-500"
                }`}
              >
                {atLimit
                  ? `즐겨찾기 최대 ${MAX_FAVORITES}/${MAX_FAVORITES}개`
                  : `즐겨찾기 ${favorites.length}/${MAX_FAVORITES}`}
              </span>
              <div className="space-x-2">
                <button
                  type="button"
                  onClick={clearFavorites}
                  className="rounded-full px-2.5 py-1 text-xs text-[#17171B] hover:bg-gray-100 cursor-pointer"
                >
                  초기화
                </button>
                <button
                  type="button"
                  onClick={() => setOpenEdit(false)}
                  className="rounded-full bg-[#17171B] px-3 py-1 text-xs font-medium text-white hover:opacity-90 cursor-pointer"
                >
                  완료
                </button>
              </div>
            </div>
          </div>

          {/* 전체 태그 목록 */}
          <div className="flex max-h-64 flex-wrap gap-2 overflow-auto py-1">
            {allTags.map((t) => {
              const active = favorites.includes(t);
              const disabled = !active && atLimit;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleFavorite(t)}
                  aria-pressed={active}
                  disabled={disabled}
                  className={[
                    "rounded-full px-3 py-1 text-xs transition",
                    "focus:outline-none focus:ring-2 focus:ring-black/5",
                    tagClasses(t),
                    active
                      ? "opacity-100 shadow-sm"
                      : disabled
                      ? "opacity-25 cursor-not-allowed"
                      : "opacity-40 hover:opacity-60",
                  ].join(" ")}
                  title={tagLabel(t)}
                >
                  {tagLabel(t)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
