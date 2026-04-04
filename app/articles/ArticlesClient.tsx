"use client";

import { useSearchParams } from "next/navigation";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
}

interface ArticlesClientProps {
  articles: Article[];
  categories: string[];
}

export default function ArticlesClient({
  articles,
  categories,
}: ArticlesClientProps) {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category") || "All";

  // Filter articles client-side
  const filteredArticles = articles.filter((article) => {
    if (categoryFilter === "All") return true;
    return article.category === categoryFilter;
  });

  return (
    <>
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
                  variant={category === categoryFilter ? "default" : "outline"}
                  className={
                    category === categoryFilter
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
            {filteredArticles.map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`}>
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
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
    </>
  );
}
