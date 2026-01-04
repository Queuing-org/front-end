"use client";

import { useParams } from "next/navigation";

export default function RoomPage() {
  const params = useParams<{ slug: string }>();

  return <div>room: {params.slug}</div>;
}
