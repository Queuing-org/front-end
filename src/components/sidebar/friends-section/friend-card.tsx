"use client";

import Image from "next/image";
import { ChevronRight, MessageCircle, Footprints } from "lucide-react";
import type { Friend } from "@/dummy/friends";

type FriendCardProps = {
  friend: Friend;
  expanded: boolean;
  onToggle: () => void;
  onChat?: (friend: Friend) => void;
  onFollow?: (friend: Friend) => void;
};

export default function FriendCard({
  friend,
  expanded,
  onToggle,
  onChat,
  onFollow,
}: FriendCardProps) {
  return (
    <li className="overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 p-2 transition-colors
                   hover:bg-gray-100 rounded-lg"
      >
        <div className="relative h-8 w-8">
          <Image
            src={friend.avatar}
            alt={friend.name}
            fill
            className="rounded-full object-cover ring-1 ring-black/5"
          />
          <span
            className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ring-1 ring-white ${
              friend.online ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </div>

        <div className="flex-1 text-left">
          <p className="text-xs font-medium text-gray-900">{friend.name}</p>
          <p className="text-[11px] text-gray-500">
            {friend.online ? "온라인" : "오프라인"}
          </p>
        </div>

        <ChevronRight
          className={`h-3.5 w-3.5 text-gray-400 transition-transform ${
            expanded ? "rotate-90" : ""
          }`}
          strokeWidth={1.5}
        />
      </button>

      {expanded && (
        <div className="px-2 pb-2 flex items-center gap-1.5">
          <button
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-gray-900 text-white text-[11px]
                       hover:bg-gray-800 active:bg-gray-900/90 transition-colors"
            onClick={() => onChat?.(friend)}
          >
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
            1:1 채팅하기
          </button>
          <button
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-gray-100 text-gray-900 text-[11px]
                       hover:bg-gray-200 active:bg-gray-200/80 transition-colors"
            onClick={() => onFollow?.(friend)}
          >
            <Footprints className="h-3.5 w-3.5" strokeWidth={1.5} />방 따라가기
          </button>
        </div>
      )}
    </li>
  );
}
