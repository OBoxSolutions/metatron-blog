"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import InputText from "@/components/InputText";
import TextArea from "@/components/TextArea";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import Button from "@/components/Button";
import Breadcrumbs from "@/components/Breadcrumbs";

import Section from "@/app/admin/_components/Section";

import { Post } from "@/types/Post";
import { toast } from "sonner";
import { show, store, update } from "@/services/posts";

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

  const router = useRouter();

  useEffect(() => {
    if (!params.id) return;

    const loadPost = async () => {
      setPost(await show(String(params.id)));
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
      id: String(params?.id) ?? "",
      date: String(new Date().getUTCDate()),
      userId: "1",
      title: String(formData.get("title")),
      description: String(formData.get("description")),
      image: "",
      isFeatured: false,
      content: String(formData.get("content")),
    };

    try {
      params?.id && params.id[0]
        ? await updatePost(post)
        : await storePost(post);
    } catch (error) {
      toast.error((error as Error).message);
      console.log(error);
    }

    setLoading(false);
  };

  const storePost = async (post: Post) => {
    await store(post);
    router.push("/admin/posts");
    toast.success("Post inserted successfully");
  };

  const updatePost = async (post: Post) => {
    await update(post);
    toast.success("Post updated successfully");
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
            <Button className="ml-auto" loading={isLoading}>
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>
    </Section>
  );
}
