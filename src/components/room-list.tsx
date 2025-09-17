// components/room-list.jsx
import RoomCard from "./room-card";
import { DummyRooms } from "../dummy-rooms";
import { Room } from "@/types/room";

export default function RoomList() {
  const rooms: Room[] = DummyRooms;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-5 px-4">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
