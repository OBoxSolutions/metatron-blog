import { User } from "@/types/User";
import { db, usersCollection } from "@/utils/firebase.browser";
import {
  DocumentReference,
  Query,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export async function index(query?: Query): Promise<User[]> {
  let querySnapshot = null;

  if (query) {
    querySnapshot = await getDocs(query);
  } else {
    querySnapshot = await getDocs(usersCollection);
  }

  const localPosts = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return localPosts as User[];
}

export async function show(id: string): Promise<User> {
  const docRef = doc(db, "users", id);
  const querySnapshot = await getDoc(docRef);
  const localPost = { ...(querySnapshot.data() as User), id: querySnapshot.id };

  return localPost;
}

export async function store(user: User): Promise<DocumentReference> {
  const docRef = await addDoc(usersCollection, user);
  return docRef;
}

export async function update(user: User): Promise<DocumentReference> {
  const docRef = doc(db, "users", String(user.id));
  await updateDoc(docRef, user);

  return docRef;
}

export async function destroy(id: string) {
  const docRef = doc(db, "users", id);
  await deleteDoc(docRef);
}
