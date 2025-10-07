"use client";

import type { FavRoom } from "@/dummy/favRooms";
import FavRoomCard from "./favorite-room-card";

type FavRoomListProps = {
  rooms: FavRoom[];
  onOpen?: (room: FavRoom) => void;
};

export default function FavRoomList({ rooms, onOpen }: FavRoomListProps) {
  return (
    <ul className="grid grid-cols-1 pb-2">
      {rooms.map((r) => (
        <FavRoomCard key={r.id} room={r} onOpen={onOpen} />
      ))}
    </ul>
  );
}
