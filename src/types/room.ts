export type NowPlaying = {
  title: string;
  artist: string;
  durationSec: number;
  positionMs: number;
};

export type Room = {
  id: string;
  code: string;
  title: string;
  hostNickname: string;
  isPrivate: boolean;
  tags: string[];
  listenersCount: number;
  capacity: number | null; // null 허용
  isUnlimited: boolean;
  nowPlaying: NowPlaying;
};
