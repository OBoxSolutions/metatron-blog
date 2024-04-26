import { useMemo, useState } from "react";

import { documentId, query, where } from "firebase/firestore";
import { commentsCollection } from "../firebase";

import { index } from "@/services/comments";

import { Comment } from "@/types/Comment";

export function useCommentsWithUsers(commentsIds: string[]): Array<Comment[]> {
  const [comments, setComments] = useState<Comment[]>([]);

  useMemo(async () => {
    if (!commentsIds.length) return [];

    const qComments = query(
      commentsCollection,
      where(documentId(), "in", commentsIds),
    );
    const comments = await index(qComments);

    if (!comments) return;

    const usersIds = comments.map((comment) => comment.userId);

    const qUsers = query(
      commentsCollection,
      where(documentId(), "in", usersIds),
    );
    const users = await index(qUsers);

    setComments(
      comments.map((comment) => {
        const user = users.find((user) => user.id === comment.userId);
        return {
          ...comment,
          user,
        };
      }),
    );
  }, [commentsIds]);

  return [comments] as const;
}
