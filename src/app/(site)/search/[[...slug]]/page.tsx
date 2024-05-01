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
import useSearch from "@/utils/hooks/search";

export default function Search({ params }: { params: { slug?: string } }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [filteredPosts] = useSearch(posts, searchText);

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await index();
      setPosts(posts);
    };

    setSearchText(decodeURIComponent(params.slug ?? ""));

    loadPosts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-5xl mt-20">Search Posts</h1>
      <SearchBar
        className="md:mr-80"
        onSubmit={(value) => setSearchText(value)}
        defaultValue={searchText}
      ></SearchBar>

      <Section className="flex flex-col gap-3">
        {filteredPosts.map((post) => (
          <Link key={`index-post-${post.id}`} href={`/post/${post.id}`}>
            <Card className="md:grid md:grid-cols-[380px_1fr] gap-3">
              <Image
                className="h-auto w-full"
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
