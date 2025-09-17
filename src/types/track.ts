export type Track = {
  id: string; // 큐에서 key 용도
  videoId: string; // YouTube 영상 ID
  title: string;
  durationSec: number;
  thumbnailUrl: string;
  addedAt: number; // 언제 추가됐는지 (Date.now())
};
