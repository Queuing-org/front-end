// src/app/shop/page.tsx (or wherever)
// 요구: 프로필 테두리 / 프로필 배경 / 마우스 효과를 고를 수 있는 탭 UI (미니 프리뷰 포함)
"use client";

import { useState } from "react";
import { Sparkles, MousePointerClick, Palette } from "lucide-react";

type TabKey = "border" | "background" | "cursor";

const BORDER_PRESETS = [
  { id: "none", label: "없음", className: "ring-0" },
  { id: "soft", label: "Soft", className: "ring-2 ring-gray-300" },
  {
    id: "neon",
    label: "네온",
    className: "ring-2 ring-fuchsia-500 shadow-[0_0_12px_#d946ef80]",
  },
  { id: "gold", label: "골드", className: "ring-2 ring-amber-500" },
];

const BG_PRESETS = [
  { id: "plain", label: "Plain", className: "bg-white" },
  {
    id: "gradient1",
    label: "핑크그라데",
    className: "bg-gradient-to-br from-pink-200 to-rose-300",
  },
  {
    id: "gradient2",
    label: "블루그라데",
    className: "bg-gradient-to-br from-sky-200 to-indigo-300",
  },
  {
    id: "pattern",
    label: "Dots",
    className:
      "bg-[radial-gradient(circle,_#e5e7eb_1px,_transparent_1px)] [background-size:10px_10px] bg-white",
  },
];

const CURSOR_PRESETS = [
  { id: "default", label: "기본", className: "cursor-default" },
  { id: "pointer", label: "포인터", className: "cursor-pointer" },
  { id: "sparkle", label: "스파클(가짜)", className: "cursor-crosshair" }, // 데모: 실제 이펙트는 후처리 가능
];

export default function ShopPage() {
  const [tab, setTab] = useState<TabKey>("border");
  const [border, setBorder] = useState(BORDER_PRESETS[0].id);
  const [bg, setBg] = useState(BG_PRESETS[0].id);
  const [cursor, setCursor] = useState(CURSOR_PRESETS[0].id);

  const borderCls =
    BORDER_PRESETS.find((b) => b.id === border)?.className ?? "";
  const bgCls = BG_PRESETS.find((b) => b.id === bg)?.className ?? "";
  const cursorCls =
    CURSOR_PRESETS.find((c) => c.id === cursor)?.className ?? "";

  return (
    <div className="min-h-dvh bg-white text-[#17171B]">
      <div className="mx-auto w-full max-w-3xl p-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">프로필 커스터마이징</h1>
          <button
            className="rounded-full border border-gray-200 bg-[#17171B] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90"
            onClick={() =>
              alert(`저장됨\nborder=${border}\nbg=${bg}\ncursor=${cursor}`)
            }
          >
            적용하기
          </button>
        </div>

        {/* 미니 프리뷰 */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div
              className={`size-20 rounded-2xl overflow-hidden ring-offset-2 ${borderCls}`}
            >
              <div className={`size-full ${bgCls}`} />
            </div>
            <div className="text-sm text-gray-600">
              <div>
                테두리: <span className="font-medium">{border}</span>
              </div>
              <div>
                배경: <span className="font-medium">{bg}</span>
              </div>
              <div>
                마우스 효과: <span className="font-medium">{cursor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 탭 */}
        <div className="mb-3 flex gap-2">
          <TabButton
            active={tab === "border"}
            onClick={() => setTab("border")}
            icon={<Palette className="h-4 w-4" />}
          >
            프로필 테두리
          </TabButton>
          <TabButton
            active={tab === "background"}
            onClick={() => setTab("background")}
            icon={<Palette className="h-4 w-4" />}
          >
            프로필 배경
          </TabButton>
          <TabButton
            active={tab === "cursor"}
            onClick={() => setTab("cursor")}
            icon={<MousePointerClick className="h-4 w-4" />}
          >
            마우스 효과
          </TabButton>
        </div>

        {/* 탭 패널 */}
        <div className={`rounded-2xl border border-gray-100 p-4 ${cursorCls}`}>
          {tab === "border" && (
            <OptionGrid>
              {BORDER_PRESETS.map((opt) => (
                <OptionCard
                  key={opt.id}
                  selected={border === opt.id}
                  onClick={() => setBorder(opt.id)}
                  label={opt.label}
                >
                  <div
                    className={`size-12 rounded-xl ring-offset-2 ${opt.className}`}
                  >
                    <div className="size-full rounded-[10px] bg-white" />
                  </div>
                </OptionCard>
              ))}
            </OptionGrid>
          )}

          {tab === "background" && (
            <OptionGrid>
              {BG_PRESETS.map((opt) => (
                <OptionCard
                  key={opt.id}
                  selected={bg === opt.id}
                  onClick={() => setBg(opt.id)}
                  label={opt.label}
                >
                  <div
                    className={`size-12 rounded-xl overflow-hidden ${opt.className}`}
                  />
                </OptionCard>
              ))}
            </OptionGrid>
          )}

          {tab === "cursor" && (
            <OptionGrid>
              {CURSOR_PRESETS.map((opt) => (
                <OptionCard
                  key={opt.id}
                  selected={cursor === opt.id}
                  onClick={() => setCursor(opt.id)}
                  label={opt.label}
                  iconRight={
                    opt.id === "sparkle" ? (
                      <Sparkles className="h-3.5 w-3.5" />
                    ) : undefined
                  }
                >
                  <div
                    className={`size-12 rounded-xl bg-white border border-gray-200 ${opt.className}`}
                  />
                </OptionCard>
              ))}
            </OptionGrid>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- components ---------------- */

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium select-none",
        active
          ? "bg-[#17171B] text-white"
          : "bg-white text-[#17171B] border border-gray-200 hover:bg-gray-50",
      ].join(" ")}
      type="button"
    >
      {icon}
      {children}
    </button>
  );
}

function OptionGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {children}
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  label,
  iconRight,
  children,
}: {
  selected?: boolean;
  onClick?: () => void;
  label: string;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group flex items-center gap-3 rounded-xl border p-3 text-left transition-colors",
        selected
          ? "border-[#17171B] bg-gray-50"
          : "border-gray-200 hover:bg-gray-50",
      ].join(" ")}
    >
      {children}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{label}</p>
        <p className="text-xs text-gray-500">선택</p>
      </div>
      {iconRight}
    </button>
  );
}
