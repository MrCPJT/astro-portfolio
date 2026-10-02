import rss from "@astrojs/rss";
import { getAllBlogPosts } from "../app/api/blog";
import { SITE_TITLE, SITE_DESCRIPTION } from "../app/static/consts";

export async function GET(context) {
  const posts = await getAllBlogPosts();

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en-gb</language>`,
  });
}
