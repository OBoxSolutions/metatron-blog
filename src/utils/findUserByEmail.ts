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

export const findUserByEmail = async (
  email: string,
  form: "register" | "login"
): Promise<{ ok: boolean; msg?: string; user?: User }> => {
  try {
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.empty);

    if (!querySnapshot.empty && form === "login") {
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

      return { ok: true, user };
    }

    if (!querySnapshot.empty) {
      return { ok: false, msg: "Usuario ya existe en la BD" };
    }

    return { ok: false };

  } catch (error) {
    console.error("Error al buscar usuario por email:", error);
    throw error;
  }
};
