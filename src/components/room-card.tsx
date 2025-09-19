"use client";

import { Music2, Users2, Lock } from "lucide-react";
import { TAG_META, tagClasses, tagLabel } from "@/constants/tags";
import { useRouter } from "next/navigation";

// ── 타입들 ────────────────────────────────────────────────────────────────
type NowPlaying = {
  title: string;
  artist: string;
  durationSec: number;
  positionMs?: number;
};

type TagInput =
  | string
  | {
      key?: string;
      tag?: string;
      value?: string;
    };

type RoomLike = {
  title: string;
  hostNickname: string;
  isPrivate?: boolean;
  tags?: TagInput[];
  listenersCount?: number;
  limitedListeners?: number | null;
  nowPlaying?: NowPlaying | null;
  code: string;
};

// ── 레이블/변형값을 TAG_META의 정식 키로 정규화 ───────────────────────────
function normalizeTagKey(input: unknown): string | null {
  if (input == null) return null;

  const raw =
    typeof input === "string"
      ? input
      : (input as any).key ?? (input as any).tag ?? (input as any).value ?? "";

  const s = String(raw).trim();
  if (!s) return null;

  // 이미 키면 통과
  if (Object.prototype.hasOwnProperty.call(TAG_META as object, s)) return s;

  const lower = s.toLowerCase();

  // 라벨(표시값)과 대소문자만 다른 경우 매칭
  for (const k of Object.keys(TAG_META as object)) {
    if (String(tagLabel(k as any)).toLowerCase() === lower) return k;
  }

  // 하이픈/공백 제거 등 캐노니컬라이즈 후 별칭 매핑
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

// ── 컴포넌트 ─────────────────────────────────────────────────────────────
export default function RoomCard({ room }: { room: RoomLike }) {
  const router = useRouter();

  const {
    title,
    hostNickname,
    isPrivate = false,
    tags = [],
    listenersCount = 0,
    limitedListeners,
    nowPlaying,
    code,
  } = room;

  const normalizedTags = Array.isArray(tags)
    ? (tags
        .map((t) => normalizeTagKey(t))
        .filter((k): k is string => Boolean(k)) as string[])
    : [];

  const isFull =
    typeof limitedListeners === "number" &&
    limitedListeners > 0 &&
    listenersCount >= limitedListeners;

  const progress = nowPlaying?.durationSec
    ? Math.min(
        100,
        ((nowPlaying.positionMs ?? 0) / (nowPlaying.durationSec * 1000)) * 100
      )
    : 0;

  return (
    <div className="rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm transition hover:shadow-md hover:ring-[#17171B]/25">
      <div className="p-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-[#17171B] truncate">
            {title}
          </h3>
          {isPrivate && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#17171B]/5 px-2 py-0.5 text-xs text-[#17171B] ring-1 ring-[#17171B]/15">
              <Lock className="h-3.5 w-3.5 text-[#17171B]" />
              잠금
            </span>
          )}
        </div>

        {/* 방장 */}
        <p className="mt-1 text-sm text-gray-500">
          방장:{" "}
          <span className="font-medium text-gray-700">{hostNickname}</span>
        </p>

        {/* 현재 재생 */}
        {nowPlaying && (
          <div className="mt-3 rounded-xl bg-gray-50 p-3 ring-1 ring-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-800">
              <Music2 className="h-4 w-4 text-gray-400" />
              <span className="truncate">{nowPlaying.title}</span>
              <span className="text-gray-300">·</span>
              <span className="truncate text-gray-600">
                {nowPlaying.artist}
              </span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-rose-100">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-rose-400 to-rose-100 transition-[width]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* 태그 */}
        {!!normalizedTags.length && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {normalizedTags.map((k) => (
              <span
                key={k}
                className={`rounded-full px-2 py-0.5 text-xs ${tagClasses(k)}`}
                title={tagLabel(k)}
              >
                {tagLabel(k)}
              </span>
            ))}
          </div>
        )}

        {/* 푸터 */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm">
            <Users2
              className={`h-4 w-4 ${
                isFull ? "text-rose-600" : "text-gray-500"
              }`}
            />
            <span
              className={`${
                isFull ? "text-rose-700 font-semibold" : "text-gray-800"
              }`}
            >
              {listenersCount}
              {typeof limitedListeners === "number"
                ? ` / ${limitedListeners}`
                : ""}{" "}
              명
            </span>
            {isFull && (
              <span className="ml-2 rounded-full bg-rose-50 px-2 py-0.5 text-xs text-rose-700 ring-1 ring-rose-200">
                가득참
              </span>
            )}
          </div>

          <button
            onClick={() => router.push(`/room/${code}`)}
            disabled={isFull}
            className={[
              "rounded-full px-4 py-1.5 text-xs font-medium transition focus:outline-none cursor-pointer",
              "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#17171B]/30",
              isFull
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#17171B] text-white hover:opacity-90",
            ].join(" ")}
          >
            입장하기
          </button>
        </div>
      </div>
    </div>
  );
}
