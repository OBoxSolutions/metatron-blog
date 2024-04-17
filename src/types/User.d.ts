type User = {
  id?: string;
  postsIds: string[];
  favoritesIds: string[];
  commentsIds?: string[];
  name: string;
  image: string;
  email: string;
};

export { User };
