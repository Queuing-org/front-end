// src/components/topbar/sort-button.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpDown, Check, LogIn } from "lucide-react";

const DEFAULT_OPTIONS: string[] = ["최신순", "인원 많은 순", "인원 적은 순"];

interface SortButtonProps {
  options?: string[];
}

export default function SortButton({
  options = DEFAULT_OPTIONS,
}: SortButtonProps) {
  const sortRef = useRef<HTMLDivElement | null>(null);
  const [openSort, setOpenSort] = useState<boolean>(false);

  // 바깥 클릭 + ESC 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setOpenSort(false);
      }
    };
    const onEsc = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpenSort(false);

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className="relative" ref={sortRef}>
      <button
        type="button"
        onClick={() => setOpenSort((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={openSort}
        className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-[#17171B] hover:bg-gray-50"
      >
        <LogIn className="h-4 w-4" />
        <span className="font-medium">방 입장</span>
      </button>

      {openSort && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-black/5 bg-white/80 shadow-lg ring-1 ring-black/5"
        >
          {options.map((label) => (
            <button
              key={label}
              type="button"
              className="flex w-full items-center gap-2 whitespace-nowrap px-4 py-2.5 text-sm text-[#17171B] hover:bg-gray-50"
            >
              <Check className="h-4 w-4 opacity-0" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
