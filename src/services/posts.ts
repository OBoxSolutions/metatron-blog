import { Post } from "@/types/Post";
import { db, postsCollection } from "@/utils/firebase";
import {
  DocumentData,
  DocumentReference,
  Query,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export async function index(query?: Query): Promise<Post[]> {
  let querySnapshot = null;

  if (query) {
    querySnapshot = await getDocs(query);
  } else {
    querySnapshot = await getDocs(postsCollection);
  }

  const localPosts = querySnapshot.docs.map((doc: DocumentData) => {
    return { ...doc.data(), id: doc.id };
  });

  return localPosts as Post[];
}

export async function show(id: string): Promise<Post> {
  const docRef = doc(db, "posts", id);
  const querySnapshot = await getDoc(docRef);
  const localPost = { ...(querySnapshot.data() as Post), id: querySnapshot.id };

  return localPost;
}

export async function store(post: Post): Promise<DocumentReference> {
  const docRef = await addDoc(postsCollection, post);
  return docRef;
}

export async function update(post: Post): Promise<DocumentReference> {
  const docRef = doc(db, "posts", String(post.id));
  await updateDoc(docRef, post);

  return docRef;
}

export async function destroy(id: string) {
  const docRef = doc(db, "posts", id);
  await deleteDoc(docRef);
}
