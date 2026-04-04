import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getArticles,
  getCategories,
  getVideos,
  getNews,
} from "@/lib/contentful";
import ArticlesClient from "./ArticlesClient";

export default async function ArticlesPage() {
  // Fetch articles, categories, videos, and news from Contentful
  const [contentfulArticles, contentfulCategories, contentfulVideos, contentfulNews] = 
    await Promise.all([
      getArticles(),
      getCategories(),
      getVideos().catch(() => []), // Catch errors if content type doesn't exist yet
      getNews().catch(() => []),   // Catch errors if content type doesn't exist yet
    ]);

  // Map Contentful articles to the expected format
  const articles = contentfulArticles.map((article) => ({
    id: article.sys.id,
    slug: article.fields.slug,
    title: article.fields.title,
    excerpt: article.fields.excerpt,
    categories: article.fields.category?.map((cat) => cat.fields.title) || [],
    image: article.fields.thumbnail?.fields?.file?.url
      ? `https:${article.fields.thumbnail.fields.file.url}`
      : article.fields.category?.[0]?.fields?.catimage?.fields?.file?.url
      ? `https:${article.fields.category[0].fields.catimage.fields.file.url}`
      : "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: article.fields.publishDate,
    readTime: "5 min read",
    author: article.fields.author || "Islamic Scholar",
    type: "article" as const,
  }));

  // Map Videos
  const videos = contentfulVideos.map((video) => ({
    id: video.sys.id,
    title: video.fields.title,
    excerpt: video.fields.description,
    image: video.fields.thumbnail?.fields?.file?.url
      ? `https:${video.fields.thumbnail.fields.file.url}`
      : "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: video.fields.publishDate,
    youtubeUrl: video.fields.youtubeUrl,
    type: "video" as const,
  }));

  // Map News
  const news = contentfulNews.map((item) => ({
    id: item.sys.id,
    slug: item.fields.slug,
    title: item.fields.title,
    excerpt: item.fields.excerpt,
    categories: item.fields.category?.map((cat) => cat.fields.title) || [],
    image: item.fields.thumbnail?.fields?.file?.url
      ? `https:${item.fields.thumbnail.fields.file.url}`
      : item.fields.category?.[0]?.fields?.catimage?.fields?.file?.url
      ? `https:${item.fields.category[0].fields.catimage.fields.file.url}`
      : "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: item.fields.publishDate,
    readTime: "3 min read",
    author: item.fields.author || "News Desk",
    type: "news" as const,
  }));

  // Combine all items for the client component
  const allItems = [...articles, ...videos, ...news];

  // Map categories
  const categories = [
    "All",
    ...contentfulCategories.map((cat) => cat.fields.title),
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 to-cyan-700 text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Articles & Resources
            </h1>
            <p className="text-xl sm:text-2xl text-teal-50 max-w-3xl mx-auto">
              Explore our collection of articles to deepen your understanding of
              Islam and strengthen your faith.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid and Filter */}
      <ArticlesClient items={allItems} categories={categories} />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-cyan-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Want to Learn More?
          </h2>
          <p className="text-xl text-teal-50 mb-8">
            Subscribe to our newsletter to receive the latest articles and
            resources directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-teal-700 hover:bg-gray-100"
            >
              Subscribe Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-700"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
