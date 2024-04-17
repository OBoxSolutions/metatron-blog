"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  DocumentData,
  addDoc,
  arrayUnion,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { commentsCollection, db, postsCollection } from "@/utils/firebase";

import { Post } from "@/types/Post";
import { Comment } from "@/types/Comment";

import Section from "../../_components/Section";
import CommentForm from "@/app/(site)/_components/CommentForm";
import Aside from "../../_components/Aside";

export default function PostSinglePage({
  params,
}: {
  params: { id?: string[] };
}) {
  const [post, setPost] = useState<Post>({
    userId: "1",
    title: "",
    description: "",
    date: "",
    image: "",
    isFeatured: false,
    content: "",
  });
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (!params.id) return;

    const loadData = async () => {
      const commentsIds = await loadPost();
      if (commentsIds?.length) {
        await loadComments(commentsIds);
      }
    };

    const loadPost = async () => {
      const docRef = doc(db, "posts", String(params.id));
      const querySnapshot = await getDoc(docRef);

      const localPost = querySnapshot.data() as Post;
      localPost && setPost(localPost);

      const queryFeaturedPosts = query(
        postsCollection,
        where("isFeatured", "==", true),
      );

      const querySnapshotFeaturedPosts = await getDocs(queryFeaturedPosts);

      const featuredPosts = querySnapshotFeaturedPosts.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Post[];
      setFeaturedPosts(featuredPosts.splice(0, 4));

      return localPost?.commentsIds ?? [];
    };

    const loadComments = async (commentsIds: string[]) => {
      const q = query(
        commentsCollection,
        where(documentId(), "in", commentsIds),
      );
      const querySnapshot = await getDocs(q);

      setComments(
        querySnapshot.docs.map((doc: DocumentData) => ({
          ...doc.data(),
          id: doc.id,
        })),
      );
    };

    loadData();
  }, [params.id]);

  const addComment = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const commentRef = await addDoc(commentsCollection, {
        text: formData.get("text"),
        postId: params.id,
        userId: "1",
      });

      const comment = await getDoc(commentRef);

      const docRef = doc(db, "posts", String(params.id));
      comment?.id &&
        (await updateDoc(docRef, {
          commentsIds: arrayUnion(comment?.id),
        }));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <Section title={post?.title ?? ""}>
        <div className="md:grid grid-cols-6 gap-16">
          <div className="col-span-4">
            <article>{post.content}</article>
            <div className="flex flex-col gap-4 mt-16">
              {comments.map((comment) => (
                <div className="flex" key={`comment-id-${comment?.id}`}>
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
            <CommentForm onSubmit={addComment} className="mt-8"></CommentForm>
          </div>
          <div className="col-span-2">
            <Aside title="Featured" posts={featuredPosts}></Aside>
          </div>
        </div>
      </Section>
    </div>
  );
}