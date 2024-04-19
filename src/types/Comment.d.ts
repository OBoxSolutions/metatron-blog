type Comment = {
  id?: string;
  postId?: string;
  userId?: string;
  text: string;
};

type CommentInput = {
  id?: string;
  text: string;
};

export { Comment, CommentInput };
