export type Post = {
  id?: string | number;
  userId: string;
  commentsIds?: string[];
  title: string;
  description: string;
  date: string;
  image: string;
  isFeatured: boolean;
  content: string;
};
