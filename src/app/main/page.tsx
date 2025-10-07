// src/app/main/page.tsx
"use client";

import { useMemo, useState } from "react";
import RoomList from "@/components/room-list";
import CreateRoom from "@/components/topbar/create-room";
import SortButton from "@/components/topbar/sort-button";
import TagBar from "@/components/topbar/tag-bar";
import { DummyRooms } from "@/dummy/dummy-rooms";
import type { Room } from "@/types/room";

export default function MainPage() {
  // TagBar에서 선택된 태그 키 배열
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filteredRooms = useMemo<Room[]>(() => {
    if (!activeTags.length) return DummyRooms;
    return DummyRooms.filter((r) =>
      r.tags?.some((t) => activeTags.includes(t))
    );
  }, [activeTags]);

  return (
    <div className="bg-[#FFFFFF] h-screen  text-[#17171B]">
      <div className="-ml-3 pr-4 pt-2"></div>
      <div className="justify-between flex">
        <TagBar onChange={setActiveTags} />
        <div className="flex gap-2 items-center pt-5 mr-5">
          <SortButton />
          <CreateRoom />
        </div>
      </div>
      <RoomList />
    </div>
  );
}
