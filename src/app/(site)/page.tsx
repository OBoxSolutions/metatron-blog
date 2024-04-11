import { useMemo } from "react";

import Image from "next/image";

import Aside from "./_components/Aside";
import Section from "./_components/Section";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";

import { Post } from "@/types/Post";

import posts from "../_posts";

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
  const [firstFeaturedPost, featuredPosts] = useFeaturedPosts(posts);
  const [firstLatestPost, latestPosts] = useLatestPosts(posts);
  const otherPosts = useOtherPosts(posts, featuredPosts, latestPosts);

  return (
    <div className="max-w-screen-xl mx-auto">
      {firstFeaturedPost && (
        <Section>
          <div className="md:grid grid-cols-6 gap-16">
            <article className="col-span-4">
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
              <Image
                className="w-full"
                src={firstLatestPost.image}
                alt={firstLatestPost.description}
                width={500}
                height={400}
              ></Image>
              <p className="mt-5">{firstLatestPost.description}</p>
            </article>
            <Aside className="col-span-2" posts={latestPosts}></Aside>
          </div>
        </Section>
      )}

      <hr></hr>

      <Section className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {otherPosts.map((post) => (
          <Card key={`index-post-${post.id}`}>
            <Image
              className="w-full"
              src={post.image}
              alt={post.description}
              width={355}
              height={240}
            ></Image>
            <CardBody>{post.description}</CardBody>
          </Card>
        ))}
      </Section>
    </div>
  );
}
