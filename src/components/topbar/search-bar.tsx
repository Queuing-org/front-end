// src/components/topbar/search-bar.jsx
"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  // .jsx 파일이므로 제네릭(<string>)은 빼는 게 안전합니다.
  const [q, setQ] = useState("");

  return (
    <div className="w-full">
      <div className="relative w-full max-w-[360px] md:max-w-[420px] mx-auto">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="방, 방장 이름 검색"
          className="w-full rounded-full border border-gray-400 bg-white pl-4 pr-16 py-2 text-sm text-[#17171B] placeholder:text-gray-400  focus:outline-none"
        />

        {/* X 버튼: 오른쪽 아이콘(Search) 왼쪽에 위치 */}
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            aria-label="검색 지우기"
            className="absolute right-9 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}

        {/* 검색 아이콘: 맨 오른쪽 */}
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700" />
      </div>
    </div>
  );
}
