// src/components/header.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Power, User, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchBar from "./topbar/search-bar";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const nickname = "하드코딩닉네임";

  // ✅ 바깥 클릭/터치 & Esc 로 닫기
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: Event) => {
      const target = e.target as Node | null;
      if (!wrapRef.current) return;
      if (target && !wrapRef.current.contains(target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown, {
      capture: true,
    });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, {
        capture: true,
      } as any);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header className="relative z-50 isolate bg-white py-3 px-6 mt-[-15px]">
      <div className="grid grid-cols-[auto_1fr_auto] items-center">
        {/* 왼쪽 로고 */}
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <Image
            src="/queuing-logo-mark.svg"
            alt="Queuing"
            width={32}
            height={32}
            className="mr-[-5px]"
          />
          큐잉
        </h1>

        {/* 가운데 서치바 */}
        <div className="justify-self-center w-full max-w-[720px] px-6">
          <SearchBar />
        </div>

        {/* 오른쪽 닉네임/메뉴 */}
        {nickname && (
          <div className="justify-self-end relative" ref={wrapRef}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
              className="flex items-center gap-2 px-2.5 py-1 rounded-full text-lg font-semibold text-gray-800 cursor-pointer transition-colors hover:bg-gray-100"
            >
              {/* 하드코딩 아바타 */}
              <Image
                src={`/default-avatar.jpg`}
                alt="내 아바타"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover ring-1 ring-black/5"
                draggable={false}
              />
              <span className="text-base leading-none">{nickname}</span>
            </button>

            {open && (
              <div
                role="menu"
                className="absolute top-full right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur"
              >
                {/* 내 프로필 */}
                <button
                  type="button"
                  onClick={() => router.push("/my-profile")}
                  className="cursor-pointer flex w-full items-center justify-between gap-3 px-4 py-3 text-sm text-[#17171B] hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  role="menuitem"
                >
                  <span className="inline-flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-600" />내 프로필
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>

                {/* 구분선 */}
                <div className="h-px bg-gray-100" />

                {/* 로그아웃 */}
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                  }}
                  disabled={loggingOut}
                  aria-busy={loggingOut}
                  className="cursor-pointer flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 focus:bg-red-50 disabled:opacity-60"
                  role="menuitem"
                >
                  <Power className="h-5 w-5" />
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
