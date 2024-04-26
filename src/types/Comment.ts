import { User } from "./User";

export type Comment = {
  id?: string;
  postId?: string;
  userId?: string;
  text: string;
};

export type CommentInput = {
  id?: string;
  text: string;
};

export type CommentWithUser = Comment & { user: User };
