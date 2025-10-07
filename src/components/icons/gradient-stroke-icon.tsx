// src/components/icons/gradient-stroke-icon.tsx
"use client";

import { useId } from "react";
import type { ComponentType } from "react";

type LucideIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
};

type Stop = { offset: string; color: string; opacity?: number };

// 👇 트렌디 팔레트 프리셋
export const GRADIENT_PALETTES = {
  pastel: [
    { offset: "0%", color: "#FF7AB6" }, // pink
    { offset: "20%", color: "#FF9A62" }, // peach
    { offset: "40%", color: "#FFD166" }, // warm yellow
    { offset: "60%", color: "#9BE15D" }, // lime mint
    { offset: "80%", color: "#64D9FF" }, // sky
    { offset: "100%", color: "#A78BFA" }, // soft violet
  ],
  aurora: [
    { offset: "0%", color: "#00F5A0" },
    { offset: "25%", color: "#00D9F5" },
    { offset: "55%", color: "#845EC2" },
    { offset: "80%", color: "#FF6F91" },
    { offset: "100%", color: "#FFC75F" },
  ],
} as const;

export default function GradientStrokeIcon({
  Icon,
  // 기본 팔레트: 파스텔
  stops = [...GRADIENT_PALETTES.pastel],
  // 기본 방향: 대각선 ↗︎ (좌하 → 우상)
  x1 = "0%",
  y1 = "100%",
  x2 = "100%",
  y2 = "0%",
  ...iconProps
}: {
  Icon: ComponentType<LucideIconProps>;
  stops?: Stop[];
  x1?: string;
  y1?: string;
  x2?: string;
  y2?: string;
} & LucideIconProps) {
  const rawId = useId();
  const gradId = `grad-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <span className="relative inline-grid place-items-center">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={gradId} x1={x1} y1={y1} x2={x2} y2={y2}>
            {stops.map((s, i) => (
              <stop
                key={i}
                offset={s.offset}
                stopColor={s.color}
                stopOpacity={s.opacity ?? 1}
              />
            ))}
          </linearGradient>
        </defs>
      </svg>
      <Icon {...iconProps} stroke={`url(#${gradId})`} />
    </span>
  );
}
