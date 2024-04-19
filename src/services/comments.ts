import { Comment } from "@/types/Comment";
import { db, commentsCollection } from "@/utils/firebase";
import {
  DocumentReference,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export async function index(): Promise<Comment[]> {
  const querySnapshot = await getDocs(commentsCollection);

  const localPosts = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return localPosts as Comment[];
}

export async function show(id: string): Promise<Comment> {
  const docRef = doc(db, "comments", id);
  const querySnapshot = await getDoc(docRef);
  const localPost = {
    ...(querySnapshot.data() as Comment),
    id: querySnapshot.id,
  };

  return localPost;
}

export async function store(comment: Comment): Promise<DocumentReference> {
  const docRef = await addDoc(commentsCollection, comment);
  return docRef;
}

export async function update(comment: Comment): Promise<DocumentReference> {
  const docRef = doc(db, "comments", String(comment.id));
  await updateDoc(docRef, comment);

  return docRef;
}

export async function destroy(id: string) {
  const docRef = doc(db, "comments", id);
  await deleteDoc(docRef);
}
