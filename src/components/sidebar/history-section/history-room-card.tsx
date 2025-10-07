"use client";

import Image from "next/image";
import { Headphones } from "lucide-react";
import type { FavRoom } from "@/dummy/favRooms";

type FavRoomCardProps = {
  room: FavRoom;
  onOpen?: (room: FavRoom) => void;
};

export default function FavRoomCard({ room, onOpen }: FavRoomCardProps) {
  return (
    <li className="rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => onOpen?.(room)}
        className="w-full flex items-center gap-2 p-2 transition-colors
                   hover:bg-gray-100 rounded-lg"
      >
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-gray-100">
          <Image
            src={room.thumbnail}
            alt={room.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-xs font-medium text-gray-900">
            {room.title}
          </p>
        </div>

        <div className="flex items-center gap-1 text-gray-600">
          <Headphones className="h-3.5 w-3.5" strokeWidth={1.5} />
          <span className="text-xs tabular-nums">
            {room.listenersCount.toLocaleString()}
          </span>
        </div>
      </button>
    </li>
  );
}
