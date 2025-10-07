// components/room/RoomCard.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Users2, Lock } from "lucide-react";
import { tagClasses, tagLabel, TAG_META } from "@/constants/tags";

type TagInput = string | { key?: string; tag?: string; value?: string };

export type RoomLike = {
  code: string;
  title: string;
  hostNickname: string;
  hostAvatarUrl?: string | null;
  isPrivate?: boolean;
  listenersCount?: number;
  tags?: TagInput[];
  thumbnail?: string | null; // ← optional/nullable도 허용
};

// 라벨/별칭 → TAG_META 키 정규화
function normalizeTagKey(input: unknown): string | null {
  if (input == null) return null;
  const raw =
    typeof input === "string"
      ? input
      : (input as any).key ?? (input as any).tag ?? (input as any).value ?? "";
  const s = String(raw).trim();
  if (!s) return null;
  if (Object.prototype.hasOwnProperty.call(TAG_META as object, s)) return s;
  const lower = s.toLowerCase();
  for (const k of Object.keys(TAG_META as object)) {
    if (String(tagLabel(k as any)).toLowerCase() === lower) return k;
  }
  const canonical = lower.replace(/[\s-]/g, "");
  const alias: Record<string, string> = {
    kpop: "kpop",
    "k-pop": "kpop",
    jpop: "jpop",
    "j-pop": "jpop",
    citypop: "citypop",
    "city-pop": "citypop",
    hiphop: "hiphop",
    rnb: "rnb",
    "r&b": "rnb",
    lofi: "lofi",
    indieband: "indie_band",
    "indie-band": "indie_band",
    edm: "edm",
    chill: "chill",
    study: "study",
  };
  return alias[canonical] ?? null;
}

export default function RoomCard({ room }: { room: RoomLike }) {
  const router = useRouter();
  const {
    code,
    title,
    hostNickname,
    hostAvatarUrl,
    thumbnail,
    listenersCount = 0,
    isPrivate = false,
    tags = [],
  } = room;

  // 안전한 기본값
  const thumbSrc = thumbnail || "/room-dummy-img/room-img1.png";
  const avatarSrc = hostAvatarUrl || "/default-avatar.jpg";

  const normalizedTags = (Array.isArray(tags) ? tags : [])
    .map((t) => normalizeTagKey(t))
    .filter((v): v is string => !!v);

  const go = () => router.push(`/room/${code}`);
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={go}
      onKeyDown={onKeyDown}
      className="h-full rounded-xl bg-white ring-1 ring-gray-200 shadow-sm overflow-hidden cursor-pointer transition
                 hover:shadow-md hover:ring-[#17171B]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17171B]/30"
    >
      {/* 썸네일 (콤팩트: 5:3) */}
      <div className="relative w-full aspect-[16/11] bg-gray-100">
        <Image
          src={thumbSrc}
          alt={`${title} 썸네일`}
          fill
          sizes="(min-width:1024px) 260px, (min-width:768px) 33vw, 100vw"
          className="object-cover"
        />
        {/* 좌상단 인원 배지 (축소) */}
        <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-black/70 px-2 py-0.5 text-[13px] text-white backdrop-blur-sm">
          <Users2 className="h-3 w-3" />
          <span className="tabular-nums">{listenersCount}명</span>
        </div>
      </div>

      {/* 본문 (축소된 패딩/타이포) */}
      <div className="p-3">
        <div className="flex items-center gap-2.5">
          <Image
            src={avatarSrc}
            alt="호스트 아바타"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover ring-1 ring-black/5"
          />
          <div className="min-w-0 flex-1">
            <div className="flex justify-between items-center gap-1.5">
              <h3 className="truncate text-sm font-semibold text-[#17171B]">
                {title}
              </h3>
              {isPrivate && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#17171B]/5 px-1.5 py-[2px] text-[10px] text-[#17171B] ring-1 ring-[#17171B]/15">
                  <Lock className="h-3 w-3" />
                  잠금
                </span>
              )}
            </div>
            <p className="mt-0.5 text-[11px] text-gray-500 truncate">
              호스트 ·{" "}
              <span className="font-medium text-gray-700">{hostNickname}</span>
            </p>
          </div>
        </div>

        {/* 태그 (더 작게) */}
        {!!normalizedTags.length && (
          <div className="mt-2 flex flex-wrap items-center gap-1">
            {normalizedTags.map((k) => (
              <span
                key={k}
                className={`rounded-full px-1.5 py-[2px] text-[10px] ${tagClasses(
                  k
                )}`}
                title={tagLabel(k)}
              >
                {tagLabel(k)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
