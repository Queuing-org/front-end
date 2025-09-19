import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { currentVideoIdAtom } from "@/atoms/player";
import type { Track } from "@/types/track";

export const myQueueAtom = atomWithStorage<Track[]>("my-queue-v1", []);

export const enqueueOrPlayAtom = atom(null, (get, set, track: Track) => {
  const cur = get(myQueueAtom) ?? [];
  const now = get(currentVideoIdAtom);

  if (!now) {
    set(currentVideoIdAtom, track.videoId);
    set(myQueueAtom, cur); // 첫 곡은 큐에 안 넣음
  } else {
    set(myQueueAtom, [...cur, track]);
  }
});

export const advanceQueueAtom = atom(null, (get, set) => {
  const cur = get(myQueueAtom) ?? [];
  if (cur.length === 0) {
    set(currentVideoIdAtom, null);
    return;
  }
  const [next, ...rest] = cur;
  set(currentVideoIdAtom, next.videoId);
  set(myQueueAtom, rest);
});
