/** The fields the blog index needs for one post. Dates arrive preformatted. */
export interface BlogPostSummary {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  dateIso: string;
  dateLabel: string;
}
