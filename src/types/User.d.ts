type User = {
  id?: string;
  postsIds?: string[];
  favoritesIds?: string[];
  commentsIds?: string[];
  name: string;
  image?: string;
  email: string;
};

type RegisterUserInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export { User, RegisterUserInputs };
