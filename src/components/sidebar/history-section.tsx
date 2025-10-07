// src/components/hamburger/HistorySection.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Clock } from "lucide-react";
import { HISTORY_DUMMY, HistoryItem } from "@/dummy/history";
import { History } from "lucide-react";

export default function HistorySection() {
  const [open, setOpen] = useState(true);

  return (
    <section className="px-4">
      <button
        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-800"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="inline-flex items-center gap-2">
          <History className="h-4 w-4 text-gray-500" />
          기록
        </span>
        {open ? (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </button>

      {open && (
        <ul className="pb-2 space-y-2">
          {HISTORY_DUMMY.map((h: HistoryItem) => (
            <li
              key={h.id}
              className="flex items-center justify-between rounded-xl border border-gray-100 p-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">
                  {h.name}
                </p>
                <p className="text-xs text-gray-500">{h.visitedAt}</p>
              </div>
              <Clock className="h-4 w-4 text-gray-400" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
