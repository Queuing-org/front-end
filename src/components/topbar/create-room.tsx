// src/components/topbar/create-room.tsx
"use client";

import { useState, useMemo } from "react";
import Modal from "@/components/ui/modal";
import { PlusCircle, X } from "lucide-react";
import { TAG_META, tagLabel, tagClasses } from "@/constants/tags";
import { useRouter } from "next/navigation";

const MAX_TAGS = 5;

// 무료 구간 권장 하드캡 (서버 상황 따라 조정)
const FREE_HARD_CAP = 50;
// 절대 상한(보수적으로; 결제/인프라 확장 시 올리기)
const ABSOLUTE_HARD_CAP = 200;

export default function CreateRoom() {
  const [open, setOpen] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // ✅ 추가
  const [maxListeners, setMaxListeners] = useState<number>(25);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");

  const router = useRouter();

  const tags = useMemo(() => Object.keys(TAG_META), []);

  function toggleTag(key: string) {
    setSelectedTags((prev) => {
      const set = new Set(prev);
      if (set.has(key)) set.delete(key);
      else {
        if (set.size >= MAX_TAGS) return prev;
        set.add(key);
      }
      return Array.from(set);
    });
  }

  async function onCreate() {
    if (submitting) return;
    setSubmitting(true);
    setErr("");

    // --- 간단 검증 ---
    if (!title.trim()) {
      setErr("방 이름을 입력해 주세요.");
      setSubmitting(false);
      return;
    }
    if (isPrivate && password.length < 4) {
      setErr("비밀번호는 4자 이상이어야 합니다.");
      setSubmitting(false);
      return;
    }
    const cap = Number(maxListeners);
    if (!Number.isInteger(cap) || cap < 2) {
      setErr("최대 인원은 2명 이상이어야 합니다.");
      setSubmitting(false);
      return;
    }
    if (cap > ABSOLUTE_HARD_CAP) {
      setErr(`최대 인원은 ${ABSOLUTE_HARD_CAP}명을 초과할 수 없습니다.`);
      setSubmitting(false);
      return;
    }

    router.push("/room/R23MP05");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-8 items-center cursor-pointer whitespace-nowrap select-none gap-1.5 rounded-full border border-gray-200 bg-[#17171B] px-3 text-[13px] leading-none font-medium text-white hover:opacity-90"
      >
        <PlusCircle className="h-4 w-4" />
        방생성
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#17171B]">
              새 방 만들기
            </h2>
            <button
              className="rounded-full p-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => setOpen(false)}
              aria-label="닫기"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {/* 방 이름 */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                방 이름
              </label>
              <input
                type="text"
                placeholder="예) 카페 BGM"
                className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-sm text-[#17171B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#17171B]/20"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* 비공개 여부 */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">비공개 방</label>
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="h-4 w-4 accent-[#17171B] cursor-pointer"
              />
            </div>

            {/* 비밀번호 입력 */}
            {isPrivate && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  비밀번호
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-sm text-[#17171B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#17171B]/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="mt-1 text-xs text-gray-500">4자 이상</p>
              </div>
            )}

            {/* ✅ 최대 인원 */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm text-gray-600 mb-1">
                  최대 인원
                </label>
              </div>

              <select
                className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-sm text-[#17171B] focus:outline-none focus:ring-2 focus:ring-[#17171B]/20"
                value={maxListeners}
                onChange={(e) => setMaxListeners(Number(e.target.value))}
                disabled={submitting}
              >
                {[10, 25, 50, 100, 200].map((n) => (
                  <option key={n} value={n}>
                    {n}명{n <= FREE_HARD_CAP ? " (무료 권장)" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* 태그(옵션) */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm text-gray-600 mb-1">
                  태그(선택)
                </label>
                <span className="text-[11px] text-gray-500">
                  {selectedTags.length}/{MAX_TAGS}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((t) => {
                  const active = selectedTags.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleTag(t)}
                      aria-pressed={active}
                      className={[
                        "rounded-full px-3 py-1 text-xs select-none transition",
                        "cursor-pointer hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#17171B]/20",
                        tagClasses(t),
                        active
                          ? "ring-2 ring-[#17171B] bg-[#17171B] text-black border-transparent"
                          : "",
                      ].join(" ")}
                      title={tagLabel(t)}
                    >
                      {tagLabel(t)}
                    </button>
                  );
                })}
              </div>
            </div>

            {err && <p className="text-xs text-red-500">{err}</p>}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              className="rounded-full px-3 py-1.5 text-sm text-[#17171B] hover:bg-gray-100 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              취소
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={onCreate}
              className="rounded-full bg-[#17171B] px-4 py-1.5 text-sm font-medium text-[#FFFAFA] hover:opacity-90 cursor-pointer disabled:opacity-60"
            >
              {submitting ? "만드는 중…" : "만들기"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
