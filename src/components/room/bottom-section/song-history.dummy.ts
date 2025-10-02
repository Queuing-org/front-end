import type { HistoryItem } from "@/types/song-history";

export const DUMMY_SONG_HISTORY: HistoryItem[] = [
  {
    id: "t1",
    title: "Ditto",
    artist: "NewJeans",
    thumbnail: "https://i.ytimg.com/vi/pSUydWEqKwE/hqdefault.jpg",
    duration: "3:05",
    playedAt: "12:21",
    likeCount: 128,
    dislikeCount: 4,
    myVote: "up",
  },
  {
    id: "t2",
    title: "Hype Boy",
    artist: "NewJeans",
    thumbnail: "https://i.ytimg.com/vi/11cta61wi0g/hqdefault.jpg",
    duration: "2:59",
    playedAt: "12:17",
    likeCount: 96,
    dislikeCount: 3,
    myVote: null,
  },
  {
    id: "t3",
    title: "Attention",
    artist: "NewJeans",
    thumbnail: "https://i.ytimg.com/vi/js1CtxSY38I/hqdefault.jpg",
    duration: "3:00",
    playedAt: "12:13",
    likeCount: 74,
    dislikeCount: 6,
    myVote: "down",
  },
  {
    id: "t4",
    title: "OMG",
    artist: "NewJeans",
    thumbnail: "https://i.ytimg.com/vi/sVTy_wmn5SU/hqdefault.jpg",
    duration: "3:33",
    playedAt: "12:08",
    likeCount: 51,
    dislikeCount: 1,
    myVote: null,
  },
  {
    id: "t5",
    title: "ASAP",
    artist: "NewJeans",
    thumbnail: "https://i.ytimg.com/vi/IkF6r2S7tU4/hqdefault.jpg",
    duration: "2:52",
    playedAt: "12:04",
    likeCount: 39,
    dislikeCount: 2,
    myVote: null,
  },
];

/** 상태 변경용으로 복사본을 쓰고 싶을 때 */
export const cloneSongHistory = () => DUMMY_SONG_HISTORY.map((x) => ({ ...x }));
