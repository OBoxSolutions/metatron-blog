import { Post } from "@/types/Post";

import Image from "next/image";

type AsideProps = {
  title?: string;
  posts: Post[];
};

const Aside = (props: AsideProps) => {
  return (
    <aside>
      {props?.title && <h3 className="text-xl">{props.title}</h3>}

      <ul>
        {props.posts.map((post) => {
          return (
            <li key={`post-${post.id}`} className="mb-10">
              <article className="flex gap-3 items-center">
                <Image
                  src={post.image}
                  alt={post.description}
                  width={176}
                  height={103}
                />
                <div className="text-base">
                  <p>{post.description}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Aside;
