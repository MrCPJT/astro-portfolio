import { For, createEffect, createSignal } from "solid-js";
import type { CollectionEntry } from "astro:content";
import { Tag } from "@/components/common/Tag";

interface Props {
  initialLogs: CollectionEntry<"log">[];
  categories: string[];
}

export default function LogList(props: Props) {
  const [selectedCategory, setSelectedCategory] = createSignal<string>("all");
  const [filteredLogs, setFilteredLogs] = createSignal(props.initialLogs);

  createEffect(() => {
    const category = selectedCategory();
    if (category === "all") {
      setFilteredLogs(props.initialLogs);
      return;
    }
    const filtered = props.initialLogs.filter(
      (log) => log.data.category === category,
    );
    setFilteredLogs(filtered);
  });

  return (
    <div class="flex flex-col gap-6">
      <div class="flex gap-4 border-b border-[var(--color-border)]">
        <button
          class={`relative group px-4 py-2 text-sm transition-colors ${
            selectedCategory() === "all"
              ? "text-[var(--color-text)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
          }`}
          onClick={() => setSelectedCategory("all")}
        >
          All
          {selectedCategory() === "all" ? (
            <div class="absolute bottom-0 left-0 h-0.5 w-full bg-[var(--color-primary)]"></div>
          ) : (
            <div class="absolute bottom-0 left-0 h-0.5 w-full opacity-0"></div>
          )}
        </button>
        <For each={props.categories}>
          {(category) => (
            <button
              class={`relative group px-4 py-2 text-sm transition-colors ${
                selectedCategory() === category
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              {selectedCategory() === category ? (
                <div class="absolute bottom-0 left-0 h-0.5 w-full bg-[var(--color-primary)]"></div>
              ) : (
                <div class="absolute bottom-0 left-0 h-0.5 w-full bg-[var(--color-primary)] opacity-0 transition-opacity group-hover:opacity-100"></div>
              )}
            </button>
          )}
        </For>
      </div>

      <div>
        <For each={filteredLogs()}>
          {(log) => (
            <a
              href={`/log/${log.slug}`}
              class="hover-lift group block space-y-4 hover:no-underline"
              aria-labelledby={`log-title-${log.slug}`}
            >
              <div class="flex items-baseline justify-between">
                <h3
                  id={`log-title-${log.slug}`}
                  class="text-lg font-medium text-[var(--color-text)] transition-colors group-hover:text-[var(--color-primary)]"
                >
                  {log.data.title}
                </h3>
                <time
                  class="text-sm text-[var(--color-text-muted)]"
                  datetime={log.data.date.toISOString()}
                >
                  {new Date(log.data.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              {log.data.tags?.map((tag) => (
                <Tag>{tag}</Tag>
              ))}
              <div class="prose prose-slate max-w-none"></div>
            </a>
          )}
        </For>
      </div>
    </div>
  );
}
