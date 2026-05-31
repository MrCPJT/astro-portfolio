import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2).filter((arg) => arg !== "--");
const [notebookArg, collectionArg = "blog", slugArg] = args;

if (!notebookArg) {
  console.error(
    "Usage: pnpm run notebook:convert -- notebooks/source/example.ipynb blog example-slug",
  );
  process.exit(1);
}

const notebookPath = resolve(notebookArg);
const collection = collectionArg;
const slug =
  slugArg ||
  basename(notebookPath, extname(notebookPath))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

if (!existsSync(notebookPath)) {
  console.error(`Notebook not found: ${notebookPath}`);
  process.exit(1);
}

if (!["blog", "projects"].includes(collection)) {
  console.error("Collection must be either 'blog' or 'projects'.");
  process.exit(1);
}

const contentDir = resolve("src", "content", collection, slug);
const publicAssetDir = resolve("public", "notebooks", slug);
mkdirSync(contentDir, { recursive: true });
mkdirSync(publicAssetDir, { recursive: true });

const nbconvert = spawnSync(
  "jupyter",
  [
    "nbconvert",
    "--to",
    "markdown",
    "--output",
    "index",
    "--output-dir",
    contentDir,
    notebookPath,
  ],
  { stdio: "inherit", shell: true },
);

const mdPath = join(contentDir, "index.md");

if (nbconvert.status !== 0) {
  console.warn(
    "Jupyter nbconvert was unavailable or failed. Falling back to a basic Markdown/code-cell converter.",
  );
  const notebook = JSON.parse(readFileSync(notebookPath, "utf8"));
  const fallbackMarkdown = notebook.cells
    .map((cell) => {
      const source = Array.isArray(cell.source)
        ? cell.source.join("")
        : cell.source || "";

      if (cell.cell_type === "markdown") {
        return source.trim();
      }

      if (cell.cell_type === "code") {
        return `\`\`\`python\n${source.trim()}\n\`\`\``;
      }

      return "";
    })
    .filter(Boolean)
    .join("\n\n");

  writeFileSync(mdPath, fallbackMarkdown);
}

let markdown = readFileSync(mdPath, "utf8");

const generatedAssetDir = join(contentDir, "index_files");
if (existsSync(generatedAssetDir)) {
  rmSync(publicAssetDir, { recursive: true, force: true });
  mkdirSync(dirname(publicAssetDir), { recursive: true });
  renameSync(generatedAssetDir, publicAssetDir);
  markdown = markdown.replaceAll("index_files/", `/notebooks/${slug}/`);
}

if (!markdown.startsWith("---")) {
  const title = slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  const frontmatter =
    collection === "blog"
      ? `---\ntitle: "${title}"\nsummary: "Notebook-derived analysis awaiting final summary."\ndate: ${new Date().toISOString().slice(0, 10)}\ntags: ["jupyter", "data science"]\ncategories: "notebooks"\ndraft: true\n---\n\n`
      : `---\ntitle: "${title}"\ncompany: "Portfolio case study"\nstartDate: "${new Date().toISOString().slice(0, 10)}"\ndomain: "Notebook-derived data science project"\nsummary: "Notebook-derived case study awaiting final summary."\ntechnologies: ["Python", "Jupyter"]\n---\n\n`;

  markdown = `${frontmatter}${markdown}`;
}

writeFileSync(mdPath, markdown);

console.log(`Converted ${notebookPath} to ${mdPath}`);
