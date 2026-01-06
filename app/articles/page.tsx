import { Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getArticles, getCategories } from "@/lib/contentful";

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  // Fetch articles and categories from Contentful
  const contentfulArticles = await getArticles();
  const contentfulCategories = await getCategories();

  // Extract search params
  const categoryFilter = searchParams?.category;

  // Map Contentful articles to the expected format
  const articles = contentfulArticles
    .filter((article) => {
      if (!categoryFilter || categoryFilter === "All") return true;
      const articleCategory =
        article.fields.category?.[0]?.fields?.title || "Uncategorized";
      return articleCategory === categoryFilter;
    })
    .map((article) => ({
      id: article.sys.id,
      slug: article.fields.slug,
      title: article.fields.title,
      excerpt: article.fields.excerpt,
      category: article.fields.category?.[0]?.fields?.title || "Uncategorized",
      image: article.fields.thumbnail?.fields?.file?.url
        ? `https:${article.fields.thumbnail.fields.file.url}`
        : article.fields.category?.[0]?.fields?.catimage?.fields?.file?.url
        ? `https:${article.fields.category[0].fields.catimage.fields.file.url}`
        : "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800",
      date: article.fields.publishDate,
      readTime: "5 min read",
      author: article.fields.author || "Islamic Scholar",
    }));

  // Map categories
  const categories = [
    "All",
    ...contentfulCategories.map((cat) => cat.fields.title),
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 to-cyan-700 text-white py-20">
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

      {/* Category Filter */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Link
                key={category}
                href={
                  category === "All"
                    ? "/articles"
                    : `/articles?category=${encodeURIComponent(category)}`
                }
              >
                <Button
                  variant={
                    category === (categoryFilter || "All")
                      ? "default"
                      : "outline"
                  }
                  className={
                    category === (categoryFilter || "All")
                      ? "bg-teal-600 hover:bg-teal-700"
                      : ""
                  }
                >
                  {category}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`}>
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-teal-600 transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(article.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-sm text-gray-700">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="mt-4 flex items-center text-teal-600 font-medium group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
