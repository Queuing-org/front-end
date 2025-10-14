// src/components/topbar/sort-button.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, LogIn, X } from "lucide-react";
import Modal from "../ui/modal";

const DEFAULT_OPTIONS: string[] = ["최신순", "인원 많은 순", "인원 적은 순"];

interface SortButtonProps {
  options?: string[];
}

export default function SortButton({
  options = DEFAULT_OPTIONS,
}: SortButtonProps) {
  const sortRef = useRef<HTMLDivElement | null>(null);
  const [openSort, setOpen] = useState<boolean>(false);
  const [roomCode, setRoomCode] = useState<string>("");

  // 바깥 클릭 + ESC 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const handleEnterRoom = () => {
    if (!roomCode.trim()) return alert("방 코드를 입력해주세요!");
    console.log("Entering room:", roomCode);
    // ✅ 여기에 실제 입장 로직 추가 (예: router.push(`/room/${roomCode}`))
    setOpen(false);
  };

  return (
    <div className="relative" ref={sortRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={openSort}
        className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-[#17171B] hover:bg-gray-50"
      >
        <LogIn className="h-4 w-4" />
        <span className="font-medium">방 입장</span>
      </button>

      {openSort && (
        <Modal open={openSort} onClose={() => setOpen(false)}>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#17171B]">
                방 입장하기
              </h2>
              <button
                className="rounded-full p-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => setOpen(false)}
                aria-label="닫기"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="방 코드를 입력해주세요."
                  className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2 pr-10 text-sm text-[#17171B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#17171B]/20"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEnterRoom()}
                />
                <button
                  onClick={handleEnterRoom}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:text-[#17171B] hover:bg-gray-100 transition"
                >
                  <ArrowRight className="h-5 w-5 cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
