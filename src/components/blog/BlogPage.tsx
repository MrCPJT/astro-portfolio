import { createMemo, createSignal } from "solid-js";
import BlogList from "@/components/blog/BlogList";
import { FilterTagList } from "@/components/blog/FilterTagList";
import type { BlogPostSummary } from "@/components/blog/types";

interface BlogPageProps {
  /** Newest first. */
  posts: BlogPostSummary[];
  allTags: string[];
}

export default function BlogPage(props: BlogPageProps) {
  const [selectedTags, setSelectedTags] = createSignal<string[]>([]);

  const isAllSelected = () => selectedTags().length === props.allTags.length;

  // No selection and a full selection both show every post.

  const filteredPosts = createMemo(() => {
    const tags = selectedTags();
    if (tags.length === 0 || isAllSelected()) return props.posts;

    return props.posts.filter((post) =>
      tags.every((tag) => post.tags.includes(tag)),
    );
  });

  const handleTagToggle = (tag: string) => {
    if (tag === "all") {
      if (isAllSelected()) {
        setSelectedTags([]);
      } else {
        setSelectedTags([...props.allTags]);
      }
    } else {
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
      );
    }
  };

  return (
    <div class="flex flex-col md:flex-row gap-6">
      <aside class="hidden md:block w-64 shrink-0">
        <FilterTagList
          tags={props.allTags}
          selectedTagsSignal={selectedTags}
          isAllSelectedSignal={isAllSelected}
          onTagToggle={handleTagToggle}
        />
      </aside>
      <main class="flex-1">
        <BlogList
          posts={filteredPosts()}
          allTags={props.allTags}
          selectedTagsSignal={selectedTags}
          isAllSelectedSignal={isAllSelected}
          onTagToggle={handleTagToggle}
        />
      </main>
    </div>
  );
}
