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

export const findUserByEmail = async (email: string): Promise<any> => {
  try {
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.empty);
    if (!querySnapshot.empty) {
      return {ok:false, msg:"Usuario ya existe en la BD"}
    }

    if(querySnapshot.empty){
      return {ok:true}
    }
    
  } catch (error) {
    console.error("Error al buscar usuario por email:", error);
    throw error;
  }
};
