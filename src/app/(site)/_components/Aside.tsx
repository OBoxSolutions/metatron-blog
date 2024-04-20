import { Post } from "@/types/Post";

import Image from "next/image";
import Link from "next/link";

type AsideProps = {
  title?: string;
  posts: Post[];
  className?: string;
};

const Aside = (props: AsideProps) => {
  return (
    <aside className={props.className}>
      {props?.title && <h3 className="text-xl">{props.title}</h3>}

      <ul>
        {props.posts.map((post) => {
          return (
            <li key={`post-${post.id}`} className="mb-10">
              <article>
                <Link
                  href={`/post/${post.id}`}
                  className="flex gap-3 items-center"
                >
                  <Image
                    src={post.image}
                    alt={post.description}
                    width={176}
                    height={103}
                  />
                  <div className="text-base">
                    <p className="text-xl">{post.title}</p>
                    <p>{post.description}</p>
                  </div>
                </Link>
              </article>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Aside;
