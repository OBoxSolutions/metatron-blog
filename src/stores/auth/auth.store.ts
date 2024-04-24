import { usersCollection } from "@/utils/firebase";
import { findUserByEmail } from "@/utils/findUserByEmail";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import bcrypt from "bcryptjs";

interface AuthState {
  uid: string | null;
  checking: boolean;
  logged: boolean;
  name: string | null;
  email: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void | null>;
  register: (nombre: string, email: string, password: string) => Promise<{ok:boolean; msg?:string}>;
  logout: () => void;
  // TODO: Implementar JWT
  // checkToken: () => Promise<boolean>;
}

const authStoreApi: StateCreator<AuthState & AuthActions> = (set) => ({
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,

  login: async (email: string, password: string) => {
    try {
      const userData = await findUserByEmail(email);

      if (!userData) return null;

      const cryptPassword = userData.password;
      const validPassword = bcrypt.compareSync(password, cryptPassword);

      if (!validPassword) {
        return null;
      }
      set((state) => ({
        ...state,
        uid: userData.id,
        name: userData.name,
        email,
        checking: false,
        logged: true,
      }));
    } catch (error) {
      console.log(error);
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
    const {ok,msg} = await findUserByEmail(email);

    if (!ok && msg) {
      console.log("ese usuario ya existe")
      return {msg, ok};
    } 
    
      // encriptar contraña
      const salt = bcrypt.genSaltSync();
      password = bcrypt.hashSync(password, salt);

      const docRef = await addDoc(usersCollection, {
        name,
        email,
        password,
      });
      const uid = docRef.id;
      set({ uid, name, email, checking: false, logged: true });

      return {
        ok: true 
      }
    } catch (error) {
      return { ok: false, msg: error }
    }
  },

  logout: () => {
    set({
      uid: null,
      checking: true,
      logged: false,
      name: null,
      email: null,
    });
  },
});

const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(authStoreApi, {
      name: "auth-storage",
    })
  )
);
export default useAuthStore;
