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
  hostAvatarUrl: string;
  isPrivate: boolean;
  tags: string[];
  listenersCount: number;
  thumbnail: string;
};

// {
//   code: "E24QC45",
//   title: "카페 BGM",
//   hostNickname: "aryu_1217",
//   hostAvatarUrl: "/default-avatar.jpg",
//   isPrivate: false,
//   tags: ["Chill", "K-POP"],
//   listenersCount: 8,
//   thumbnail: "/room-dummy-img/room-img1.png",
// },
