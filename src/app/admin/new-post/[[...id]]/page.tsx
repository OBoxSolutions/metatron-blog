"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

type PostInputs = {
  title: string;
  description: string;
  content: string;
};

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostInputs>();

  const onSubmit: SubmitHandler<PostInputs> = async (data) => {
    setLoading(true);
    console.log(data);
    return;

    const post = {
      id: String(params?.id) ?? "",
      date: String(new Date().getUTCDate()),
      userId: "1",
      image: "",
      isFeatured: false,
      ...data,
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

  const router = useRouter();

  useEffect(() => {
    if (!params.id) return;

    const loadPost = async () => {
      setPost(await show(String(params.id)));
    };

    loadPost();
  }, [params.id]);

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

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText
              label="Title"
              defaultValue={post?.title ?? ""}
              required="The title is required"
              registerName="title"
              register={register}
              error={errors.title}
            ></InputText>
            <TextArea
              label="Description"
              required="The description is required"
              defaultValue={post.description ?? ""}
              registerName="description"
              register={register}
              minLength={{
                value: 40,
                message: "At least 40 characters are required",
              }}
              maxLength={{
                value: 120,
                message: "A maximum of 120 characters is allowed",
              }}
              error={errors.description}
            ></TextArea>

            <ReactQuill
              defaultValue={post.content ?? ""}
              onChange={(_, _1, _2, editor) => {
                console.log(editor.getContents());
                register("content").onChange({
                  type: "content",
                  target: { name: "content", value: editor.getContents() },
                });
              }}
              onBlur={(_, _1, editor) =>
                register("content").onBlur({
                  type: "content",
                  target: { name: "content", value: editor.getContents() },
                })
              }
              ref={(ref) => register("content").ref(ref)}
            ></ReactQuill>
            <Button className="ml-auto" loading={isLoading}>
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>
    </Section>
  );
}
