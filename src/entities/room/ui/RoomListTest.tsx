"use client";

import JoinRoomButton from "@/src/features/room/join/JoinRoomButton";
import { useRoomsQuery } from "../hooks/useFetchRooms";
import DeleteRoomButton from "@/src/features/room/delete/ui/DeleteRoomButton";

export default function RoomsListTest() {
  const { data, isLoading, isError, error } = useRoomsQuery();

  if (isLoading)
    return <div className="border p-4 text-black">방 목록 로딩중...</div>;

  if (isError) {
    return (
      <div className="border p-4 text-black">
        방 목록 로딩 실패: ({error.status}) {error.message}
      </div>
    );
  }

  const rooms = data?.rooms ?? [];

  return (
    <div className="border p-4 space-y-3 text-black">
      <div className="text-sm font-semibold">방 목록 테스트</div>

      {rooms.length === 0 ? (
        <div className="text-sm">방이 없습니다.</div>
      ) : (
        <ul className="space-y-2">
          {rooms.map((room) => (
            <li key={room.id} className="border p-3 space-y-1">
              <div className="text-sm">
                <span className="font-semibold">제목:</span> {room.title}
              </div>

              <div className="text-sm">
                <span className="font-semibold">슬러그:</span> {room.slug}
              </div>

              <div className="text-sm">
                <span className="font-semibold">태그:</span>{" "}
                {room.tags?.length ? (
                  room.tags.map((t) => t.name).join(", ")
                ) : (
                  <span className="text-gray-600">없음</span>
                )}
              </div>
              <JoinRoomButton slug={room.slug} />
              <DeleteRoomButton slug={room.slug} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
