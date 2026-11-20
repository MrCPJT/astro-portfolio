import { Tag } from "../common/Tag";
import type { BlogPostSummary } from "./types";

interface BlogCardProps {
  post: BlogPostSummary;
}

export function BlogCard(props: BlogCardProps) {
  const { post } = props;

  return (
    <a
      href={`/blog/${post.slug}`}
      class="surface-card group block relative rounded-lg border shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:border-[var(--color-primary)] dark:shadow-none"
    >
      <div class="p-6 h-full flex flex-col justify-between">
        <h3 class="text-xl font-medium  mb-3 transition-colors">
          {post.title}
        </h3>

        <p class="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
          {post.summary}
        </p>

        <div class="flex flex-col gap-4 text-sm text-[var(--color-text-muted)]">
          <time datetime={post.dateIso}>{post.dateLabel}</time>

          <div class="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <Tag>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}
