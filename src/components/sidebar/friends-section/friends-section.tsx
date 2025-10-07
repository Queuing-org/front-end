"use client";

import { useState } from "react";
import { Users, ChevronDown, ChevronRight } from "lucide-react";
import { FRIENDS_DUMMY } from "@/dummy/friends";
import FriendList from "./friends-list";

export default function FriendsSection() {
  const [open, setOpen] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFriend = (id: string) =>
    setExpandedId((cur) => (cur === id ? null : id));

  return (
    <section className="px-2">
      <button
        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-800"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="inline-flex items-center gap-2 px-3">
          <Users className="h-4 w-4 text-gray-500" />
          친구 목록
        </span>
        {open ? (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </button>

      {open && (
        <FriendList
          friends={FRIENDS_DUMMY}
          expandedId={expandedId}
          onToggleFriend={toggleFriend}
          onChat={(f) => alert(`1:1 채팅 - ${f.name}`)}
          onFollow={(f) => alert(`방 따라가기 - ${f.name}`)}
        />
      )}
    </section>
  );
}
