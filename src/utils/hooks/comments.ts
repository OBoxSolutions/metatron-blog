import { useMemo, useState } from "react";

import { documentId, query, where } from "firebase/firestore";
import { commentsCollection } from "../firebase";

import { index as indexComments } from "@/services/comments";
import { index as indexUsers } from "@/services/users";

import { CommentWithUser } from "@/types/Comment";

export function useCommentsWithUsers(
  commentsIds: string[],
): Array<CommentWithUser[]> {
  const [comments, setComments] = useState<CommentWithUser[]>([]);

  useMemo(async () => {
    if (!commentsIds.length) return [];

    const qComments = query(
      commentsCollection,
      where(documentId(), "in", commentsIds),
    );
    const comments = await indexComments(qComments);

    if (!comments) return;

    const usersIds = comments.map((comment) => comment.userId);

    const qUsers = query(
      commentsCollection,
      where(documentId(), "in", usersIds),
    );
    const users = await indexUsers(qUsers);

    setComments(
      comments.map((comment) => {
        const user = users.find((user) => user.id === comment.userId);

        return {
          ...comment,
          user: user ?? {
            name: "Anonymous",
            email: "",
          },
        };
      }),
    );
  }, [commentsIds]);

  return [comments] as const;
}
