"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Lock, Camera, Pencil, X, Check } from "lucide-react";
import { useState } from "react";

export default function MyProfile() {
  // 하드코딩 데이터 (UI 전용)
  const [avatarUrl] = useState("/default-avatar.jpg");
  const [userId] = useState("user_123456");
  const [nickname, setNickname] = useState("dj_sparrow");
  const [statusMessage, setStatusMessage] =
    useState("오늘도 신청곡 받습니다 🎧");

  // 편집 토글
  const [isEditing, setIsEditing] = useState(false);

  // 편집 버퍼 (취소 시 원복)
  const [editNickname, setEditNickname] = useState(nickname);
  const [editStatus, setEditStatus] = useState(statusMessage);

  const startEdit = () => {
    setEditNickname(nickname);
    setEditStatus(statusMessage);
    setIsEditing(true);
  };
  const cancelEdit = () => {
    setIsEditing(false);
  };
  const saveEdit = () => {
    setNickname(editNickname);
    setStatusMessage(editStatus);
    setIsEditing(false);
  };

  return (
    <div className="min-h-dvh bg-white text-[#17171B]">
      {/* 페이지 헤더 */}
      <header>
        <div className="mx-auto max-w-4xl px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <h1 className="text-lg font-semibold">내 프로필</h1>
            </div>

            {/* 우측 탭/버튼 영역 */}
            <div className="flex items-center gap-2">
              <Link
                href="/settings/password"
                className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-[#17171B] hover:bg-gray-50"
              >
                <Lock className="h-3.5 w-3.5" />
                비밀번호 변경
              </Link>

              {!isEditing ? (
                <button
                  type="button"
                  onClick={startEdit}
                  className="inline-flex items-center gap-1 rounded-full bg-[#17171B] px-3 py-1 text-xs font-medium text-white hover:opacity-90"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  프로필 수정
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs hover:bg-gray-50"
                  >
                    <X className="h-3.5 w-3.5" />
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={saveEdit}
                    className="inline-flex items-center gap-1 rounded-full bg-[#17171B] px-3 py-1 text-xs font-medium text-white hover:opacity-90"
                  >
                    <Check className="h-3.5 w-3.5" />
                    저장
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 콘텐츠 */}
      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
          {/* 아바타 카드 */}
          <section className="rounded-2xl border border-gray-200 bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold">프로필 사진</h2>

            <div className="flex flex-col items-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                <Image
                  src={avatarUrl}
                  alt="프로필 이미지"
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>

              {isEditing ? (
                <>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                    onClick={() => {}}
                  >
                    <Camera className="h-4 w-4" />
                    이미지 변경
                  </button>
                  <p className="mt-2 text-xs text-gray-500">
                    JPG/PNG, 2MB 이하 권장
                  </p>
                </>
              ) : (
                <p className="mt-4 text-xs text-gray-500">
                  /public/default-avatar.jpg
                </p>
              )}
            </div>
          </section>

          {/* 정보 카드 */}
          <section className="rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-semibold">계정 정보</h2>
            </div>

            {/* 보기 모드 */}
            {!isEditing && (
              <div className="px-5 py-5 space-y-5">
                {/* 아이디 */}
                <div className="grid gap-1.5">
                  <span className="text-xs font-medium text-gray-600">
                    아이디
                  </span>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                    {userId}
                  </div>
                </div>

                {/* 닉네임 */}
                <div className="grid gap-1.5">
                  <span className="text-xs font-medium text-gray-600">
                    닉네임
                  </span>
                  <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
                    {nickname}
                  </div>
                </div>

                {/* 한 줄 소개 */}
                <div className="grid gap-1.5">
                  <span className="text-xs font-medium text-gray-600">
                    한줄소개
                  </span>
                  <div className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm leading-relaxed">
                    {statusMessage || (
                      <span className="text-gray-400">
                        등록된 소개가 없습니다.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 편집 모드 */}
            {isEditing && (
              <form
                className="px-5 py-5 space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* 아이디 (수정 불가) */}
                <div className="grid gap-2">
                  <label className="text-xs font-medium text-gray-600">
                    아이디
                  </label>
                  <input
                    value={userId}
                    disabled
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 outline-none"
                  />
                  <p className="text-xs text-gray-500">
                    로그인에 사용되는 고유 식별자입니다.
                  </p>
                </div>

                {/* 닉네임 */}
                <div className="grid gap-2">
                  <label className="text-xs font-medium text-gray-600">
                    닉네임
                  </label>
                  <input
                    value={editNickname}
                    onChange={(e) => setEditNickname(e.target.value)}
                    placeholder="닉네임을 입력하세요"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#17171B]/10"
                  />
                </div>

                {/* 한 줄 소개 */}
                <div className="grid gap-2">
                  <label className="text-xs font-medium text-gray-600">
                    한줄소개
                  </label>
                  <textarea
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    placeholder="자기소개를 입력하세요"
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#17171B]/10"
                  />
                  <div className="flex justify-end">
                    <span className="text-[11px] text-gray-400">
                      {editStatus.length} / 80
                    </span>
                  </div>
                </div>

                {/* 저장/취소는 헤더 오른쪽 버튼 사용 */}
              </form>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
