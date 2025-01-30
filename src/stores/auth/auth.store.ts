import { addDoc } from "firebase/firestore";

import bcrypt from "bcryptjs";

import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { usersCollection } from "@/utils/firebase.browser";
import { findUserByEmail } from "@/utils/findUserByEmail";

interface AuthState {
  uid: string | null;
  checking: boolean;
  logged: boolean;
  name: string | null;
  email: string | null;
  postsIds?: string[];
  favoritesIds?: string[];
  commentsIds?: string[];
  image?: string;
}

interface UpdateUser {
  name?: string | undefined;
  email?: string | undefined;
  image?: string | undefined;
  newPassword?: string | undefined;
}

interface AuthActions {
  login: (
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; msg?: string | {} }>;
  register: (
    nombre: string,
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; msg?: string | {} }>;
  logout: () => void;
  updateUser: (newData: UpdateUser) => Promise<void>;
  // TODO: Implementar JWT
  // checkToken: () => Promise<boolean>;
}

const authStoreApi: StateCreator<AuthState & AuthActions> = (set) => ({
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
  postsIds: [],
  favoritesIds: [],
  commentsIds: [],
  image: "",

  login: async (email: string, password: string) => {
    try {
      const { ok, msg, user } = await findUserByEmail(email, "login");

      // para uso de la autentificacion aunque se deberia mostrar x cuestiones de seguridad
      // solo "credenciales incorrectas"
      if (!ok) {
        return { ok, msg: "Usuario no existe en BD" };
      }

      if (ok && user) {
        const cryptPassword = user.password;
        const validPassword = bcrypt.compareSync(password, cryptPassword);

        if (!validPassword) {
          return { ok: false, msg: "Contraseña incorrecta" };
        }
        set((state) => ({
          ...state,
          uid: user.id,
          name: user.name,
          email,
          checking: false,
          logged: true,
          image: user.image,
        }));
      }

      return { ok: true };
    } catch (error) {
      return { ok: false, msg: error || "Error desconocido" };
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      const { ok, msg } = await findUserByEmail(email, "register");

      if (!ok && msg) {
        return { ok, msg };
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

      set((state) => ({
        ...state,
        uid,
        name,
        email,
        checking: false,
        logged: true,
        image: "",
      }));

      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, msg: error || "Error desconocido" };
    }
  },

  logout: () => {
    set({
      uid: null,
      checking: true,
      logged: false,
      name: null,
      email: null,
      postsIds: [],
      favoritesIds: [],
      commentsIds: [],
      image: "",
    });
  },
  updateUser: async (newData: UpdateUser) => {
    set((state) => ({
      ...state,
      name: newData.name,
      email: newData.email,
      image: newData.image,
    }));
  },
});

const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(authStoreApi, {
      name: "auth-storage",
    }),
  ),
);
export default useAuthStore;
