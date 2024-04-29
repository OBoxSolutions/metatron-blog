import { Post } from "@/types/Post";

import { useMemo } from "react";

export default function useSearch(
  posts: Post[],
  searchText?: string,
): [Post[]] {
  const searchResults = useMemo(() => {
    if (!searchText) {
      console.log("000");
      return posts;
    }

    if (!posts?.length) {
      return [];
    }

    let filteredPosts: Post[] = [];

    const internalFilteredModels: Post[] = [];
    const searchTextLower = searchText.toLowerCase();

    for (const item of posts) {
      let isMatch = false;

      for (const key of Object.keys(item) as (keyof Post)[]) {
        isMatch = !!item[key]
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchTextLower);

        if (isMatch) break;
      }

      isMatch && internalFilteredModels.push(item);
    }

    filteredPosts = internalFilteredModels;

    return filteredPosts;
  }, [searchText, posts]);

  return [searchResults];
}
