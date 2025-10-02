import type { HistoryItem } from "@/types/song-history";

/**
 * 주어진 items에서 id에 해당하는 항목의 투표를 토글/변경한 새 배열을 반환.
 * 완전 순수(pure) 함수라 테스트/재사용에 유리.
 */
export function toggleVote(
  items: HistoryItem[],
  id: string,
  vote: "up" | "down"
): HistoryItem[] {
  return items.map((it) => {
    if (it.id !== id) return it;

    let like = it.likeCount;
    let dislike = it.dislikeCount;
    let next: HistoryItem["myVote"] = it.myVote;

    if (it.myVote === vote) {
      if (vote === "up") like = Math.max(0, like - 1);
      else dislike = Math.max(0, dislike - 1);
      next = null;
    } else {
      if (vote === "up") {
        like += 1;
        if (it.myVote === "down") dislike = Math.max(0, dislike - 1);
      } else {
        dislike += 1;
        if (it.myVote === "up") like = Math.max(0, like - 1);
      }
      next = vote;
    }

    return { ...it, likeCount: like, dislikeCount: dislike, myVote: next };
  });
}
