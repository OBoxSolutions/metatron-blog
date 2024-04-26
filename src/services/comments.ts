import { Comment } from "@/types/Comment";
import { db, commentsCollection } from "@/utils/firebase";
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

export async function index(query?: Query): Promise<Comment[]> {
  let querySnapshot = null;

  if (query) {
    querySnapshot = await getDocs(query);
  } else {
    querySnapshot = await getDocs(commentsCollection);
  }

  const comments = querySnapshot.docs.map((doc: DocumentData) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return comments as Comment[];
}

export async function show(id: string): Promise<Comment> {
  const docRef = doc(db, "comments", id);
  const querySnapshot = await getDoc(docRef);
  const localComment = {
    ...(querySnapshot.data() as Comment),
    id: querySnapshot.id,
  };

  return localComment;
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
