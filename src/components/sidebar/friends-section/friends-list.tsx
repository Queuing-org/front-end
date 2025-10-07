"use client";

import type { Friend } from "@/dummy/friends";
import FriendCard from "./friend-card";

type FriendListProps = {
  friends: Friend[];
  expandedId: string | null;
  onToggleFriend: (id: string) => void;
  onChat?: (friend: Friend) => void;
  onFollow?: (friend: Friend) => void;
};

export default function FriendList({
  friends,
  expandedId,
  onToggleFriend,
  onChat,
  onFollow,
}: FriendListProps) {
  return (
    <ul className="space-y-1 pb-2">
      {friends.map((f) => (
        <FriendCard
          key={f.id}
          friend={f}
          expanded={expandedId === f.id}
          onToggle={() => onToggleFriend(f.id)}
          onChat={onChat}
          onFollow={onFollow}
        />
      ))}
    </ul>
  );
}
