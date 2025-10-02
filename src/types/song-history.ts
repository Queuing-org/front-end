export type HistoryItem = {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string; // "3:42"
  playedAt: string; // "12:07"
  likeCount: number;
  dislikeCount: number;
  myVote?: "up" | "down" | null;
};
