"use client";

import { useMemo } from "react";

import { useEffect, useState } from "react";
import { DocumentData, getDocs } from "firebase/firestore";

import Image from "next/image";

import Aside from "./_components/Aside";
import Section from "./_components/Section";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";

import { Post } from "@/types/Post";

import Link from "next/link";
import { postsCollection } from "@/utils/firebase";
import SearchBar from "@/components/SearchBar";

function useFeaturedPosts(posts: Post[]): [Post | undefined, Post[]] {
  return useMemo(() => {
    const featuredPosts = posts.filter((post) => post.isFeatured);

    return [featuredPosts.shift(), featuredPosts.slice(0, 3)];
  }, [posts]);
}

function useLatestPosts(posts: Post[]): [Post | undefined, Post[]] {
  return useMemo(() => {
    const latestPosts = posts.sort(
      (a, b) => +new Date(a.date) - +new Date(b.date),
    );

    return [latestPosts.shift(), latestPosts.slice(0, 3)];
  }, [posts]);
}

function useOtherPosts(
  posts: Post[],
  featuredPosts: Post[],
  latestPosts: Post[],
) {
  return posts.filter(
    (post) => featuredPosts.includes(post) || latestPosts.includes(post),
  );
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [firstFeaturedPost, featuredPosts] = useFeaturedPosts(posts);
  const [firstLatestPost, latestPosts] = useLatestPosts(posts);
  const otherPosts = useOtherPosts(posts, featuredPosts, latestPosts);

  useEffect(() => {
    const loadPosts = async () => {
      const querySnapshot = await getDocs(postsCollection);
      setPosts(
        querySnapshot.docs.map((doc: DocumentData) => ({
          ...doc.data(),
          id: doc.id,
        })),
      );
    };

    loadPosts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto">
      <Section className="flex flex-col md:w-fit relative mx-auto my-52">
        <h2 className="text-xl md:text-3xl text-gray-300 absolute -top-10">
          A tech blog for you
        </h2>
        <h1 className="text-6xl lg:text-8xl">Welcome to Metatron</h1>
        <SearchBar className="md:ml-52 mt-10"></SearchBar>
      </Section>
      {firstFeaturedPost && (
        <Section>
          <div className="md:grid grid-cols-6 gap-16">
            <article className="col-span-4">
              <Link href={`/post/${firstFeaturedPost.id}`}>
                <Image
                  className="w-full"
                  src={firstFeaturedPost.image}
                  alt={firstFeaturedPost.description}
                  width={500}
                  height={400}
                ></Image>
                <h3 className="text-4xl mt-4 text-center">
                  {firstFeaturedPost.title}
                </h3>
              </Link>
            </article>
            <Aside className="col-span-2" posts={featuredPosts}></Aside>
          </div>
        </Section>
      )}

      {firstLatestPost && (
        <Section title="Latest">
          <h3 className="text-3xl mt-4">{firstLatestPost.title}</h3>
          <div className="md:grid grid-cols-6 gap-16">
            <article className="col-span-4">
              <Link href={`/post/${firstLatestPost.id}`}>
                <Image
                  className="w-full"
                  src={firstLatestPost.image}
                  alt={firstLatestPost.description}
                  width={500}
                  height={400}
                ></Image>
                <p className="mt-5">{firstLatestPost.description}</p>
              </Link>
            </article>
            <Aside className="col-span-2" posts={latestPosts}></Aside>
          </div>
        </Section>
      )}

      <hr></hr>

      <Section className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {otherPosts.map((post) => (
          <Link key={`index-post-${post.id}`} href={`/post/${post.id}`}>
            <Card>
              <Image
                className="w-full"
                src={post.image}
                alt={post.description}
                width={355}
                height={240}
              ></Image>
              <CardBody>{post.description}</CardBody>
            </Card>
          </Link>
        ))}
      </Section>
    </div>
  );
}
