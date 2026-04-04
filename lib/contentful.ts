import { createClient } from "contentful";
import type {
  ContentfulArticle,
  ContentfulCategory,
  ContentfulVideo,
  ContentfulNews,
} from "@/types/contentful";

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

export async function getTopicCategories(): Promise<ContentfulCategory[]> {
  const response = await client.getEntries({
    content_type: "category",
    "fields.showInTopic": true,
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

export async function getVideos(): Promise<ContentfulVideo[]> {
  const response = await client.getEntries({
    content_type: "video",
    order: ["-fields.publishDate"] as any,
    include: 2,
  });

  return response.items as unknown as ContentfulVideo[];
}

export async function getNews(): Promise<ContentfulNews[]> {
  const response = await client.getEntries({
    content_type: "news",
    order: ["-fields.publishDate"] as any,
    include: 2,
  });

  return response.items as unknown as ContentfulNews[];
}

export async function getArticleBySlug(
  slug: string,
): Promise<ContentfulArticle | ContentfulNews | null> {
  // First try to find in articles
  const articleResponse = await client.getEntries({
    content_type: "article",
    "fields.slug": slug,
    include: 3,
    limit: 1,
  });

  if (articleResponse.items.length > 0) {
    return articleResponse.items[0] as unknown as ContentfulArticle;
  }

  // If not found, try news
  const newsResponse = await client.getEntries({
    content_type: "news",
    "fields.slug": slug,
    include: 3,
    limit: 1,
  });

  if (newsResponse.items.length > 0) {
    return newsResponse.items[0] as unknown as ContentfulNews;
  }

  return null;
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

export async function getHistoryArticles(): Promise<ContentfulArticle[]> {
  const response = await client.getEntries({
    content_type: "article",
    "fields.showInHistorySection": true,
    order: ["fields.title"] as any,
    include: 2,
    limit: 4,
  });

  return response.items as unknown as ContentfulArticle[];
}

export async function getArticlesByCategoryId(
  categoryId: string,
): Promise<ContentfulArticle[]> {
  const response = await client.getEntries({
    content_type: "article",
    "fields.category.sys.id": categoryId,
    order: ["fields.title"] as any,
    include: 2,
  });

  return response.items as unknown as ContentfulArticle[];
}

export async function getArticlesByCategory(
  categorySlug: string,
): Promise<ContentfulArticle[]> {
  const categories = await getCategories();
  const category = categories.find((cat) => cat.fields.slug === categorySlug);

  if (!category) return [];

  return getArticlesByCategoryId(category.sys.id);
}

export async function getNavbarCategories(): Promise<
  (ContentfulCategory & { articles: ContentfulArticle[] })[]
> {
  const categories = await getCategories();
  const navbarCategories = categories.filter(
    (cat) => cat.fields.showInNavbar === true,
  );

  const categoriesWithArticles = await Promise.all(
    navbarCategories.map(async (cat) => {
      const articles = await getArticlesByCategoryId(cat.sys.id);
      return { ...cat, articles };
    }),
  );

  return categoriesWithArticles;
}
