import { db } from "@/utils/firebaseAdmin";

import Image from "next/image";
import Link from "next/link";

import Aside from "./_components/Aside";
import Section from "./_components/Section";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import SearchBar from "@/components/SearchBar";

import { Post } from "@/types/Post";

async function loadPosts(): Promise<Post[]> {
  const snapshot = await db.collection("posts").get();

  const posts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Post, "id">),
  }));

  return posts;
}

function sortPostsByDate(posts: Post[]) {
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

function filterPosts(posts: Post[]) {
  const sortedPosts = sortPostsByDate(posts);

  return sortedPosts.reduce(
    (acc, post) => {
      if (post.isFeatured) {
        acc[0].push(post);
      } else if (acc[1].length < 4) {
        acc[1].push(post);
      } else {
        acc[2].push(post);
      }
      return acc;
    },
    [[], [], []] as Post[][],
  );
}

export default async function Home() {
  const posts = await loadPosts();

  const [featuredPosts, latestPosts, otherPosts] = filterPosts(posts);

  const firstFeaturedPost = featuredPosts.shift();
  const firstLatestPost = latestPosts.shift();

  //const goToSearchView = (searchText: string) => {
  //  router.push(`/search/${searchText}`);
  //};

  return (
    <div className="max-w-screen-xl mx-auto">
      <Section className="flex flex-col md:w-fit relative mx-auto my-52">
        <h2 className="text-xl md:text-3xl text-gray-300 absolute -top-10">
          A tech blog for you
        </h2>
        <h1 className="text-6xl lg:text-8xl">
          Welcome to{" "}
          <span className="relative">
            <span className="py-1 px-24 bg-accent absolute rounded-full invisible md:visible"></span>
            Metatron
          </span>
        </h1>
        <SearchBar
          className="md:ml-52 mt-10"
          //onSubmit={(text) => goToSearchView(text)}
        ></SearchBar>
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

                <div>
                  <p className="text-gray-400 text-base mt-3 text-center">
                    {firstFeaturedPost.date}
                  </p>
                </div>
              </Link>
            </article>{" "}
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
              <CardBody className="flex flex-col gap-3">
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
