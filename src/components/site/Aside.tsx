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
            <li key={`post-${post.id}`}>
              <article className="flex">
                <Image src={post.image} alt={post.description} />
                <div>
                  <h4>{post.name}</h4>
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
