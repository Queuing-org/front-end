"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, History } from "lucide-react";
import { FAV_ROOMS_DUMMY } from "@/dummy/favRooms";
import FavRoomList from "../favorite-section/favorite-room-list";

export default function FavoritesSection() {
  const [open, setOpen] = useState(true);

  return (
    <section className="px-2">
      <button
        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-800"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="inline-flex items-center gap-2 px-3">
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
        <FavRoomList
          rooms={FAV_ROOMS_DUMMY}
          onOpen={(room) => alert(`방 입장: ${room.title}`)}
        />
      )}
    </section>
  );
}
