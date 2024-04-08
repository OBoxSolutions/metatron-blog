import { useMemo } from "react";

import Image from "next/image";

import Aside from "@/components/site/Aside";
import Section from "@/components/site/Section";
import Card from "@/components/app/Card";
import CardBody from "@/components/app/CardBody";

import { Post } from "@/types/Post";

import posts from "./posts";

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
          <h3 className="text-3xl mt-4">{firstFeaturedPost.name}</h3>

          <div className="md:grid grid-cols-6 gap-16">
            <article className="col-span-4">
              <Image
                className="w-full"
                src={firstFeaturedPost.image}
                alt={firstFeaturedPost.description}
                width={500}
                height={400}
              ></Image>
              <p className="mt-5">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Blanditiis, veritatis ex? Tempora nisi corrupti, ut repudiandae
                molestiae accusantium, nam error amet cum aliquam repellendus
                ratione iste recusandae esse voluptas a?
              </p>
            </article>
            <Aside className="col-span-2" posts={featuredPosts}></Aside>
          </div>
        </Section>
      )}

      {firstLatestPost && (
        <Section title="Latest">
          <h3 className="text-3xl mt-4">{firstLatestPost.name}</h3>
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
