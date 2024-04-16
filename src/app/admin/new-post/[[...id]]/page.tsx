"use client";

import { FormEvent, useEffect, useState } from "react";
import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

import InputText from "@/components/InputText";
import TextArea from "@/components/TextArea";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import Button from "@/components/Button";
import Breadcrumbs from "@/components/Breadcrumbs";

import Section from "@/app/admin/_components/Section";

import { db, postsCollection } from "@/utils/firebase";
import { Post } from "@/types/Post";

export default function NewPost({ params }: { params: { id?: string[] } }) {
  const [isLoading, setLoading] = useState(false);
  const [post, setPost] = useState<Post>({
    userId: "1",
    title: "",
    description: "",
    date: "",
    image: "",
    isFeatured: false,
    content: "",
  });

  useEffect(() => {
    if (!params.id) return;

    const loadPost = async () => {
      const docRef = doc(db, "posts", String(params.id));
      const querySnapshot = await getDoc(docRef);
      const localPost = querySnapshot.data() as Post;

      setPost(localPost);
    };

    loadPost();
  }, [params.id]);

  const submit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    if (!target.checkValidity()) return;

    const formData = new FormData(target);

    const post = {
      date: String(new Date().getUTCDate()),
      userId: "1",
      title: String(formData.get("title")),
      description: String(formData.get("description")),
      image: "",
      isFeatured: false,
      content: String(formData.get("content")),
    };

    params.id ? store(post) : update(post);

    setLoading(false);
  };

  const store = async (post: Post) => {
    await addDoc(postsCollection, post);
  };

  const update = async (post: Post) => {
    const docRef = doc(db, "posts", String(params.id));
    await updateDoc(docRef, post);
  };

  return (
    <Section width="max-w-2xl">
      <Breadcrumbs
        className="my-5"
        breadcrumbs={[
          {
            href: "/admin/posts",
            text: "Posts",
          },
          {
            href: "/admin/new-post",
            text: "New Post",
          },
        ]}
      ></Breadcrumbs>

      <h2 className="text-3xl mb-2">Make new post</h2>
      <Card>
        <CardBody>
          {isLoading && <p>Loading baby</p>}

          <form className="flex flex-col gap-4" onSubmit={submit}>
            <InputText
              label="Title"
              required={true}
              defaultValue={post?.title ?? ""}
            ></InputText>
            <TextArea
              label="Description"
              required={true}
              defaultValue={post.description ?? ""}
            ></TextArea>
            <TextArea
              label="Content"
              required={true}
              defaultValue={post.content ?? ""}
            ></TextArea>
            <Button className="ml-auto">Submit</Button>
          </form>
        </CardBody>
      </Card>
    </Section>
  );
}
