"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "@/components/hamburger/sidebar";
import Header from "@/components/header";

export default function MainLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-white text-[#17171B] grid grid-rows-[auto,1fr]">
      <div className="px-8">
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />
      </div>

      <div
        className="grid pr-4 min-h-0"
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        <Sidebar open={sidebarOpen} />
        <main className="min-w-0 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
