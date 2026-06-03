interface TagProps {
  children: string;
}

export function Tag(props: TagProps) {
  return (
    <span class="rounded border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-2 py-1 text-sm text-[var(--color-text-muted)]">
      {props.children}
    </span>
  );
}
