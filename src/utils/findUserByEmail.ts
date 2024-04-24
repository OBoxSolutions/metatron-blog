import { getDocs, query, where } from "firebase/firestore";
import { usersCollection } from "./firebase";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  postsIds?: string[];
  favoritesIds?: string[];
  commentsIds?: string[];
  image?: string;
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    } else {
      const userData = querySnapshot.docs[0].data();
      const userId = querySnapshot.docs[0].id;

      const user: User = {
        id: userId,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        image: userData.image || undefined, // Usar undefined si no hay imagen
        postsIds: userData.postsIds || [],
        favoritesIds: userData.favoritesIds || [],
        commentsIds: userData.commentsIds || [],
      };

      return user;
    }
  } catch (error) {
    console.error("Error al buscar usuario por email:", error);
    throw error;
  }
};
