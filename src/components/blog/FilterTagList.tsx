import { For, type Accessor } from "solid-js";

interface FilterTagListProps {
  tags: string[];
  selectedTagsSignal: Accessor<string[]>;
  isAllSelectedSignal: Accessor<boolean>;
  onTagToggle: (tag: string) => void;
}

export function FilterTagList(props: FilterTagListProps) {
  const { tags, selectedTagsSignal, isAllSelectedSignal, onTagToggle } = props;

  return (
    <div class="surface-card flex flex-col space-y-4 rounded-lg border p-4 shadow-sm">
      <button
        onClick={() => {
          onTagToggle("all");
        }}
        class={`text-left font-bold transition-colors ${
          isAllSelectedSignal()
            ? "text-[var(--color-text)]"
            : "text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
        }`}
      >
        All
      </button>

      <div class="flex flex-col space-y-2">
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
