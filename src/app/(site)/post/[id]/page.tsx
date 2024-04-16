"use client";

import { FormEvent, useEffect, useState } from "react";
import { addDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";

import { commentsCollection, db, postsCollection } from "@/utils/firebase";
import { Post } from "@/types/Post";

import Section from "../../_components/Section";
import CommentForm from "@/app/(site)/_components/CommentForm";
import Aside from "../../_components/Aside";
import { toast } from "sonner";

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

  useEffect(() => {
    if (!params.id) return;

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
    };

    loadPost();
  }, [params.id]);

  const addComment = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      await addDoc(commentsCollection, {
        text: formData.get("text"),
        postId: params.id,
        userId: "1",
      });
      toast.success("Comment added successfully");
    } catch (error) {
      console.log((error as Error).message);
      toast.error("Problem adding comment");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <Section title={post?.title ?? ""}>
        <div className="md:grid grid-cols-6 gap-16">
          <div className="col-span-4">
            <article>{post.content}</article>
            <CommentForm className="mt-8" onSubmit={addComment}></CommentForm>
          </div>
          <div className="col-span-2">
            <Aside title="Featured" posts={featuredPosts}></Aside>
          </div>
        </div>
      </Section>
    </div>
  );
}
