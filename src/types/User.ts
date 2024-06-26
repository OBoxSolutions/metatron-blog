export type User = {
  id?: string;
  postsIds?: string[];
  favoritesIds?: string[];
  commentsIds?: string[];
  name: string;
  image?: string;
  email: string;
};

export type RegisterUserInputs = {
  name: string;
  image?: FileList;
  email: string;
  password: string;
  confirmPassword?: string;
};
