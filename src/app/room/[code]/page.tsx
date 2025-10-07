"use client";

import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { currentVideoIdAtom } from "@/atoms/player";
import QueueList from "@/components/room/queue/queue-list";
import ParticipantList from "@/components/room/right-section/participant-list";
import TopBar from "@/components/room/top-bar";
import YoutubePlayer from "@/components/room/youtube-player";
import AddSongModal from "@/components/room/queue/add-song-modal";
import { useParams } from "next/navigation";
import { DummyRooms } from "@/dummy/dummy-rooms";
import { DUMMY_PARTICIPANTS } from "@/dummy/dummy-users";
import type { User } from "@/types/user";
import type { Room } from "@/types/room";
import Chatting from "@/components/room/bottom-section/chatting";
import SongHistoryList from "@/components/room/bottom-section/song-history-list";

export default function RoomPage() {
  const params = useParams<{ code: string }>();
  const code = params?.code;

  const users: User[] = DUMMY_PARTICIPANTS;

  const [openAdd, setOpenAdd] = useState(false);
  const [videoId] = useAtom(currentVideoIdAtom);

  const [room, setRoom] = useState<Room | null>(null);
  const [memberCount, setMemberCount] = useState<number>(0);
  const [participants, setParticipants] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    if (!code) return;
    const found = DummyRooms.find((r) => r.code === String(code));
    if (found) {
      setRoom(found);
      setMemberCount(found.listenersCount);
      setParticipants([]);
    } else {
      setErr("방을 찾을 수 없습니다.");
    }
    setLoading(false);
  }, [code]);

  return (
    <div className="bg-white text-[#17171B] h-dvh flex flex-col overflow-hidden">
      <TopBar
        title={room?.title ?? "방제목"}
        currentListeners={memberCount}
        exitHref="/main"
      />

      <main
        className="shrink-0 px-4 pt-4 grid gap-[4.5rem] grid-cols-1 justify-center
      lg:[grid-template-columns:minmax(160px,320px)_720px_minmax(140px,280px)]
      xl:[grid-template-columns:minmax(200px,340px)_820px_minmax(180px,300px)]"
      >
        <aside className="order-2 lg:order-1 w-full min-w-0">
          <QueueList onOpenAddSong={() => setOpenAdd(true)} />
        </aside>

        <section className="order-1 lg:order-2 w-full min-w-0 flex justify-center">
          <div className="w-full">
            <YoutubePlayer videoId={videoId} autoplay />
          </div>
        </section>

        <aside className="order-3 lg:order-3 w-full min-w-0 lg:-translate-x-2 xl:-translate-x-4">
          <ParticipantList users={users} />
        </aside>
      </main>

      <section className="flex-1 min-h-0 px-4 pt-2 pb-4 overflow-hidden">
        <div className="grid h-full min-h-0 grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          <div className="h-full min-h-0 flex">
            <div className="flex-1 h-full min-h-0">
              <SongHistoryList />
            </div>
          </div>

          <div className="h-full min-h-0 flex">
            <div className="flex-1 h-full min-h-0">
              <Chatting />
            </div>
          </div>
        </div>
      </section>

      <AddSongModal open={openAdd} onClose={() => setOpenAdd(false)} />
    </div>
  );
}
