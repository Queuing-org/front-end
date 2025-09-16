"use client";

import React, { use, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { currentVideoIdAtom } from "@/atoms/player";
import QueueList from "@/components/room/queue/queue-list";
import ParticipantList from "@/components/room/right-section/participant-list";
import TopBar from "@/components/room/top-bar";
import YoutubePlayer from "@/components/room/youtube-player";
import AddSongModal from "@/components/room/queue/add-song-modal";
import { useParams } from "next/navigation";
import { DummyRooms } from "@/dummy-rooms";
import { DUMMY_PARTICIPANTS } from "@/dummy-users";

export default function Room({ params }) {
  const { code } = useParams();

  const users = DUMMY_PARTICIPANTS;

  const [openAdd, setOpenAdd] = useState(false);
  const [videoId] = useAtom(currentVideoIdAtom);

  const [room, setRoom] = useState(null);
  const [memberCount, setMemberCount] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

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
    <div className="bg-white text-[#17171B] min-h-screen flex flex-col">
      <TopBar
        title={room?.title ?? "방제목"}
        currentListeners={memberCount}
        maxListeners={room?.max_listeners ?? 0}
        exitHref="/main"
      />

      <main className="flex-1 p-4 grid gap-4 grid-cols-1 lg:grid-cols-[minmax(240px,320px)_1fr_minmax(220px,280px)]">
        <aside className="order-2 lg:order-1 w-full min-w-0">
          <QueueList onOpenAddSong={() => setOpenAdd(true)} />
        </aside>

        <section className="order-1 lg:order-2 w-full min-w-0 flex justify-center">
          <div className="w-full max-w-[960px]">
            <YoutubePlayer videoId={videoId} autoplay />
          </div>
        </section>

        <aside className="order-3 lg:order-3 w-full min-w-0">
          <ParticipantList users={users} />
        </aside>
      </main>

      <AddSongModal open={openAdd} onClose={() => setOpenAdd(false)} />
    </div>
  );
}
