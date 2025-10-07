// src/components/hamburger/FriendsSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Footprints,
} from "lucide-react";
import { FRIENDS_DUMMY, Friend } from "@/dummy/friends";

export default function FriendsSection() {
  const [open, setOpen] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFriend = (id: string) =>
    setExpandedId((cur) => (cur === id ? null : id));

  return (
    <section className="px-4">
      <button
        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-800"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="inline-flex items-center gap-2">
          <span className="h-5 w-5 rounded-md bg-gray-900" />
          친구 목록
        </span>
        {open ? (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </button>

      {open && (
        <ul className="space-y-2 pb-2">
          {FRIENDS_DUMMY.map((f: Friend) => (
            <li key={f.id} className="rounded-xl border border-gray-100">
              <button
                onClick={() => toggleFriend(f.id)}
                className="w-full flex items-center gap-3 p-3"
              >
                <div className="relative h-9 w-9">
                  <Image
                    src={f.avatar}
                    alt={f.name}
                    fill
                    className="rounded-full object-cover ring-1 ring-black/5"
                  />
                  <span
                    className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white ${
                      f.online ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">{f.name}</p>
                  <p className="text-xs text-gray-500">
                    {f.online ? "온라인" : "오프라인"}
                  </p>
                </div>
                <ChevronRight
                  className={`h-4 w-4 text-gray-400 transition-transform ${
                    expandedId === f.id ? "rotate-90" : ""
                  }`}
                />
              </button>

              {expandedId === f.id && (
                <div className="px-3 pb-3 flex items-center gap-2">
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 text-white text-xs"
                    onClick={() => alert(`1:1 채팅 - ${f.name}`)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    1:1 채팅하기
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-900 text-xs"
                    onClick={() => alert(`방 따라가기 - ${f.name}`)}
                  >
                    <Footprints className="h-4 w-4" />방 따라가기
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
