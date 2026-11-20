import { For, type Accessor } from "solid-js";

interface FilterTagListProps {
  tags: string[];
  selectedTagsSignal: Accessor<string[]>;
  onTagToggle: (tag: string) => void;
}

export function FilterTagList(props: FilterTagListProps) {
  const { tags, selectedTagsSignal, onTagToggle } = props;

  return (
    <div class="surface-card flex flex-col space-y-4 rounded-lg border p-4 shadow-sm">
      <p class="font-bold text-[var(--color-text)]">Tags:</p>

      <div
        class="flex flex-col space-y-2"
        role="group"
        aria-label="Filter posts by tag"
      >
        <For each={tags}>
          {(tag) => (
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedTagsSignal().includes(tag)}
                onChange={() => onTagToggle(tag)}
                class="form-checkbox h-4 w-4 rounded accent-[var(--color-primary)]"
              />
              <span
                class={`text-sm font-medium transition-colors ${
                  selectedTagsSignal().includes(tag)
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)]"
                }`}
              >
                {tag}
              </span>
            </label>
          )}
        </For>
      </div>
    </div>
  );
}
