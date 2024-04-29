"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import Section from "@/app/(site)/_components/Section";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import SearchBar from "@/components/SearchBar";

import { Post } from "@/types/Post";

import Link from "next/link";

import { index } from "@/services/posts";

export default function Search({ params }: { params: { slug?: string } }) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await index();
      setPosts(posts);
    };

    loadPosts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-5xl mt-20">Search Posts</h1>
      <SearchBar
        className="md:mr-80 pl-0"
        defaultValue={decodeURIComponent(params?.slug ?? "")}
      ></SearchBar>

      <Section className="flex flex-col gap-3">
        {posts.map((post) => (
          <Link key={`index-post-${post.id}`} href={`/post/${post.id}`}>
            <Card className="flex">
              <Image
                className="h-full w-auto"
                src={post.image}
                alt={post.description}
                width={355}
                height={240}
              ></Image>
              <CardBody className="flex flex-col justify-center gap-3">
                <h3 className="text-2xl">{post.title}</h3>
                <p>{post.description}</p>
                <div>
                  <p className="text-gray-400 text-base">{post.date}</p>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </Section>
    </div>
  );
}
