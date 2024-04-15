"use client";

import { FormEvent, useEffect, useState } from "react";
import { addDoc, doc, getDoc } from "firebase/firestore";

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

  const addPost = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    if (!target.checkValidity()) return;

    const formData = new FormData(target);

    const data = {
      date: new Date().getUTCDate(),
      userId: 1,
      title: formData.get("title"),
      description: formData.get("description"),
      image: "",
      isFeatured: false,
      content: formData.get("content"),
    };

    await addDoc(postsCollection, data);
    setLoading(false);
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

      <h2 className="text-3xl mb-2">Posts</h2>
      <Card>
        <CardBody>
          {isLoading && <p>Loading baby</p>}

          <form className="flex flex-col gap-4" onSubmit={addPost}>
            <InputText
              label="Title"
              required={true}
              value={post?.title ?? ""}
            ></InputText>
            <TextArea
              label="Description"
              required={true}
              value={post.description ?? ""}
            ></TextArea>
            <TextArea
              label="Content"
              required={true}
              value={post.content ?? ""}
            ></TextArea>
            <Button className="ml-auto">Submit</Button>
          </form>
        </CardBody>
      </Card>
    </Section>
  );
}
