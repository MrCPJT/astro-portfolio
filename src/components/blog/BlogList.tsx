import { For } from "solid-js";
import type { Accessor } from "solid-js";
import { BlogCard } from "@/components/blog/BlogCard";
import { FilterTagList } from "@/components/blog/FilterTagList";
import type { BlogPostSummary } from "@/components/blog/types";

interface Props {
  posts: BlogPostSummary[];
  allTags: string[];
  selectedTagsSignal: Accessor<string[]>;
  onTagToggle: (tag: string) => void;
}

export default function BlogList(props: Props) {
  return (
    <div class="space-y-8 md:space-y-0">
      {/* Mobile filter */}
      <div class="md:hidden">
        <FilterTagList
          tags={props.allTags}
          selectedTagsSignal={props.selectedTagsSignal}
          onTagToggle={props.onTagToggle}
        />
      </div>

      {/* Blog list */}
      <div class="grid grid-cols-1 gap-6">
        <For each={props.posts}>{(post) => <BlogCard post={post} />}</For>
      </div>
    </div>
  );
}
