import type { CollectionEntry } from "astro:content";
import { Tag } from "../common/Tag";

interface BlogCardProps {
  post: CollectionEntry<"blog">;
}

export function BlogCard(props: BlogCardProps) {
  const { post } = props;

  return (
    <a
      href={`/${post.collection}/${post.slug}`}
      class="surface-card group block relative rounded-lg border shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:border-[var(--color-primary)] dark:shadow-none"
    >
      <div class="p-6 h-full flex flex-col justify-between">
        <h3 class="text-xl font-medium  mb-3 transition-colors">
          {post.data.title}
        </h3>

        <p class="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
          {post.data.summary}
        </p>

        <div class="flex flex-col gap-4 text-sm text-[var(--color-text-muted)]">
          <time datetime={post.data.date.toISOString()}>
            {new Date(post.data.date).toLocaleDateString()}
          </time>

          <div class="flex gap-2 flex-wrap">
            {post.data.tags.map((tag) => (
              <Tag>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}
