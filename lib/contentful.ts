import { createClient } from "contentful";
import type { ContentfulArticle, ContentfulCategory } from "@/types/contentful";

if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error(
    "Missing Contentful environment variables. Please add CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN to your .env.local file.",
  );
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getCategories(): Promise<ContentfulCategory[]> {
  const response = await client.getEntries({
    content_type: "category",
    order: ["fields.title"] as any,
    include: 2,
  });

  return response.items as unknown as ContentfulCategory[];
}

export async function getArticles(): Promise<ContentfulArticle[]> {
  const response = await client.getEntries({
    content_type: "article",
    order: ["-fields.publishDate"] as any,
    include: 2,
  });

  return response.items as unknown as ContentfulArticle[];
}

export async function getArticleBySlug(
  slug: string,
): Promise<ContentfulArticle | null> {
  const response = await client.getEntries({
    content_type: "article",
    "fields.slug": slug,
    include: 2,
    limit: 1,
  });

  if (response.items.length === 0) {
    return null;
  }

  return response.items[0] as unknown as ContentfulArticle;
}

export async function getRecentArticles(
  limit: number = 3,
): Promise<ContentfulArticle[]> {
  const response = await client.getEntries({
    content_type: "article",
    "fields.featuredOnHomepage": true,
    order: ["-fields.publishDate"] as any,
    include: 4,
    limit,
  });

  return response.items as unknown as ContentfulArticle[];
}
export async function getArticlesBySlugs(
  slugs: string[],
): Promise<ContentfulArticle[]> {
  const response = await client.getEntries({
    content_type: "article",
    "fields.slug[in]": slugs.join(","),
    include: 2,
  });

  return response.items as unknown as ContentfulArticle[];
}

export async function getQuranArticles(): Promise<ContentfulArticle[]> {
  const response = await client.getEntries({
    content_type: "article",
    "fields.showInQuranDropdown": true,
    order: ["fields.title"] as any,
    include: 2,
  });

  return response.items as unknown as ContentfulArticle[];
}
