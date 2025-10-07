// src/dummy/friends.ts
export type Friend = {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
};

export const FRIENDS_DUMMY: Friend[] = [
  { id: "f1", name: "큐붕이", avatar: "/default-avatar.jpg", online: true },
  { id: "f2", name: "큐돌이", avatar: "/default-avatar.jpg", online: false },
  { id: "f3", name: "큐순이", avatar: "/default-avatar.jpg", online: true },
  { id: "f4", name: "큐큐큐", avatar: "/default-avatar.jpg", online: false },
];
