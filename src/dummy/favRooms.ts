// dummy-rooms.js (또는 기존 파일 업데이트)

export type FavRoom = {
  id: string;
  title: string;
  thumbnail: string; // 정사각형 이미지 경로
  listenersCount: number;
};

export const FAV_ROOMS_DUMMY: FavRoom[] = [
  {
    id: "1",
    title: "카페 BGM",
    listenersCount: 8,
    thumbnail: "/room-dummy-img/room-img1.png",
  },
  {
    id: "2",
    title: "헬스장 근손실방지",
    listenersCount: 5,
    thumbnail: "/room-dummy-img/room-img2.png",
  },
  {
    id: "3",
    title: "잔잔한 공부방",
    listenersCount: 52,
    thumbnail: "/room-dummy-img/room-img3.png",
  },
  {
    id: "4",
    title: "잔잔한 공부방2",
    listenersCount: 52,
    thumbnail: "/room-dummy-img/room-img3.png",
  },
  {
    id: "5",
    title: "잔잔한 공부방3",
    listenersCount: 52,
    thumbnail: "/room-dummy-img/room-img3.png",
  },
];
