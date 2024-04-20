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
