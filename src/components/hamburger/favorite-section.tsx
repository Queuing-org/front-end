// src/components/hamburger/FavoritesSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronRight, Headphones } from "lucide-react";
import { FAV_ROOMS_DUMMY, FavRoom } from "@/dummy/favRooms";

export default function FavoritesSection() {
  const [open, setOpen] = useState(true);

  return (
    <section className="px-4">
      <button
        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-800"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="inline-flex items-center gap-2">
          <span className="h-5 w-5 rounded-md bg-gray-900" />
          즐겨찾기 방
        </span>
        {open ? (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </button>

      {open && (
        <ul className="grid grid-cols-1 gap-3 pb-2">
          {FAV_ROOMS_DUMMY.map((r: FavRoom) => (
            <li
              key={r.id}
              className="flex items-center gap-3 rounded-xl border border-gray-100 p-3"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={r.thumbnail}
                  alt={r.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {r.title}
                </p>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Headphones className="h-4 w-4" />
                <span className="text-sm tabular-nums">
                  {r.listenersCount.toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
