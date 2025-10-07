// src/dummy/history.ts
export type HistoryItem = {
  id: string;
  name: string;
  visitedAt: string; // ISO or formatted
};

export const HISTORY_DUMMY: HistoryItem[] = [
  { id: "h1", name: "새벽 감성 플리", visitedAt: "2025-10-05 23:10" },
  { id: "h2", name: "EDM Night", visitedAt: "2025-10-05 21:02" },
  { id: "h3", name: "Lo-fi Rain", visitedAt: "2025-10-04 18:40" },
];
