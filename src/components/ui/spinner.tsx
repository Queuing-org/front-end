// components/ui/Spinner.tsx
"use client";

import React from "react";

interface SpinnerProps {
  size?: number; // px 단위 크기
  thickness?: number; // border 두께(px)
  label?: string; // 접근성용 라벨
  className?: string;
}

export default function Spinner({
  size = 28,
  thickness = 3,
  label = "로딩 중…",
  className = "",
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      aria-live="polite"
      aria-busy="true"
      className={`inline-block ${className}`}
    >
      <div
        className="animate-spin rounded-full border-[#17171B]/20 border-t-[#17171B]"
        style={{ width: size, height: size, borderWidth: thickness }}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
