const text = (node) =>
  node.type === "text" ? node.value : (node.children ?? []).map(text).join("");

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

/** Wraps each h2 and the content after it in a section, for project pages only. */
export function rehypeProjectSections() {
  return (tree, file) => {
    if (!file.path?.includes("/src/content/projects/")) return;

    const children = [];
    let current = null;

    for (const node of tree.children) {
      if (node.type === "element" && node.tagName === "h2") {
        current = {
          type: "element",
          tagName: "section",
          properties: {
            className: ["project-section"],
            dataSection: slugify(text(node)),
          },
          children: [node],
        };
        children.push(current);
      } else if (current) {
        current.children.push(node);
      } else {
        children.push(node);
      }
    }

    tree.children = children;
  };
}
