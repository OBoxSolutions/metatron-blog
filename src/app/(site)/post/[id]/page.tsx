"use client";

import { FormEvent, useEffect, useState, use } from "react";

import Image from "next/image";

import { arrayUnion, doc, query, updateDoc, where } from "firebase/firestore";

import { db, postsCollection } from "@/utils/firebase.browser";

import { Post } from "@/types/Post";

import CommentForm from "@/app/(site)/_components/CommentForm";

import UserImagePlaceholder from "@/components/UserImagePlaceholder";

import Section from "../../_components/Section";
import Aside from "../../_components/Aside";

import { index as indexPosts, show } from "@/services/posts";
import { store, show as showComment } from "@/services/comments";

import { useCommentsWithUsers } from "@/utils/hooks/comments";

export default function PostSinglePage(props: {
  params: Promise<{ id?: string }>;
}) {
  const params = use(props.params);
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
  const [loading, setLoading] = useState(false);
  const [commentsIds, setCommentsIds] = useState<string[]>([]);
  const [comments] = useCommentsWithUsers(commentsIds);

  useEffect(() => {
    if (!params.id) return;

    const loadData = async () => {
      const post = await loadPost();

      if (!post) return;

      setCommentsIds(post);
    };

    const loadPost = async () => {
      const localPost = await show(String(params.id));

      if (!localPost) return;

      setPost(localPost);

      const queryFeaturedPosts = query(
        postsCollection,
        where("isFeatured", "==", true),
      );

      const featuredPosts = await indexPosts(queryFeaturedPosts);

      if (!featuredPosts) return;

      setFeaturedPosts(featuredPosts.splice(0, 4));

      return localPost?.commentsIds ?? [];
    };

    loadData();
  }, [params.id, commentsIds]);

  const addComment = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      await store({
        text: formData.get("text") as string,
        postId: params.id ? params.id : undefined,
        userId: "1",
      });

      const comment = await showComment(params.id ? params.id : "");

      const docRef = doc(db, "posts", String(params.id));
      comment?.id &&
        (await updateDoc(docRef, {
          commentsIds: arrayUnion(comment?.id),
        }));

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.log((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <Section title={post?.title ?? ""}>
        <div className="md:grid grid-cols-6 gap-16 mt-16">
          <div className="col-span-4">
            <Image
              src={post.image}
              alt={post.description}
              width={600}
              height={600}
              className="w-full"
            ></Image>
            <article
              dangerouslySetInnerHTML={{ __html: post?.content }}
            ></article>
            <div className="flex flex-col gap-4 mt-16">
              <h3 className="text-3xl">Comments</h3>
              {comments.map((comment) => (
                <div className="flex gap-5" key={`comment-id-${comment?.id}`}>
                  <UserImagePlaceholder />
                  <div className="flex flex-col">
                    <p className="text-sm text-slate-400">
                      {comment?.user?.name}
                    </p>
                    <p>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <CommentForm
              onSubmit={addComment}
              className="mt-8"
              loading={loading}
            ></CommentForm>
          </div>
          <div className="col-span-2">
            <Aside title="Featured" posts={featuredPosts}></Aside>
          </div>
        </div>
      </Section>
    </div>
  );
}
